import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

const Seo = ({ title, description, children, article }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          url
          image
          twitterUsername
        }
      }
    }
  `)

  const metadata = data.site.siteMetadata
  const metaTitle = title || metadata.title
  const metaDescription = description || metadata.description

  return (
    <Helmet>
      {/* 基础标签 */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph / 社交媒体 */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:image" content={`${metadata.url}${metadata.image}`} />
      <meta property="og:site_name" content={metadata.title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={metadata.twitterUsername} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${metadata.url}${metadata.image}`} />

      {children}
    </Helmet>
  )
}

export default Seo
