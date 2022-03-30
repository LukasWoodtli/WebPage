import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../layout/layout";
import NeighborBlogPostsNav, { NeighborData } from "../components/neighbor-blog-posts-nav";
import MarkdownPost from "../components/markdown-component";
import MetaDataSideBar from "../components/metadata-sidebar";
import { Grid } from "@mui/material";


interface BlogPostComponentParams {
  title: string;
  description: string;
  html: string;
  previousPost: NeighborData;
  nextPost: NeighborData;

}

const BlogPostComponent = (props: BlogPostComponentParams) => {
  return <>
    <MarkdownPost title={props.title} description={props.description} html={props.html} />
    <NeighborBlogPostsNav previous={props.previousPost}
                          next={props.nextPost} />
  </>;
};


const BlogPostTemplate = (props: any) => {
  const { data, pageContext } = props;
  const post = data.markdownRemark;
  const {
    previousPost,
    nextPost,
    dates
  } = pageContext;
  const title = post.frontmatter.title;
  const description = post.frontmatter.description || post.excerpt;
  const category = post.frontmatter.category;
  const tags = post.frontmatter.tags;
  const html = post.html;

  return (
    <Layout>
      <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={0}>
        <Grid item sm={12} md={8} lg={9}>
          <BlogPostComponent title={title}
                             description={description}
                             html={html}
                             previousPost={previousPost}
                             nextPost={nextPost} />
        </Grid>
        <Grid item
              sx={{ flexGrow: 1 }}>
          <MetaDataSideBar category={category} tags={tags} dates={dates} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default BlogPostTemplate;

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
        tags
        category
      }
    }
  }
`;
