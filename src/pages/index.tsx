import type { NextPage } from 'next'
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
          <a
            href="/timeline"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-indigo-900 via-sky-900 to-sky-800 p-8">
              <h2 className="pb-2 text-3xl font-bold">Timeline</h2>
              <div className="flex justify-end text-9xl text-sky-700">
                <TimelineIcon />
              </div>
            </div>
          </a>
          <a
            href="/articles"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-emerald-800 via-teal-800 to-cyan-800 p-8">
              <h2 className="pb-2 text-end text-3xl font-bold">Articles</h2>
              <div className="flex justify-start text-9xl text-teal-900">
                <ArticleIcon />
              </div>
            </div>
          </a>
          <a
            href="/works"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-blue-900 via-indigo-900 to-violet-900 p-8">
              <div className="flex justify-end text-9xl text-indigo-700">
                <AppIcon />
              </div>
              <h2 className="pb-2 text-3xl font-bold">Works</h2>
            </div>
          </a>
          <a
            href="/profile"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-gray-600 via-gray-800 to-gray-900 p-8">
              <div className="flex justify-start text-9xl text-gray-900">
                <ProfileIcon />
              </div>
              <h2 className="pb-2 text-end text-3xl font-bold">Profile</h2>
            </div>
          </a>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="hidden flex-col lg:flex"></div>
          <a
            href={`https://twitter.com/${config.TWITTER_ID}`}
            target="_black"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-sky-600 via-[#1da1f2] to-sky-300 p-8">
              <div className="flex justify-center text-6xl">
                <TwitterIcon />
              </div>
            </div>
          </a>
          <a
            href={`https://github.com/${config.GITHUB_ID}`}
            target="_black"
            className="duration-300 hover:scale-105 hover:ease-in-out"
          >
            <div className="flex flex-col rounded-lg bg-gradient-to-tl from-ashen-800 via-ashen-700 to-ashen-500 p-8">
              <div className="flex justify-center text-6xl">
                <GithubIcon />
              </div>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Home
