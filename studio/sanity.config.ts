import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'
import EditorialCalendarWidget from './editorialCalendarWidget'

export default defineConfig({
  name: 'default',
  title: 'studio',

  projectId: 'bkydu15k',
  dataset: 'production',

  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
    {
      name: 'editorial-calendar',
      title: 'Editorial Calendar',
      component: EditorialCalendarWidget,
      layout: { width: 'medium' }
    }
  ],

  schema: {
    types: schemaTypes,
  },
})
