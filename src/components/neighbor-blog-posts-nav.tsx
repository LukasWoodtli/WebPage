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
          <Link to={props.previous.slug} rel="prev">
            ← {props.previous.title}
          </Link>
        )}
      </li>
      <li>
        {props.next && (
          <Link to={props.slug} rel="props.next">
            {props.next.title} →
          </Link>
        )}
      </li>
    </ul>
  </nav>);
}
