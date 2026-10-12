import type { CollectionConfig } from 'payload'

// One row in practice: the hero video + poster + headline.
export const Hero: CollectionConfig = {
  slug: 'hero',
  admin: { useAsTitle: 'headline' },
  fields: [
    { name: 'headline', type: 'text' },
    { name: 'video', type: 'upload', relationTo: 'media' },
    { name: 'poster', type: 'upload', relationTo: 'media' },
  ],
}
