import React, { Component } from 'react';
import { useState } from 'react';
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
import loadModel from '../utils/modelLoader.js';


export default class sideBar extends Component {

    constructor(props) {
        super(props)
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.getModel = this.getModel.bind(this);

        this.state = {
            sideBarOpen : true
        }
    }

    handleDrawerOpen() {
        this.setState({
            sideBarOpen : !this.state.sideBarOpen
        })
    }

    getModel() {
        //const selectedFile = document.getElementById('input').files[0];
       // loadModel(selectedFile);
    }



    render() {
        return (
            <>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
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
                open={this.state.sideBarOpen}
                >
                    <div>
                    <IconButton onClick={this.handleDrawerOpen}>
                        <ChevronRightIcon />
                    </IconButton>
                    <Divider />
                    <List>
                        <ListItem>
                        <Button variant="contained" component="label">
                            Upload Model
                            <input type="file" hidden id='input' />
                        </Button>
                        </ListItem>
                        
                    
                    </List>
                    </div>
                
                </Drawer>
            </>
        )
    }
}