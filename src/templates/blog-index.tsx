import * as React from "react";
import { Link } from "gatsby-theme-material-ui";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../layout/layout";
import { Typography } from "@mui/material";
import FormatDate from "../components/format-date";

const BlogIndex = (props: any) => {
  const { pageContext } = props;
  const posts = pageContext.allPosts.sort((postA: any, postB: any) => (postA.dates.created < postB.dates.created));

  return (
    <Layout>
      <GatsbySeo title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post: any) => {
          const title = post.frontmatter.title;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
              >
                <header>
                  <Typography variant={"h2"}>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </Typography>
                  <FormatDate dateTimeStamp={post.dates.created} />
                </header>
                <section>
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;
