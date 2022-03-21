import { Link } from "gatsby-theme-material-ui";
import * as React from "react";

export default function NeighborBlogPostsNav(props: any) {
  return (<nav className="blog-post-nav">
    <ul
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        listStyle: `none`,
        padding: 0
      }}
    >
      <li>
        {props.previous && (
          <Link to={props.previous.fields.slug} rel="prev">
            ← {props.previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {props.next && (
          <Link to={props.next.fields.slug} rel="props.next">
            {props.next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  </nav>);
}
