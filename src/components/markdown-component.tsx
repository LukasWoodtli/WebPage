import * as React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo/src/meta/gatsby-seo";

import parse, { attributesToProps, domToReact, Element, HTMLReactParserOptions } from "html-react-parser";
import {
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Link } from "gatsby-theme-material-ui";


const headingsMapping: { [char: string]: string } = {
  "h1": "h3",
  "h2": "h4",
  "h3": "h5",
  "h4": "h6",
  "h5": "h6",
  "h6": "h6"
};

const replaceAsWorkaround = (element: string | JSX.Element | JSX.Element[]) => {
  if (typeof element == "string") {
    if (element.includes("[TOC]")) {
      console.error(`Removing [TOC] from blog post`);
      return element.replace("[TOC]", "");
    }
  }

  return element;
}


const replaceHrefUrl = (href: string): string => {
  const pelicanLinkPrefix = '%7Bfilename%7D/';
  let url = href;
  if(href.includes(pelicanLinkPrefix)) {
    url = href.replace(pelicanLinkPrefix, '');
    url = url.replace('.md', '');
    console.error(`Error fixing link: ${href} to ${url}`);
  }
  return url;
}

const openInNewTab = (href: string): boolean => {
  const absoluteUrlPattern = /^https?:\/\//i;
  return absoluteUrlPattern.test(href);
}

const htmlReactParserOptions: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element) {
      if (domNode.type == "tag") {
        let props = attributesToProps(domNode.attribs);
        const children = domToReact(domNode.children, htmlReactParserOptions);
        if (domNode.name in headingsMapping) {
          const mappedHeading = headingsMapping[domNode.name];
          // @ts-ignore
          return (<Typography variant={mappedHeading} {...props}>
            {children}
          </Typography>);
        } else if (domNode.name == "p") {
          return (<Typography variant={"body1"} {...props}>
            {replaceAsWorkaround(children)}
          </Typography>);
        } else if (domNode.name == "a") {
          props.href = replaceHrefUrl(props.href);
          if (openInNewTab(props.href)) {
            props.target = "_blank";
            props.rel = "noreferrer";
          }
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
        } else if (domNode.name == "thead") {
          return (<TableHead {...props}>
            {children}
          </TableHead>);
        } else if (domNode.name == "tbody") {
          return (<TableBody {...props}>
            {children}
          </TableBody>);
        } else if (domNode.name == "tr") {
          return (<TableRow {...props}>
            {children}
          </TableRow>);
        }
        else if (domNode.name == "td" || domNode.name == "th") {
          return (<TableCell {...props}>
            {children}
          </TableCell>);
        } else if (domNode.name == "ul" || domNode.name == "ol") {
          return (
            <Typography component={domNode.name} variant={"body1"} {...props}
                        style={{listStylePosition: "inside",
                                paddingLeft: "2rem",
                                marginBottom: "1rem"}}>
              {children}
            </Typography>
            );
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
