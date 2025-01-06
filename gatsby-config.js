module.exports = {
  siteMetadata: {
    title: `My personal Website`,
    author: {
      name: `Lukas Woodtli`,
      summary: `Personal Website and Blog.`
    },
    siteUrl: `https://woodtli.engineering`,
  },
  trailingSlash: "never",
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              maintainCase: false,
              removeAccents: false
            }
          },
          `gatsby-remark-prismjs`, // should be placed after `gatsby-remark-autolink-headers`
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              output: "mathml",
              throwOnError: true,
              strict: "error" // "warn", "error", "ignore"
            }
          }
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-sitemap`,
  ],
}
