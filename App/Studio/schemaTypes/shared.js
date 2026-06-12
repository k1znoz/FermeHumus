export const PRODUCT_CATEGORIES = ['Conserves', 'Produits frais', 'Plants'];

export const STOCK_UNITS = ['kg', 'pcs', 'botte', 'barquette', 'doz', 'pot', 'L'];

export const STOCK_UNIT_OPTIONS = [
	{ title: 'kg', value: 'kg' },
	{ title: 'piece(s)', value: 'pcs' },
	{ title: 'botte(s)', value: 'botte' },
	{ title: 'barquette(s)', value: 'barquette' },
	{ title: 'douzaine(s)', value: 'doz' },
	{ title: 'pot(s)', value: 'pot' },
	{ title: 'litre(s)', value: 'L' }
];

export const ORDER_STATUSES = [
	{ title: 'Reservee', value: 'reserved' },
	{ title: 'Confirmee', value: 'confirmed' },
	{ title: 'Preparee', value: 'prepared' },
	{ title: 'Annulee', value: 'cancelled' }
];

export const ORDER_PICKUP_LOCATIONS = [
	'Ailly-sur-Somme - labo, 15 bis rue du Pont (mercredi 14h-16h30)',
	'Amiens - Bears Taverne, quai Charles Tellier (mardi 17h-19h)',
	'Namps-au-Mont - vendredi soir (16h-19h)',
	'A la ferme du Mycelium',
	'Ailly-le-Haut-Clocher - marche a la ferme',
	'Amiens - auberge de jeunesse (jeudi 17h30-19h)'
];

export const ORDER_REFERRAL_SOURCES = [
	'Bouche a oreille',
	"J'ai deja achete vos produits !",
	'Internet / reseaux sociaux',
	'Sur un marche',
	'Autre'
];