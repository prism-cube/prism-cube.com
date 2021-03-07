import Link from 'next/link';

export default function Articles({ articles }) {
  return (
    <div>
      <ul>
          {articles.map(articles => (
            <li key={articles.id}>
              <Link href={`article/${articles.id}`}>
                <a>{articles.title}</a>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(process.env.API_URL + 'article', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      articles: data.contents,
    },
  };
};
