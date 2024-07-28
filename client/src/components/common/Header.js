import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import GroupIcon from "@mui/icons-material/Group";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { logout } from "../../redux/reducers/authReducer";
import {
  LOGOUT_MENUT_ITEM,
  PROFILE_MENU_ITEM,
  DASHBOARD_MENU_ITEM,
  LS_USERNAME_KEY,
} from "../../utils/Constants";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/Paths";

const settings = [PROFILE_MENU_ITEM, DASHBOARD_MENU_ITEM, LOGOUT_MENUT_ITEM];

const AppNameLogo = () => {
  return (
    <>
      <GroupIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Login System
      </Typography>
    </>
  );
};

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authenticated = useSelector((state) => state.auth.authenticated);
  const { pathname } = location;
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };

  const logoutUser = () => {
    // Logout from redux
    dispatch(logout());

    // Clear from localStorage
    localStorage.removeItem(LS_USERNAME_KEY);

    // Navigate user to login page
    navigate(LOGIN_ROUTE);
  };

  const handleMenuItemClick = (_, index) => {
    const selectedMenu = settings[index];

    switch (selectedMenu) {
      case PROFILE_MENU_ITEM:
        break;
      case DASHBOARD_MENU_ITEM:
        navigate(HOME_ROUTE);
        break;
      case LOGOUT_MENUT_ITEM:
        logoutUser();
        break;
      default:
        break;
    }
    handleCloseUserMenu(_);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AppNameLogo />

          {authenticated ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={setting}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {pathname !== LOGIN_ROUTE && (
                <Button color="inherit" onClick={() => navigate(LOGIN_ROUTE)}>
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
