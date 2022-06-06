import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Avatar,
  Drawer,
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import "../App.css";
import {
  AccountCircleOutlined,
  AddOutlined,
  AssignmentInd,
  Difference,
  Flaky,
  LogoutOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/authSlice";
import { refreshApplicationState } from "../redux/applicationSlice";

const drawerWidth = 240;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  let menuItems = [];

  if (user.roles[0] === "SYSTEM_ADMIN") {
    menuItems = [
      {
        text: "Dashboard",
        icon: <AccountCircleOutlined />,
        path: "/dashboard",
      },
      {
        text: "Pending Profiles",
        icon: <Flaky />,
        path: "/pending-profiles",
      },
      {
        text: "Leave Request",
        icon: <Difference />,
        path: "/leave-request",
      },
    ];
  } else if (user.roles[0] === "STUDENT") {
    menuItems = [
      {
        text: "Dashboard",
        icon: <AccountCircleOutlined />,
        path: "/dashboard",
      },
      {
        text: "Apply Leave",
        icon: <AddOutlined />,
        path: "/apply",
      },
    ];
  } else if (
    user.roles[0] === "WARDEN" ||
    user.roles[0] === "HOD" ||
    user.roles[0] === "PROJECT_GUIDE" ||
    user.roles[0] === "LOCAL_GUARDIAN" ||
    user.roles[0] === "DSW"
  ) {
    menuItems = [
      {
        text: "Dashboard",
        icon: <AccountCircleOutlined />,
        path: "/dashboard",
      },
      {
        text: "Students",
        icon: <AssignmentInd />,
        path: "/students",
      },
    ];
  }

  const handleSignOut = () => {
    dispatch(signOutUser());
    dispatch(refreshApplicationState());
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap onClick={() => navigate("/")}>
            Leave Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <Box
            sx={{
              display: "flex",
              mt: "20px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                height: "100px",
                width: "100px",
                bgcolor: "primary.main",
                fontSize: 48,
              }}
            >
              {/* {user.name[0]} */}
            </Avatar>
            <Typography variant="h6" noWrap>
              {user.name}
            </Typography>
            <Typography variant="subtitle2" noWrap sx={{ padding: 1 }}>
              Profile status:
              <span
                style={{
                  color: "green",
                  border: "1px solid green",
                  borderRadius: "10px",
                  padding: "0px 10px 0px 10px",
                }}
              >
                {user.isApproved ? "Approved" : "Pending"}
              </span>
            </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                onClick={() => navigate(item.path)}
                sx={
                  location.pathname == item.path
                    ? {
                        background: "#F5F6FA",
                        color: "primary.main",
                      }
                    : null
                }
                key={item.text}
              >
                <ListItemIcon
                  sx={
                    location.pathname == item.path
                      ? {
                          color: "primary.main",
                        }
                      : null
                  }
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="h6">{item.text}</Typography>}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Sign Out</Typography>}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
