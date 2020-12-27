
import './App.css';
import React from 'react'
import Test from './components/test.component';
import { useState } from 'react';
import modelList from './components/modelList.component';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


function App() {
  
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        BattleMap
      </Typography>
    </Toolbar>
    <Drawer 
    
      variant="persistent"
      anchor="left"
      open={open}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
          <Divider />
          <List>
            <ListItem>
              <Button
                variant="contained"
                component="label"
              >
                Upload Model
                <input
                  type="file"
                  hidden
                />
              </Button>
            </ListItem>
            
           
          </List>
        </div>
      
    </Drawer>
    <Test/>
   </>
    
  );
}

export default App;
