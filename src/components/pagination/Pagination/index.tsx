import { config } from '@/constants/config'

export interface PaginationProps {
  totalCount: number
  currentPage: number
  url: string
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalCount, currentPage, url } = props

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <div className="flex justify-center space-x-4 py-6">
      {range(1, Math.ceil(totalCount / config.LIST_LIMIT)).map(
        (number, index) =>
          number == currentPage ? (
            <span key={index} className="rounded-lg px-4 py-2">
              {number}
            </span>
          ) : (
            <a
              key={index}
              href={`${url}/${number}`}
              className="rounded-lg px-4 py-2 dark:bg-ashen-700"
            >
              {number}
            </a>
          )
      )}
    </div>
  )
}
