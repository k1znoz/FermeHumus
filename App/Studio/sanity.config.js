import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes/index.js';
import { deskStructure } from './deskStructure.js';

export default defineConfig({
	name: 'ferme-de-l-humus',
	title: "Ferme de l'Humus",

	projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
	dataset: process.env.SANITY_STUDIO_DATASET || 'production',

	plugins: [structureTool({ structure: deskStructure }), visionTool()],

	schema: {
		types: schemaTypes
	}
});
