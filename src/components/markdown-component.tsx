import * as React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo/src/meta/gatsby-seo";

export default function MarkdownPost(props: any) {
    return (
      <>
      <GatsbySeo
        title={props.title}
        description={props.description}
      />
          <article
            className="blog-post"
            itemScope
          >
            <div>
              <h1 itemProp="headline">{props.title}</h1>
            </div>
            <section
              dangerouslySetInnerHTML={{ __html: props.html }}
              itemProp="articleBody"
            />
            <hr />
          </article>
    </>
    );
}
