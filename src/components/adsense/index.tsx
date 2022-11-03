import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { config } from '@/constants/config'

type AdSenseType = 'high' | 'wide' | 'square'

export interface AdSenseProps {
  type: AdSenseType
}

export const AdSense: React.FC<AdSenseProps> = (props) => {
  const { type } = props

  const slot =
    type === 'high'
      ? '6482736387'
      : type === 'wide'
      ? '9116800288'
      : '1210854134'

  const { asPath } = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error(error)
    }
  }, [asPath])

  if (process.env.NODE_ENV !== 'production') {
    return <></>
  }

  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={config.GOOGLE_ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={process.env.NODE_ENV === 'production' ? 'off' : 'on'}
      />
    </div>
  )
}
