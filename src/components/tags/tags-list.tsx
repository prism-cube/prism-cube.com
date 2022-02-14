import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TagResponse } from 'src/types/tags'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import { client } from 'src/utils/api'

const TagsPaper = styled(Paper)`
  padding: 1rem;
  margin-bottom: 1rem;
`
const TagGrid = styled(Grid)`
  margin-top: 0.5rem;
`
const TagGridA = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`
const TagSpan = styled.span`
  padding-left: 0.5rem;
`
const HeadingSpan = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`
const HeadingIcon = styled.span`
  margin-right: 0.25rem;
  display: flex;
  align-items: center;
`

export default function TagsList({ tags }: { tags: TagResponse[] }) {
  return (
    <TagsPaper>
      <HeadingSpan>
        <HeadingIcon>
          <LocalOfferIcon />
        </HeadingIcon>
        Tags
      </HeadingSpan>
      <Grid container spacing={1}>
        {tags.map((tag) => (
          <TagGrid key={tag.id} item xs={6}>
            <Link href={`/articles/tag/${tag.id}`} passHref>
              <TagGridA>
                <Image
                  src={tag.icon.url}
                  alt={tag.name}
                  width={30}
                  height={30}
                />
                <TagSpan>{tag.name}</TagSpan>
              </TagGridA>
            </Link>
          </TagGrid>
        ))}
      </Grid>
    </TagsPaper>
  )
}

export const SortTags = async () => {
  const resTags = await client.tags.$get({
    query: {
      offset: 0,
      limit: 1000
    }
  })
  const allArticles = await client.articles.$get({
    query: {
      offset: 0,
      limit: 1000
    }
  })

  let tags: TagResponse[] = []
  let tagCount: { [key: string]: number } = {}

  for (const tag of resTags.contents) {
    let count = 0
    for (const article of allArticles.contents) {
      for (const articleTag of article.tags) {
        if (articleTag.id === tag.id) count++
      }
    }
    tagCount[tag.id] = count
  }

  let array = Object.keys(tagCount).map((k) => ({ key: k, value: tagCount[k] }))
  array.sort((a, b) => b.value - a.value)
  tagCount = Object.assign(
    {},
    ...array.map((item) => ({
      [item.key]: item.value
    }))
  )

  for (const key in tagCount) {
    for (const tag of resTags.contents) {
      if (key === tag.id) tags.push(tag)
    }
  }

  return tags
}
