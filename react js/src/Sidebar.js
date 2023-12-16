import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Drawer, List, ListItem, ListItemText, IconButton, Toolbar, Typography, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const SidebarContainer = styled.div`
  display: flex;
`;

const SidebarContent = styled.div`
  width: ${drawerWidth}px;
  flex-shrink: 0;
`;

const SidebarList = styled(List)`
  padding: 0;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Ensure it's above the sidebar */
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const Sidebar = ({ routes }) => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleBackdropClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <SidebarContainer className='sidebarContainer'>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Full Stack Assessment
        </Typography>
      </Toolbar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        ref={sidebarRef}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        <SidebarContent>
          <SidebarList>
            {routes.map((route, index) => (
              <ListItem
                key={index}
                button
                component={Link}
                to={route.path}
                onClick={handleDrawer}
                className={isActiveRoute(route.path) ? 'active' : ''}
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItem>
            ))}
          </SidebarList>
        </SidebarContent>
      </Drawer>
      <Backdrop open={open} onClick={handleBackdropClick} />
    </SidebarContainer>
  );
};

export default Sidebar;
