import styled from 'styled-components'
import GoogleAds from 'react-google-ads';

const AdsDiv = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export default function AdsSquare() {
  return (
    <AdsDiv>
      {process.env.NODE_ENV === 'production' ?
        <GoogleAds
          client="ca-pub-7261406872445625"
          slot="1210854134"
          className="adsbygoogle"
          format="auto"
          style={{ display: 'block' }}
        /> :
        <p>AdsSquare : productionモード以外では広告は表示されません</p>
      }
      
    </AdsDiv>
  )
}
