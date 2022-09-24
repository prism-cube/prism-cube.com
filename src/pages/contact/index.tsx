import type { NextPage } from 'next'

import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'
import { Heading } from '@/components/typography'
import { config } from '@/constants/config'

const Page: NextPage = () => {
  return (
    <Layout>
      <Head title="Contact" url="/contact" />

      <Heading>Contact</Heading>

      <div>
        <p>
          お問い合わせは
          <a
            href={`https://twitter.com/${config.TWITTER_ID}`}
            target="_blank"
            className="px-2 underline dark:text-indigo-400"
          >
            Twitter
          </a>
          にお願いします。
        </p>
      </div>
    </Layout>
  )
}

export default Page
