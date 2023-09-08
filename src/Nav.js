import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircleOutlined, CasinoOutlined } from '@mui/icons-material';

import { userClearLocal } from "./helpers/localStorageHelper";
import UserContext from "./context/UserContext";

const pages = [ {path: '../', text: 'Games'} ];
const noUser = [ {path: '../login', text: 'Log In'}, {path: '../signup', text: 'Sign Up'} ];
const settings = [{path: '../edituser', text: 'Profile'}, {path: '../profile', text: 'My Games'}, {path: '../', text: 'Logout'}];

function Nav() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { user, setUser } = useContext(UserContext)

    function logout() {
        userClearLocal();
        setUser(null);
    };

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    };
    
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (text) => {
        if (text === 'Logout') logout();        
        setAnchorElUser(null);
    };

    function isLoggedIn() {
        return user ? true : false
    };

  return (
    <AppBar position="fixed">
        <Container maxWidth="xl">
            <Toolbar disableGutters>

                {/* Logo for md and larger sized screens. */}
                <CasinoOutlined sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    // letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    Game Night Helper
                </Typography>

                {/* Hamburger menu for xs and sm screens. */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
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
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <Link component={RouterLink} to={page.path} underline="none">{page.text}</Link>
                           </Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>

                {/* Logo for xs and sm screens. */}
                <CasinoOutlined sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    GNH
                </Typography>

                {/* Menu items for md and larger sized screens. */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        key={page.text}
                    >
                        <Link fontSize="medium" underline="hover" component={RouterLink} to={page.path} color="primary.contrastText">{page.text}</Link>
                    </Button>
                    ))}
                </Box>
                
                {/* Settings menu items. */}
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <AccountCircleOutlined sx={{color: "primary.contrastText"}} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >

                    {!isLoggedIn() && noUser.map((setting) => (
                        <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <Link component={RouterLink} to={setting.path} underline="none">{setting.text}</Link>
                            </Typography>                            
                        </MenuItem>
                    ))}

                    {isLoggedIn() && settings.map((setting) => (
                        <MenuItem key={setting.text} onClick={() => handleCloseUserMenu(setting.text)}>
                            <Typography textAlign="center">
                                <Link component={RouterLink} to={setting.path} underline="none">{setting.text}</Link>
                            </Typography>                            
                        </MenuItem>
                    ))}

                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  );
}
export default Nav;