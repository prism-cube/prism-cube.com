import Image from 'next/future/image'

import { Article } from '@/api/types'
import { formatDate, equalDate } from '@/utils/date'
import { CalendarIcon } from '@/components/icons'

export interface ArticleTileProps {
  article: Article
}

export const ArticleTile: React.FC<ArticleTileProps> = (props) => {
  const { article } = props

  return (
    <div className="flex flex-col rounded-lg duration-300 hover:scale-105 hover:ease-in-out dark:bg-ashen-700">
      <a href={`/articles/${article.id}`} className="flex flex-1 flex-col">
        <Image
          src={article.image.url}
          alt={article.title}
          width={article.image.width}
          height={article.image.height}
          className="rounded-t-lg"
        />
        <div className="flex flex-1 flex-col p-4">
          <h2 className="flex flex-1 justify-center pb-2 text-lg font-bold">
            {article.title}
          </h2>
          <div className="flex space-x-2 pb-2">
            {article.tags.map((tag) => (
              <span
                key={tag.name}
                className="rounded px-2 py-1 text-sm dark:bg-indigo-900 dark:text-gray-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-end space-x-2 dark:text-gray-300">
            <CalendarIcon />
            <time dateTime={article.createdAt} suppressHydrationWarning>
              {formatDate(new Date(article.createdAt), 'yyyy/MM/dd')}
            </time>
          </div>
        </div>
      </a>
    </div>
  )
}
