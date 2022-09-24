import { Link } from '@/features/works/components'
import {
  WebIcon,
  AppStoreIcon,
  GooglePlayIcon,
  GithubIcon,
} from '@/components/icons'

export interface LinkAreaProps {
  url?: string
  appStoreUrl?: string
  googlePlayUrl?: string
  githubUrl?: string
}

export const LinkArea: React.FC<LinkAreaProps> = (props) => {
  const { url, appStoreUrl, googlePlayUrl, githubUrl } = props

  return (
    <div className="flex justify-center space-x-4">
      {url && <Link href={url} icon={<WebIcon />} />}
      {appStoreUrl && <Link href={appStoreUrl} icon={<AppStoreIcon />} />}
      {googlePlayUrl && <Link href={googlePlayUrl} icon={<GooglePlayIcon />} />}
      {githubUrl && <Link href={githubUrl} icon={<GithubIcon />} />}
    </div>
  )
}
