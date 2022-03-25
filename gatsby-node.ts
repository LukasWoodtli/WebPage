const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }: any) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const staticSite = path.resolve(`./src/templates/static-site.js`);

  // Get all markdown blog posts
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          nodes {
            id
            fields {
              slug
            }
            fileAbsolutePath
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }


  const allMarkdownFiles = result.data.allMarkdownRemark.nodes;


  const staticFiles = [
    //"blog",
    "books",
    "contact",
    "courses",
    "index",
    "projects",
    "recruiters_headhunters",
    "resume",
    "skills",];

  staticFiles.forEach(staticFile => {
    const staticPageMarkdown = allMarkdownFiles.find((fileName: any) => fileName.fileAbsolutePath.endsWith(`pages/${staticFile}.md`));
    createPage({
      path: staticFile,
      component: staticSite,
      context: {
        id: staticPageMarkdown.id,
      },
    });
  });


  const posts = allMarkdownFiles.filter((element: any) => {
    return !element.fileAbsolutePath.includes("/content/pages");
  });

  // Create blog_old posts pages
  // But only if there's at least one markdown file found at "content" (defined in gatsby-config.ts)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post: any, index: number) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

}

exports.onCreateNode = ({ node, actions, getNode }: any) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }: any) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.ts

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog_old posts are stored inside "content" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
