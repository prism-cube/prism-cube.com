import type { NextPage } from 'next'
import Link from 'next/link'
import { Head } from '@/components/functional'
import { Layout } from '@/components/layouts'
import {
  AppIcon,
  TimelineIcon,
  ArticleIcon,
  ProfileIcon,
  TwitterIcon,
  GithubIcon,
} from '@/components/icons'
import { config } from '@/constants/config'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head />

      <div className="lg:px-8 lg:py-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Link
            href="/timeline"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-indigo-900 via-sky-900 to-sky-800 p-8">
              <h2 className="pb-2 text-3xl font-bold">Timeline</h2>
              <div className="flex justify-end text-9xl text-sky-700">
                <TimelineIcon />
              </div>
            </div>
          </Link>
          <Link
            href="/articles"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-emerald-800 via-teal-800 to-cyan-800 p-8">
              <h2 className="pb-2 text-end text-3xl font-bold">Articles</h2>
              <div className="flex justify-start text-9xl text-teal-900">
                <ArticleIcon />
              </div>
            </div>
          </Link>
          <Link
            href="/works"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-red-900 via-orange-900 to-yellow-800 p-8">
              <div className="flex justify-end text-9xl text-orange-800">
                <AppIcon />
              </div>
              <h2 className="pb-2 text-3xl font-bold">Works</h2>
            </div>
          </Link>
          <Link
            href="/profile"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-violet-900 via-indigo-900 to-blue-900 p-8">
              <div className="flex justify-start text-9xl text-indigo-700">
                <ProfileIcon />
              </div>
              <h2 className="pb-2 text-end text-3xl font-bold">Profile</h2>
            </div>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="hidden flex-col lg:flex"></div>
          <Link
            href={`https://twitter.com/${config.TWITTER_ID}`}
            target="_black"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-sky-600 via-[#1da1f2] to-sky-300 p-8">
              <div className="flex justify-center text-6xl">
                <TwitterIcon />
              </div>
            </div>
          </Link>
          <Link
            href={`https://github.com/${config.GITHUB_ID}`}
            target="_black"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-ashen-800 via-ashen-700 to-ashen-500 p-8">
              <div className="flex justify-center text-6xl">
                <GithubIcon />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
