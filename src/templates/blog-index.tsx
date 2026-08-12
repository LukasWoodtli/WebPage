import * as React from "react";
import Link from "../components/link";

import Layout from "../layout/layout";
import { Typography } from "@mui/material";
import FormatDate from "../components/format-date";

const BlogIndex = (props: any) => {
  const { pageContext } = props;
  const posts = pageContext.allPosts.sort((postA: any, postB: any) => (postA.dates.created < postB.dates.created));

  return (
    <Layout>
      <Typography variant={"h2"}>
        Blog
      </Typography>
      <Typography paragraph>
        This blog is primarily a personal note-taking space. Posts are written mainly for my own reference. They may be
        useful to others, but are often not polished for an external audience.
      </Typography>
      <ol style={{ listStyle: `none` }} >
        {posts.map((post: any) => {
          if (post.excerpt.includes("TOC")) {
            console.error("Contains TOC string");
          }
          const title = post.frontmatter.title;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
              >
                <header>
                  <Typography variant={"h2"}>
                    <Link to={post.fields.slug}>
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </Typography>
                  <FormatDate dateTimeStamp={post.dates.created} />
                </header>
                <section>
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.replace("[TOC]", "")
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
