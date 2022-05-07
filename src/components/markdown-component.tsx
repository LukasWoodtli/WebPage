import * as React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo/src/meta/gatsby-seo";

import parse, { attributesToProps, domToReact, Element, HTMLReactParserOptions } from "html-react-parser";
import { Table, TableContainer, TableRow, Typography } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";


const headingsMapping: { [char: string]: string } = {
  "h1": "h3",
  "h2": "h4",
  "h3": "h5",
  "h4": "h6",
  "h5": "h6",
  "h6": "h6"
};

const htmlReactParserOptions: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element) {
      if (domNode.type == "tag") {
        const props = attributesToProps(domNode.attribs);
        const children = domToReact(domNode.children, htmlReactParserOptions);
        if (domNode.name in headingsMapping) {
          const mappedHeading = headingsMapping[domNode.name];
          // @ts-ignore
          return (<Typography variant={mappedHeading} {...props}>
            {children}
          </Typography>);
        } else if (domNode.name == "p") {
          return (<Typography variant={"body2"} {...props}>
            {children}
          </Typography>);
        } else if (domNode.name == "a") {
          return (<Link {...props}>
            {children}
          </Link>);
        } else if (domNode.name == "table") {
          return (
            <TableContainer>
              <Table {...props}>
                {children}
              </Table>
            </TableContainer>);
        } else if (domNode.name == "tr") {
          return (<TableRow {...props}>
            {children}
          </TableRow>);
        }
      }
    }
  }
};


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
        <Typography variant={"h2"}>
          {props.title}
        </Typography>
        <section
          itemProp="articleBody"
        >
          {parse(props.html, htmlReactParserOptions)}
        </section>
        <hr />
      </article>
    </>
    );
}
