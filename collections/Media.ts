import type { CollectionConfig } from 'payload'

// Uploads land in R2 under cms/ (r2Storage plugin prefix) so they never
// collide with the hand-placed hero/ and gallery/ keys.
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  fields: [{ name: 'alt', type: 'text', required: true }],
  upload: {
    // image crop/focal point need sharp, which does not run on Workers
    crop: false,
    focalPoint: false,
  },
}
