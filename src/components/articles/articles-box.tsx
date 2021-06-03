import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { ArticlesResponse } from 'src/types/articles'
import FiberNewIcon from '@material-ui/icons/FiberNew'

const ArticlesPaper = styled(Paper)`
  padding: 1rem;
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
const ArticleGridA = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`
const ArticleDiv = styled.div`
  margin-top: 1rem;
`

export default function ArticlesBox({
  articles
}: {
  articles: ArticlesResponse
}) {
  return (
    <ArticlesPaper>
      <HeadingSpan>
        <HeadingIcon>
          <FiberNewIcon />
        </HeadingIcon>
        New Articles
      </HeadingSpan>
      {articles.contents.map((article) => (
        <ArticleDiv key={article.id}>
          <Link href={`/articles/${article.id}`} passHref>
            <ArticleGridA>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Image
                    src={article.image.url}
                    alt={article.title}
                    width={192}
                    height={108}
                  />
                </Grid>
                <Grid item xs={9}>
                  <span>{article.title}</span>
                </Grid>
              </Grid>
            </ArticleGridA>
          </Link>
        </ArticleDiv>
      ))}
    </ArticlesPaper>
  )
}
