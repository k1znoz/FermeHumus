export function normalizeNumber(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

export async function fetchStockEntriesByProduct(client, productId) {
  return client.fetch(
    `*[_type == "stockEntry" && product._ref == $productId] | order(coalesce(updatedAt, _updatedAt, _createdAt) desc) {
			_id,
			quantity,
			unit,
			lowStockThreshold,
			updatedAt,
			_createdAt,
			_updatedAt
		}`,
    { productId }
  );
}

export function aggregateStockEntries(entries = []) {
  const safeEntries = Array.isArray(entries) ? entries : [];
  const totalQuantity = safeEntries.reduce(
    (sum, entry) => sum + normalizeNumber(entry?.quantity, 0),
    0
  );
  const primary = safeEntries[0] ?? null;

  return {
    entries: safeEntries,
    primary,
    totalQuantity,
    unit: primary?.unit ?? 'kg',
    lowStockThreshold: normalizeNumber(primary?.lowStockThreshold, 5),
  };
}

export async function setProductStock({
  readClient,
  writeClient,
  productId,
  quantity,
  unit,
  lowStockThreshold,
  now,
}) {
  const entries = await fetchStockEntriesByProduct(readClient, productId);
  const { primary } = aggregateStockEntries(entries);
  const timestamp = now ?? new Date().toISOString();
  const nextUnit = unit ?? primary?.unit ?? 'kg';
  const nextThreshold = normalizeNumber(lowStockThreshold, primary?.lowStockThreshold ?? 5);

  if (primary?._id) {
    await writeClient
      .patch(primary._id)
      .set({
        quantity,
        unit: nextUnit,
        lowStockThreshold: nextThreshold,
        updatedAt: timestamp,
      })
      .commit();

    for (const duplicate of entries.slice(1)) {
      await writeClient.delete(duplicate._id);
    }

    return {
      stockEntryId: primary._id,
      quantity,
      unit: nextUnit,
      lowStockThreshold: nextThreshold,
    };
  }

  const created = await writeClient.create({
    _type: 'stockEntry',
    product: { _type: 'reference', _ref: productId },
    quantity,
    unit: nextUnit,
    lowStockThreshold: nextThreshold,
    updatedAt: timestamp,
  });

  return { stockEntryId: created._id, quantity, unit: nextUnit, lowStockThreshold: nextThreshold };
}
