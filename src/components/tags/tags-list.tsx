import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import { TagResponse } from 'src/types/tags'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

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
        <HeadingIcon><LocalOfferIcon /></HeadingIcon>
        Tags
      </HeadingSpan>
      <Grid container spacing={1}>
        {tags.map(tag => (
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
