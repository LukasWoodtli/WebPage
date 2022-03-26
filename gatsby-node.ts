const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);


async function collectMarkdownFiles(graphql: any) {
  // Get all markdown files
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
  );

  if (result.errors) {
    throw {
      name: "There was an error loading the markdown files",
      message: result.errors
    };
  }

  return result.data.allMarkdownRemark.nodes;
}

function createStaticPages(allMarkdownFiles: any[], createPage: any) {
  const staticFiles = [
    //"blog",
    "books",
    "contact",
    "courses",
    "index",
    "projects",
    "recruiters_headhunters",
    "resume",
    "skills"];

  const staticSite = path.resolve(`./src/templates/static-site.js`);

  staticFiles.forEach(staticFile => {
    const staticPageMarkdown = allMarkdownFiles.find((fileName: any) => fileName.fileAbsolutePath.endsWith(`pages/${staticFile}.md`));
    createPage({
      path: staticFile,
      component: staticSite,
      context: {
        id: staticPageMarkdown.id
      }
    });
  });
}


function createBlogPosts(allMarkdownFiles: any[], createPage: any) {
  const posts = allMarkdownFiles.filter((element: any) => {
    return !element.fileAbsolutePath.includes("/content/pages");
  });

  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  // Create blog posts pages
  posts.forEach((post: any, index: number) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id;
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId,
        nextPostId
      }
    });
  });
}


exports.createPages = async ({ graphql, actions, reporter }: any) => {
  const { createPage } = actions;

  let allMarkdownFiles = null;

  try {
    allMarkdownFiles = await collectMarkdownFiles(graphql);
  } catch (e: any) {
    reporter.panicOnBuild(
      e.name,
      e.result
    );
    return;
  }

  createStaticPages(allMarkdownFiles, createPage);

  createBlogPosts(allMarkdownFiles, createPage);
};


exports.onCreateNode = ({ node, actions, getNode }: any) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }: any) => {
  const { createTypes } = actions

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
