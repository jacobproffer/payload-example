import { Page } from '@/payload-types'
import { Accordion } from 'radix-ui'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { RichText } from '@payloadcms/richtext-lexical/react'

type AccordionProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'accordion' }>

export default function AccordionBlock({ block }: { block: AccordionProps }) {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">{block.heading}</h2>
          <Accordion.Root
            className="grid gap-2"
            type="single"
            defaultValue={
              block.accordion_items && block.accordion_items.length > 0
                ? block.accordion_items[0].id || undefined
                : undefined
            }
            collapsible
          >
            {block.accordion_items?.map((item: any) => (
              <Accordion.Item className="grid gap-2" key={item.id} value={item.id}>
                <Accordion.Trigger className="group flex items-center justify-between w-full p-2 text-left font-medium border border-black cursor-pointer">
                  {item.title}
                  <ChevronDownIcon
                    className="w-5 h-5 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </Accordion.Trigger>
                <Accordion.Content>
                  <RichText className="prose" data={item.content} />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  )
}
