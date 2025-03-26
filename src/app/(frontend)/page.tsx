import { headers as getHeaders } from 'next/headers.js'
import { Page } from '@/payload-types'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import AccordionBlock from './components/AccordionBlock'
import HeroBlock from './components/HeroBlock'
import ContentBlock from './components/ContentBlock'
import NewsletterBlock from './components/NewsLetterBlock'

const renderBlocks = (block: NonNullable<Page['layout']>[number]) => {
  switch (block.blockType) {
    case 'accordion':
      return <AccordionBlock block={block} key={block.id} />
    case 'hero':
      return <HeroBlock block={block} key={block.id} />
    case 'content':
      return <ContentBlock block={block} key={block.id} />
    case 'newsletter-form':
      return <NewsletterBlock block={block} key={block.id} />
    default:
      return null
  }
}

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'example-page' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  return <div>{page.layout?.map((block) => renderBlocks(block))}</div>
}
