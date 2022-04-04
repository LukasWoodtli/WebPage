import { Typography } from "@mui/material";
import moment from "moment";
import * as React from "react";

function FormatDate(props: any) {
  return <Typography>{moment(props.dateTimeStamp * 1000).format("D. MMMM YYYY")}</Typography>;
}

export default FormatDate;
