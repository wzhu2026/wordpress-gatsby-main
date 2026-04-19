/**
 * Gatsby configuration
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
