import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, Slide, styled, ThemeProvider, useScrollTrigger } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import PropTypes from "prop-types";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const menuButtonTheme = createTheme({
  typography: {
    button: {
      fontSize: "1.1rem",
      textTransform: "none"
        }
    }
});

const pages = ['Resume', 'Skills', 'Books', 'Courses', 'Projects', 'Blog', 'Contact'];

function HideOnScroll(props: any) {
    const {children} = props;
    return (
        <Slide appear={false} direction="down" in={!useScrollTrigger()}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};


const MenuBar = () => {

    return (
        <header>
            <HideOnScroll>
              <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Container maxWidth="xl">
                  <Toolbar disableGutters
                           sx={{ justifyContent: "space-between" }}>
                    <ThemeProvider theme={menuButtonTheme}>
                      <Link to="/">
                        <Button
                          key="Lukas Woodtli"
                          sx={{ color: "white" }}
                        >
                          Lukas Woodtli
                                    </Button>
                                </Link>
                                <div/>
                                <Box>
                                    {pages.map((page) => (
                                        <Link to={"/" + page.toLowerCase()}
                                              key={page + "_link"}>
                                            <Button
                                                key={page + "_button"}
                                                sx={{color: 'white'}}
                                            >
                                                {page}
                                            </Button>
                                        </Link>
                                    ))}
                                </Box>
                            </ThemeProvider>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Offset/>
        </header>
    );
};
export default MenuBar;
