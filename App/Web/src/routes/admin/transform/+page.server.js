import { client } from '$lib/sanity.js';
import { STOCK_UNITS } from '$lib/constants.js';
import { getWriteClient } from '$lib/server/sanityWrite.js';
import {
  aggregateStockEntries,
  fetchStockEntriesByProduct,
  setProductStock,
} from '$lib/server/stock.js';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const [rawStocks, transformedProducts] = await Promise.all([
    client.fetch(`
			*[_type == "stockEntry" && defined(product) && product->category != "Conserves"]
			| order(product->name asc) {
				_id,
				quantity,
				unit,
				"product": product->{ _id, name, category, "image": image.asset->url }
			}
		`),
    client.fetch(`
			*[_type == "product" && category == "Conserves"] | order(name asc) {
				_id,
				name,
				category
			}
		`),
  ]);

  return {
    rawStocks,
    transformedProducts,
    units: STOCK_UNITS,
    success: url.searchParams.get('success') === '1',
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    if (!env.SANITY_API_WRITE_TOKEN) {
      return fail(500, {
        error: "SANITY_API_WRITE_TOKEN est manquant. Impossible d'enregistrer la transformation.",
      });
    }

    const writeClient = getWriteClient();

    const data = await request.formData();

    const inputProductId = data.get('inputProductId')?.toString();
    const inputQuantity = Number(data.get('inputQuantity'));
    const inputUnit = data.get('inputUnit')?.toString();
    const outputProductId = data.get('outputProductId')?.toString();
    const outputQuantity = Number(data.get('outputQuantity'));
    const outputUnit = data.get('outputUnit')?.toString();
    const estimatedWaste = Number(data.get('estimatedWaste') || 0);
    const batchNumber = data.get('batchNumber')?.toString();
    const notes = data.get('notes')?.toString() || null;
    const recordedBy = data.get('recordedBy')?.toString() || null;

    if (
      !inputProductId ||
      !outputProductId ||
      !batchNumber ||
      !inputUnit ||
      !outputUnit ||
      !STOCK_UNITS.includes(outputUnit) ||
      !Number.isFinite(inputQuantity) ||
      inputQuantity <= 0 ||
      !Number.isFinite(outputQuantity) ||
      outputQuantity <= 0 ||
      !Number.isFinite(estimatedWaste) ||
      estimatedWaste < 0
    ) {
      return fail(400, { error: 'Veuillez renseigner tous les champs obligatoires.' });
    }

    if (inputProductId === outputProductId) {
      return fail(400, {
        error: 'Le produit brut et le produit transforme doivent etre differents.',
      });
    }

    const [inputProduct, outputProduct] = await Promise.all([
      client.fetch(`*[_type == "product" && _id == $id][0]{ _id, category }`, {
        id: inputProductId,
      }),
      client.fetch(`*[_type == "product" && _id == $id][0]{ _id, category }`, {
        id: outputProductId,
      }),
    ]);

    if (!inputProduct || !outputProduct) {
      return fail(400, { error: 'Produit introuvable.' });
    }

    if (outputProduct.category !== 'Conserves') {
      return fail(400, { error: 'Le produit de sortie doit être dans la catégorie Conserves.' });
    }

    const inputEntries = await fetchStockEntriesByProduct(client, inputProductId);
    const inputStock = aggregateStockEntries(inputEntries);

    if (!inputStock.primary) {
      return fail(400, { error: 'Stock introuvable pour le produit brut selectionne.' });
    }

    if (inputStock.totalQuantity < inputQuantity) {
      return fail(400, {
        error: `Stock insuffisant. Disponible: ${inputStock.totalQuantity} ${inputStock.unit ?? ''}`,
      });
    }

    const outputEntries = await fetchStockEntriesByProduct(client, outputProductId);
    const outputStock = aggregateStockEntries(outputEntries);

    try {
      const now = new Date().toISOString();
      const nextInputQuantity = inputStock.totalQuantity - inputQuantity;
      const nextOutputQuantity = outputStock.totalQuantity + outputQuantity;

      await setProductStock({
        readClient: client,
        writeClient,
        productId: inputProductId,
        quantity: nextInputQuantity,
        unit: inputStock.unit || inputUnit,
        lowStockThreshold: inputStock.lowStockThreshold,
        now,
      });

      await setProductStock({
        readClient: client,
        writeClient,
        productId: outputProductId,
        quantity: nextOutputQuantity,
        unit: outputUnit,
        lowStockThreshold: outputStock.lowStockThreshold,
        now,
      });

      await writeClient
        .patch(inputProductId)
        .set({ available: nextInputQuantity > 0 })
        .commit();
      await writeClient
        .patch(outputProductId)
        .set({ available: nextOutputQuantity > 0 })
        .commit();

      await writeClient.create({
        _type: 'transformationEntry',
        inputProduct: { _type: 'reference', _ref: inputProductId },
        inputQuantity,
        inputUnit,
        outputProduct: { _type: 'reference', _ref: outputProductId },
        outputQuantity,
        outputUnit,
        estimatedWaste,
        batchNumber,
        notes,
        recordedBy,
        transformedAt: now,
      });
    } catch (error) {
      console.error('Erreur enregistrement transformation:', error);
      return fail(500, {
        error: "Erreur serveur pendant l'enregistrement de la transformation.",
      });
    }

    throw redirect(303, '/admin/transform?success=1');
  },
};
