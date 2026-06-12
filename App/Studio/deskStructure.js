const SINGLETONS = new Set(['siteSettings', 'farmStay']);

const EDITORIAL_TYPES = ['siteSettings', 'farmStay', 'product', 'teamMember', 'market'];
const OPERATIONS_TYPES = ['stockEntry', 'harvestEntry', 'transformationEntry', 'productOrder'];

function singletonItem(S, typeName, title) {
	return S.listItem()
		.title(title)
		.child(S.editor().id(typeName).schemaType(typeName).documentId(typeName));
}

function collectionItem(S, typeName, title) {
	return S.listItem()
		.title(title)
		.child(S.documentTypeList(typeName).title(title));
}

function isHiddenFromRoot(item) {
	const id = item.getId();
	if (!id) return false;
	if (SINGLETONS.has(id)) return true;
	return EDITORIAL_TYPES.includes(id) || OPERATIONS_TYPES.includes(id);
}

export const deskStructure = (S) =>
	S.list()
		.title('Contenu')
		.items([
			S.listItem()
				.title('Editorial')
				.child(
					S.list()
						.title('Editorial')
						.items([
							singletonItem(S, 'siteSettings', 'Parametres du site'),
							singletonItem(S, 'farmStay', 'Sejour a la ferme'),
							collectionItem(S, 'teamMember', 'Equipe'),
							collectionItem(S, 'market', 'Points de vente')
						])
                    ),
                    S.listItem()
                    .title('Exploitation')
                    .child(
                        S.list()
						.title('Exploitation')
						.items([
                            collectionItem(S, 'product', 'Produits'),
							collectionItem(S, 'harvestEntry', 'Recoltes'),
							collectionItem(S, 'stockEntry', 'Stock'),
							collectionItem(S, 'transformationEntry', 'Transformations'),
							collectionItem(S, 'productOrder', 'Commandes produits')
						])
				),
			S.divider(),
			...S.documentTypeListItems().filter((item) => !isHiddenFromRoot(item))
		]);