import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type ContentProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'content' }>

export default function ContentBlock({ block }: { block: ContentProps }) {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="grid gap-3">
          <h2 className="text-2xl font-bold">{block.heading}</h2>
          <RichText className="prose" data={block.content} />
        </div>
      </div>
    </section>
  )
}
