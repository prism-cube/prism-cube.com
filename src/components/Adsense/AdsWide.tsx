import styled from 'styled-components'
import GoogleAds from 'react-google-ads';

const AdsDiv = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export default function AdsWide() {
  return (
    <AdsDiv>
      <GoogleAds
        client="ca-pub-7261406872445625"
        slot="9116800288"
        className="adsbygoogle"
        format="auto"
        style={{display: 'block'}}
      />
    </AdsDiv>
  )
}
