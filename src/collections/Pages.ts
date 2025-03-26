import { ContentBlock } from '@/blocks/ContentBlock'
import { AccordionBlock } from '@/blocks/AccordionBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { NewsLetterFormBlock } from '@/blocks/NewsletterFormBlock'
import { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [AccordionBlock, HeroBlock, ContentBlock, NewsLetterFormBlock],
    },
  ],
}

export default Pages
