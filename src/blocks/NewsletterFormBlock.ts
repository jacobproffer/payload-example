import { Block } from 'payload'

export const NewsLetterFormBlock: Block = {
  slug: 'newsletter-form',
  labels: {
    singular: 'Newsletter Form',
    plural: 'Newsletter Forms',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
