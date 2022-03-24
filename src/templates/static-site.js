import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../layout/layout";
import MarkdownPost from "../components/markdown-component";


const StaticSiteTemplate = ({ data }) => {
  const post = data.markdownRemark
  const title = post.frontmatter.title;
  const description = post.frontmatter.description || post.excerpt;
  const html = post.html

  return (
    <Layout>
      <MarkdownPost title={title} description={description} html={html} />
    </Layout>
  )
}

export default StaticSiteTemplate

export const pageQuery = graphql`
  query StaticSiteBySlug(
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
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
