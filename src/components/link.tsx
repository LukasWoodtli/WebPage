import * as React from "react"
import MuiLink from "@mui/material/Link"
import { Link as GatsbyLink } from "gatsby"

const Link = React.forwardRef(function Link(props, ref) {
  // inspired by: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#reminder-use-link-only-for-internal-links
  const internal = /^\/(?!\/)/.test(props.to)
  if (internal) {
    return <MuiLink component={GatsbyLink} ref={ref} {...props} />
  }
  else {
    return <MuiLink component="a" {...props} />
  }
})

export default Link;
