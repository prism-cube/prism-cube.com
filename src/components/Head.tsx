import React from 'react';
import NextHead from 'next/head'

export const siteTitle = 'PrismCube'

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl: string;
}

export default function Head ({ title, description, ogImage, canonicalUrl }: Props) {
  return (
    <NextHead>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:image"
          content={
            ogImage ? (
              ogImage
            ) : (
              `https://images.microcms-assets.io/assets/637a154d3e1c433dadd7561517c3541d/c1b0240ffeff4e67b0884e2368ed5c35/default.png`
            )
          }
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
      </NextHead>
  )
}
