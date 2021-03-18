import Layout from 'src/components/Layout'
import Head, { siteTitle } from 'src/components/Head'
import styled from 'styled-components'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip';
import AdsSquare from 'src/components/Adsense/AdsSquare'
import { WorkResponse } from 'src/types/works'
import { client } from 'src/utils/api'

const WorkPaper = styled(Paper)`
  padding: 1rem;
`
const Img = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
`
const TechImages = styled.div`
  margin-top: 0.75rem;
  margin-bottom: 1rem;
`
const TechImage = styled.span`
  margin-right: 0.5rem;
`

export default function Work({ work }: {work: WorkResponse}) {
  return (
    <Layout>
      <Head
        title={`${work.title} - ${siteTitle}`}
        description={`${work.title} - ${siteTitle}`}
        ogImage={work.image.url}
        url={`https://prism-cube.com/articles/${work.id}`}
      />

      <WorkPaper>
        <article>
          <h1>{work.title}</h1>
          <hr />
          <TechImages>
            {work.techs.map(tech => (
              <Tooltip key={tech.id} title={tech.name}>
                <TechImage>
                  <Image
                    src={tech.image.url}
                    alt={tech.image.url}
                    width="30"
                    height="30"
                  />
                </TechImage>
              </Tooltip>
            ))}
          </TechImages>
          <p>
            {work.description}
          </p>
          <Img>
            <Image
              src={work.image.url}
              alt={work.image.url}
              width={work.image.width}
              height={work.image.height}
            />
          </Img>
          <div
            dangerouslySetInnerHTML={{
              __html: `${work.body}`
            }}
          />
        </article>
      </WorkPaper>
      <AdsSquare />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const response = await client.works.$get()
  const paths = response.contents.map(content => `/works/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const response = await client.works._id(id).$get()
  return {
    props: {
      work: response,
    },
  };
};
