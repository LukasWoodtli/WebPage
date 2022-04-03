import * as React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby-theme-material-ui";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../layout/layout";

const BlogIndex = ({ data }: any) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <GatsbySeo title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post: any) => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`
