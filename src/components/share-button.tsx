import styled from 'styled-components'
import { TwitterShareButton, FacebookShareButton, LineShareButton, HatenaShareButton, TwitterIcon, FacebookIcon, LineIcon, HatenaIcon } from "react-share";

const Root = styled.div`
  text-align: center;
  margin-top: 1rem;
`
const ButtonSpan = styled.span`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`

export const ShareButton = ({ url, title }: { url: string, title: string }) => {
  return (
    <Root>

      <ButtonSpan>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </ButtonSpan>

      <ButtonSpan>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </ButtonSpan>

      <ButtonSpan>
        <LineShareButton url={url} title={title}>
          <LineIcon size={32} round={true} />
        </LineShareButton>
      </ButtonSpan>

      <ButtonSpan>
        <HatenaShareButton url={url} title={title}>
          <HatenaIcon size={32} round={true} />
        </HatenaShareButton>
      </ButtonSpan>
    </Root>
  );
};

export default ShareButton

