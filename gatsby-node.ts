import { getFileDates, getNeighbors } from "./utils/file-timestamps-from-git";

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);


async function collectMarkdownFiles(graphql: any) {
  // Get all markdown files
  const result = await graphql(
    `{
  allMarkdownRemark(sort: {fileAbsolutePath: ASC}) {
    nodes {
      id
      fields {
        slug
      }
      fileAbsolutePath
      frontmatter {
        title
      }
      excerpt
    }
  }
}`
  );

  if (result.errors) {
    console.log(result);
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
    //"index",
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


function filterOnlyBlogPosts(allMarkdownFiles: any[]) {
  return allMarkdownFiles.filter((element: any) => {
    return !element.fileAbsolutePath.includes("/content/pages");
  });
}

function createBlogPosts(posts: any[], createPage: any) {

  const blogPostsComponent = path.resolve(`./src/templates/blog-post.tsx`);

  // Create blog posts pages
  posts.forEach((post: any) => {
    console.log(`Processing: ${post.fileAbsolutePath}`);
    createPage({
      path: post.fields.slug,
      component: blogPostsComponent,
      context: {
        id: post.id,
        previousPost: post.neighbors.previousPost,
        nextPost: post.neighbors.nextPost,
        dates: post.dates
      }
    });
  });
}

function createBlogIndex(posts: any[], createPage: any) {

  const blogIndexComponent = path.resolve(`./src/templates/blog-index.tsx`);

  createPage({
    path: "/blog/",
    component: blogIndexComponent,
    context: {
      allPosts: posts
    }
  });

}


function getPostsWithDatesAndNeighbors(posts: any[]) {
  return posts.map((post: any) => {
    const dates = getFileDates(post.fileAbsolutePath);
    const { previousPath, nextPath } = getNeighbors(post.fileAbsolutePath);
    const { previousPost, nextPost } = getNeighborsData(posts, previousPath, nextPath);

    return {
      ...post,
      dates: dates,
      neighbors: {
        previousPost: previousPost,
        nextPost: nextPost
      }
    };
  });
}

exports.createPages = async ({ graphql, actions, reporter }: any) => {
  const { createPage } = actions;

  let allMarkdownFiles = null;

  try {
    allMarkdownFiles = await collectMarkdownFiles(graphql);
  } catch (e) {
    reporter.panicOnBuild(
      e.name,
      e.result
    );
    return;
  }

  createStaticPages(allMarkdownFiles, createPage);


  const posts = filterOnlyBlogPosts(allMarkdownFiles);
  const postsWithDatesAndNeighbors = getPostsWithDatesAndNeighbors(posts);

  createBlogPosts(postsWithDatesAndNeighbors, createPage);

  createBlogIndex(postsWithDatesAndNeighbors, createPage);
};


exports.onCreateNode = ({ node, actions, getNode }: any) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = "/blog" + createFilePath(
      { node, getNode, basePath: `pages`, trailingSlash: false });

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
