import { getFileDates, getNeighbors } from "./utils/file-timestamps-from-git";

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
            frontmatter {
              title
            }
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

function getNeighborsData(posts: any[], previousPost: string | null, nextPost: string | null) {
  const previous = getOneNeighborData(posts, previousPost);
  const next = getOneNeighborData(posts, nextPost);
  return {
    previousPost: previous,
    nextPost: next
  };
}

function getOneNeighborData(posts: any[], neighborPost: string | null) {
  if (!neighborPost) return null;
  const neighborPostData = posts.find(post => post.fileAbsolutePath.endsWith(neighborPost));

  let neighbor = null;
  if (neighborPostData) {
    neighbor = {
      title: neighborPostData.frontmatter.title,
      slug: neighborPostData.fields.slug
    };
  }

  return neighbor;
}


function createBlogPosts(allMarkdownFiles: any[], createPage: any) {
  const posts = allMarkdownFiles.filter((element: any) => {
    return !element.fileAbsolutePath.includes("/content/pages");
  });

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

  // Create blog posts pages
  posts.forEach((post: any) => {
    const dates = getFileDates(post.fileAbsolutePath);
    const { previousPath, nextPath } = getNeighbors(post.fileAbsolutePath);
    const { previousPost, nextPost } = getNeighborsData(posts, previousPath, nextPath);

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        id: post.id,
        previousPost,
        nextPost,
        dates
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
