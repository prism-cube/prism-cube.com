import type { NextPage, GetStaticPropsResult } from 'next'
import Image from 'next/image'

import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'
import { Heading, RichEditor } from '@/components/typography'
import { config } from '@/constants/config'
import { ProfileResponse } from '@/api/types'
import { client } from '@/libs/api'

export interface PageProps {
  profile: ProfileResponse
}

const Page: NextPage<PageProps> = (props) => {
  const { profile } = props

  return (
    <Layout>
      <Head title="Profile" url="/profile" />

      <Heading>Profile</Heading>

      <div>
        <Image
          src={profile.image.url}
          alt={profile.name}
          width="80"
          height="80"
          className="inline rounded-lg"
        />
        <h2 className="ml-4 inline align-middle text-2xl font-bold">
          {profile.name}
        </h2>
      </div>

      <RichEditor html={profile.body} className="p-4" />

      <div className="mt-4">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="p-4">
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

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<PageProps>
> => {
  const response = await client.profile.$get()
  return {
    props: {
      profile: response,
    },
  }
}
