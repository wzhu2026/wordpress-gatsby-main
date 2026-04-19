/**
 * Gatsby configuration with WordPress source
 * For self-hosted WordPress with WPGraphQL
 */

require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `我的博客`,
    description: `个人博客和技术分享`,
    author: `@blogger`,
    siteUrl: `https://your-site.com`,
    language: `zh-CN`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // 您的自建 WordPress GraphQL 地址
        url: process.env.WPGRAPHQL_URL || `http://localhost/graphql`,
        schema: {
          typePrefix: `Wp`,
        },
        develop: {
          hardCacheDataFiles: false,
        },
        type: {
          Post: {
            limit: process.env.NODE_ENV === `development` ? 50 : 1000,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `个人博客`,
        short_name: `博客`,
        start_url: `/`,
        background_color: `#fafdff`,
        theme_color: `#76cfc5`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
};
