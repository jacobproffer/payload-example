import { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordion',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'accordion_items',
      type: 'array',
      labels: {
        singular: 'Accordion Item',
        plural: 'Accordion Items',
      },
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Content',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
