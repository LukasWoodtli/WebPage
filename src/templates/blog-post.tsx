import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../layout/layout";
import NeighborBlogPostsNav, { NeighborData } from "../components/neighbor-blog-posts-nav";
import MarkdownPost from "../components/markdown-component";
import MetaDataSideBar from "../components/metadata-sidebar";
import { Grid } from "@mui/material";
import TableOfContents, { MarkdownHeading } from "../components/table-of-contents";


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
  const headings: MarkdownHeading[] = post.headings;

  return (
    <Layout>
      <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={0}>
        <Grid item md={2}>
          <TableOfContents toc={headings}></TableOfContents>
        </Grid>
        <Grid item sm={12} md={8}>
          <BlogPostComponent title={title}
                             description={description}
                             html={html}
                             previousPost={previousPost}
                             nextPost={nextPost} />
        </Grid>
        <Grid item
              md={2}
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
      headings {
        depth
        value
      }
    }
  }
`;
