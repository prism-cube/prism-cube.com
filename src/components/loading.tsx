import React, { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

const CenterDiv = styled.div`
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding: 10rem 0 5rem 0;
`

type Props = {
  children: ReactNode
}

export const Loading = ({ children }: Props) => {
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return <>{pageLoading ? <CenterDiv><CircularProgress color="primary" /></CenterDiv> : children}</>
}

export default Loading
