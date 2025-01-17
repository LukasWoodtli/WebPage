import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from '@mui/material/IconButton';
import { createTheme, Menu, MenuList, Slide, styled, ThemeProvider, useScrollTrigger } from "@mui/material";
import Link from "../components/link";
import PropTypes from "prop-types";
import { navigate } from "gatsby";


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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function handleNavigate(page: string) {
    return navigate("/" + page.toLowerCase());
  }

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
                      sx={{ color: "white" }}>
                      Lukas Woodtli
                    </Button>
                  </Link>
                  <div />
                  {/* buttons */}
                  <Box  sx={{ display: { xs: "none", md: "block" } }}>
                    {pages.map((page) => (
                      <Link to={"/" + page.toLowerCase()}
                            key={page + "_link"}>
                        <Button
                          key={page + "_button"}
                          sx={{ color: "white" }}
                        >
                          {page}
                        </Button>
                      </Link>
                    ))}
                  </Box>
                  {/* buttons end */}
                  {/* menu */}
                  <Box sx={{  display: { xs: "block", md: "none" } }}>
                    <IconButton
                      size="large"
                      aria-label="menu"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: "block", md: "none" }
                      }}
                    >
                      {pages.map((page) => (
                        <MenuItem key={page} onClick={() => handleNavigate(page)}>
                          <Link to={"/" + page.toLowerCase()}
                                key={page + "menu_link"}
                                color={"inherit"}
                                underline={"none"}>
                            {page}
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                  {/* menu end */}
                </ThemeProvider>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
        <Offset />
      </header>
    );
};
export default MenuBar;
