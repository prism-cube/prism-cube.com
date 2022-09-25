import type { NextPage, GetStaticPropsResult } from 'next'

import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'
import { Heading } from '@/components/typography'
import { WorkTile } from '@/features/works/components'
import { WorksResponse } from '@/api/types'
import { client } from '@/libs/api'

export interface PageProps {
  works: WorksResponse
}

const Page: NextPage<PageProps> = (props) => {
  const { works } = props

  return (
    <Layout>
      <Head title="Works" url="/works" />

      <Heading>Works</Heading>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {works.contents.map((work) => (
          <WorkTile key={work.id} work={work} />
        ))}
      </div>
    </Layout>
  )
}

export default Page

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<PageProps>
> => {
  const response = await client.works.$get({
    query: {
      offset: 0,
      limit: 999999,
    },
  })
  return {
    props: {
      works: response,
    },
  }
}
