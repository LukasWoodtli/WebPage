import { Typography } from "@mui/material";
import * as React from "react";

const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


function FormatDate(props: any) {
  return <Typography>{dayjs(props.dateTimeStamp * 1000).format("D. MMMM YYYY")}</Typography>;
}

export default FormatDate;
