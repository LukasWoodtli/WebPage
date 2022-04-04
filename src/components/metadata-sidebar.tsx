import { Chip, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import * as React from "react";
import FormatDate from "./format-date";

interface BadgesListParams {
  elements: string[];
  variant: "outlined" | "filled";
}

const BadgesList = (props: BadgesListParams) => (
  <Grid container spacing={1}>
    {props.elements.map((entry: string) => <Grid item key={entry}><Chip label={entry}
                                                                        variant={props.variant} /></Grid>)}
  </Grid>
);

const hasTags = (tags: string[] | null) => (tags && tags.length > 0);

const MetaDataSideBar = (props: any) => {
  return (
    <List>
      <Divider />
      <ListItem key="category-title">
        <ListItemText>
          <Typography>Category</Typography>
        </ListItemText>
      </ListItem>
      <ListItem key="category-content">
        <BadgesList elements={[props.category]} variant="outlined" />
      </ListItem>
      {hasTags(props.tags) &&
        <>
          <Divider />
          <ListItem key="tags-title">
            <ListItemText sx={{ pr: 1 }}>
              <Typography>Tags</Typography>
            </ListItemText>
          </ListItem>
          <ListItem key="tags-content">
            <BadgesList elements={props.tags} variant="filled" />
          </ListItem>
        </>}
      <Divider />
      <ListItem key="created-date-title">
        <ListItemText>
          <Typography>Created</Typography>
        </ListItemText>
      </ListItem>
      <ListItem key="created-date-content">
        <FormatDate dateTimeStamp={props.dates.created} />
      </ListItem>
      <Divider />
      <ListItem key="modified-date-title">
        <ListItemText>
          <Typography>Modified</Typography>
        </ListItemText>
      </ListItem>
      <ListItem key="modified-date-content">
        <FormatDate dateTimeStamp={props.dates.modified} />
      </ListItem>
      <Divider />
    </List>);
};

export default MetaDataSideBar;
