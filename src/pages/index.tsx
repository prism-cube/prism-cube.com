import Head from 'next/head'
import styled from 'styled-components'
import Layout, { siteTitle, menuItems } from 'src/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';

const ImageDiv = styled.div`
  position: relative;
  margin-bottom: 1rem;
`
const ImageImg = styled.img`
  width: 100%;
  pointer-events: none;
`
const ImageP = styled.p`
  color: #FFF;
  position: absolute;
  top: 65%;
  left: 50%;
  -ms-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  margin:0;
  padding:0;
  font-size: 8vw;
  font-weight: bold;
`
const PaperItem = styled(Paper)`
  text-align: center;
  padding: 1rem;
`
const PaperItemA = styled.a`
  text-decoration: none;
  color: inherit;
`

export default function Home() {
  return (
    <Layout isNoContainer>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <ImageDiv>
          <ImageImg src="images/prism-cube.jpg" alt="PrismCube"></ImageImg>
          <ImageP>PrismCube</ImageP>
        </ImageDiv>
      </section>

      <Container>
        <section>
          <Grid container spacing={2}>
            {menuItems.map(item => (
              <Grid key={item.name} item xs={6}>
                <Link href={item.href} passHref>
                  <PaperItemA>
                    <PaperItem>
                      <Typography>{item.icon}</Typography>
                      <Typography>{item.name}</Typography>
                    </PaperItem>
                  </PaperItemA>
                </Link>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </Layout>
  )
}
