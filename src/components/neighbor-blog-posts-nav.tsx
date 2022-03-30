import { Link } from "gatsby-theme-material-ui";
import * as React from "react";

export interface NeighborData {
  slug: string;
  title: string;
}

export interface NeighborBlogPostsNavParams {
  previous: NeighborData;
  next: NeighborData;
}

export default function NeighborBlogPostsNav(props: NeighborBlogPostsNavParams) {
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
          <Link to={props.next.slug} rel="next">
            {props.next.title} →
          </Link>
        )}
      </li>
    </ul>
  </nav>);
}
