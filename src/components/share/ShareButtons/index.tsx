import {
  TwitterShareButton,
  FacebookShareButton,
  LineShareButton,
  HatenaShareButton,
  TwitterIcon,
  FacebookIcon,
  LineIcon,
  HatenaIcon,
} from 'react-share'

import { config } from '@/constants/config'

export interface ShareButtonsProps {
  url: string
  title: string
}

export const ShareButtons: React.FC<ShareButtonsProps> = (props) => {
  const { url, title } = props

  return (
    <div className="flex justify-center space-x-8 py-4">
      <TwitterShareButton url={config.SITE_URL + url} title={title}>
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>

      <FacebookShareButton url={config.SITE_URL + url} quote={title}>
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>

      <LineShareButton url={config.SITE_URL + url} title={title}>
        <LineIcon size={30} round={true} />
      </LineShareButton>

      <HatenaShareButton url={config.SITE_URL + url} title={title}>
        <HatenaIcon size={30} round={true} />
      </HatenaShareButton>
    </div>
  )
}
