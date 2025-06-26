import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'bkydu15k',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false
})

const categories = [
  {
    _type: 'category',
    title: 'Mindfulness',
    slug: { current: 'mindfulness' },
    description: 'Content related to mindfulness practices and techniques.',
    color: '#C86A43',
    locale: 'en'
  },
  {
    _type: 'category',
    title: 'Autoconocimiento',
    slug: { current: 'autoconocimiento' },
    description: 'Contenidos sobre autoconocimiento y desarrollo personal.',
    color: '#2E3D32',
    locale: 'es'
  },
  {
    _type: 'category',
    title: 'Coaching',
    slug: { current: 'coaching' },
    description: 'Coaching tools and inspirational stories.',
    color: '#A1A19B',
    locale: 'en'
  },
  {
    _type: 'category',
    title: 'Bienestar',
    slug: { current: 'bienestar' },
    description: 'Consejos y recursos para el bienestar integral.',
    color: '#F8F6F2',
    locale: 'es'
  }
]

async function seed() {
  for (const category of categories) {
    const exists = await client.fetch(
      `*[_type == 'category' && slug.current == $slug && locale == $locale][0]`,
      { slug: category.slug.current, locale: category.locale }
    )
    if (!exists) {
      await client.create(category)
      console.log(`Created category: ${category.title} (${category.locale})`)
    } else {
      console.log(`Category already exists: ${category.title} (${category.locale})`)
    }
  }
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
