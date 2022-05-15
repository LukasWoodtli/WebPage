import { Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";

const slug = require(`github-slugger`).slug;


export interface MarkdownHeading {
  depth: number;
  value: string;
}

interface TableOfContentsParams {
  toc: MarkdownHeading[];
}

const headerNameToFragment = (header: string) => (
  "#" + slug(header, false)
);

const removeCodeBlocksInTitle = (title: string) => (
  title.replaceAll(/<[^>]+>/g, "")
);


const TableOfContents = (props: TableOfContentsParams) => {
  const toc: MarkdownHeading[] = props.toc.map((entry: MarkdownHeading) => {
    entry.value = removeCodeBlocksInTitle(entry.value);
    return entry;
  });

  return (
    <List>
      {toc.length > 0 && <ListItemText key={"content"}>
        <Typography variant={"h5"} key={"content-typography"}>
          Content
        </Typography>
      </ListItemText>}
      {toc.map((heading: MarkdownHeading, index: number) => (
        <Box sx={{ pl: heading.depth }} key={`${heading.value}-${index}-box`}>
          <ListItemButton component="a" href={headerNameToFragment(heading.value)}
                          key={`${heading.value}-list-item-button`}>
            <ListItemText primary={heading.value} key={`${heading.value}-${index}-list-item-text`} />
          </ListItemButton>
        </Box>
      ))}
    </List>
  );
};

export default TableOfContents;
