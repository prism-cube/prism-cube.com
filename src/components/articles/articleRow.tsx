import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';
import { ArticleResponse } from 'src/types/articles'

const PaperItem = styled(Paper)`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
`
const PaperItemA = styled.a`
  text-decoration: none;
  color: inherit;
`
const DateSpan = styled.span`
  margin-right: 0.5rem;
`
const TagSpan = styled.span`
  padding-right: 0.25rem;
  padding-left: 0.25rem;
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
`
const TitleSpan = styled.span`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: bold;
`
const ImageGrid = styled(Grid)`
  display: flex;
  align-items: center;
`
const TypographyItem = styled(Typography)`
  display: flex;
  align-items: center;
  height: 33.33333%;
  height: -webkit-calc(100% / 3);
  height: calc(100% / 3);
`

export default function ArticleRow({ article }: { article: ArticleResponse }) {
  return (
    <PaperItem>
      <Link href={`/articles/${article.id}`} passHref>
        <PaperItemA>
          <Grid container spacing={1}>
            <ImageGrid item>
              <Image alt={article.title} src={article.image.url} width="160" height="90" />
            </ImageGrid>
            <Grid item>
              <TypographyItem variant="subtitle1">
                <TitleSpan>{article.title}</TitleSpan>
              </TypographyItem>

              <TypographyItem variant="body2">
                {article.tags.map(tag => (
                  <TagSpan key={tag.id}>{tag.name}</TagSpan>
                ))}
              </TypographyItem>

              <TypographyItem variant="body2" color="textSecondary">
                <>
                  <EventNoteIcon fontSize="small" />
                  <DateSpan>{new Date(article.createdAt).toLocaleDateString()}</DateSpan>
                </>
                {new Date(article.createdAt).toLocaleDateString() !== new Date(article.updatedAt).toLocaleDateString() &&
                  <>
                    <UpdateIcon fontSize="small" />
                    <DateSpan>{new Date(article.updatedAt).toLocaleDateString()}</DateSpan>
                  </>
                }
              </TypographyItem>
            </Grid>
          </Grid>
        </PaperItemA>
      </Link>
    </PaperItem>
  )
}
