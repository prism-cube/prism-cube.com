import type { NextPage } from 'next'

import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'

const Page: NextPage = () => {
  return (
    <Layout>
      <Head title="500" url="/500" />

      <div className="pt-80 text-center">
        <h1 className="bg-gradient-to-tl from-gray-900 via-purple-900 to-violet-600 bg-clip-text pb-2 text-5xl font-bold text-transparent">
          500
        </h1>
        <p className="text-gray-300">Internal Server Error.</p>
      </div>
    </Layout>
  )
}

export default Page
