import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../layout/layout";
import NeighborBlogPostsNav from "../components/neighbor-blog-posts-nav";
import MarkdownPost from "../components/markdown-component";


const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const { previous, next } = data
  const title = post.frontmatter.title;
  const description = post.frontmatter.description || post.excerpt;
  const html = post.html

  return (
    <Layout>
      <MarkdownPost title={title} description={description} html={html} />
      <NeighborBlogPostsNav previous={previous} next={next} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`
