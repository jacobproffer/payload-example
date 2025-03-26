import { Page } from '@/payload-types'
import { AspectRatio } from 'radix-ui'
import Image from 'next/image'
import Link from 'next/link'

type HeroProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

export default function HeroBlock({ block }: { block: HeroProps }) {
  return (
    <section className="hero bg-gray-300 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="grid gap-3">
            <h1 className="text-3xl font-bold">{block.heading}</h1>
            <h2 className="text-2xl font-bold">{block.subheading}</h2>
            <Link
              className="underline underline-offset-4"
              href={block.cta_button?.link || '/default-url'}
            >
              {block.cta_button?.label}
            </Link>
          </div>
          {typeof block.background !== 'number' && (
            <AspectRatio.Root ratio={517 / 349}>
              <Image
                src={block.background.url || '/default-image.jpg'}
                alt={block.background.alt || 'default alt text'}
                width={517}
                height={349}
                layout="responsive"
              />
            </AspectRatio.Root>
          )}
        </div>
      </div>
    </section>
  )
}
