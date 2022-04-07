const React = require("react")

module.exports = {
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
       activeClassName,
       activeStyle,
       getProps,
       innerRef,
       partiallyActive,
       ref,
       replace,
       to,
       ...rest
     }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
  ),
}
