import type { CollectionConfig } from 'payload'

// Flat rows (order = position on the page). No array fields on purpose:
// the D1 adapter's batch/atomic gap (payload issue #15219) bites arrays.
export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: { defaultColumns: ['order', 'kind', 'youtubeId', 'alt'] },
  fields: [
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'YouTube', value: 'youtube' },
      ],
    },
    { name: 'media', type: 'upload', relationTo: 'media' },
    { name: 'youtubeId', type: 'text' },
    { name: 'alt', type: 'text' },
  ],
}
