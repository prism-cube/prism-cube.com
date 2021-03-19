import Link from 'next/link';
import styled from 'styled-components'

export const PER_PAGE = 10;

const Root = styled.div`
  text-align: center;
  margin-top: 2rem;
`
const LinkA = styled.a`
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  text-decoration: none;
  color: inherit;
  background-color: #fff;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`
const Span = styled.span`
  border-radius: 10px;
  margin: 0.5rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  text-decoration: none;
  color: inherit;
  color: #fff;
  background-color: #000;
  cursor: default;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`

export const Pagination = ({ totalCount, pageNum }: { totalCount: number, pageNum: number }) => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <Root>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        number == pageNum ? (
          <Span key={index}>{number}</Span>
        ) : (
          <Link key={index} href={`/articles/page/${number}`} passHref>
            <LinkA>{number}</LinkA>
          </Link>
        )
      ))}
    </Root>
  );
};

export default Pagination
