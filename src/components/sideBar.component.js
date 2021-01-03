import React, { Component } from 'react';
import { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, Slider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import loadModel from '../utils/modelLoader.js';
import MContext from './provider.component';
import Scene from './scene.component';

const ModelList = props => (
    <ListItem >
        <PopupState variant='popover' popupId='demo-popup=menu'>
            {(popupState => (
                <React.Fragment>
                    <Button {...bindTrigger(popupState)}>
                        {props.model.name}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>Add to Scene</MenuItem>
                        <MenuItem onClick={popupState.close}>Position</MenuItem>
                        <Divider/>
                            <MenuItem onClick={popupState.close}>Scale</MenuItem>
                            <Slider/>
                        <Divider/>
                        
                        <MenuItem onClick={popupState.close}>Colour</MenuItem>
                        <MenuItem onClick={popupState.close}>Rename</MenuItem>
                    </Menu>
                </React.Fragment>
            ))}           
        </PopupState> 
    </ListItem>
)

export default class sideBar extends Component {

    constructor(props) {
        super(props)
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.getModel = this.getModel.bind(this);
        this.listModels = this.listModels.bind(this);

        this.state = {
            sideBarOpen : true,
            files : [],
        }
    }

    handleDrawerOpen() {
        this.setState({
            sideBarOpen : !this.state.sideBarOpen
        })
    }

    getModel(e) {
        var files = e.target.files;
        //console.log(files);
        var filesArr = Array.prototype.slice.call(files);
        //console.log(filesArr);
        this.setState({ files: [...this.state.files, ...filesArr] });
    }

    listModels(modelsList) {
        return modelsList.map(function(currentModel, i) {
            return <ModelList model={currentModel} key={i} index = {i} />
        })
    }



    render() {
        return (
            <>
                <Toolbar disableGutters='true'>
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
                       <Typography variant="h7" noWrap>
                           Models
                       </Typography>
                    <IconButton onClick={this.handleDrawerOpen} edge='end'>
                       <ChevronLeftIcon />
                    </IconButton>
                    <Divider />
                    <List>
                        <ListItem>
                            <Button variant="contained" component="label">
                                Upload Model
                                <input type="file" hidden id='input' onChange={this.getModel} />
                            </Button>
                        </ListItem>
                        
                        <Divider />
                        {this.listModels(this.state.files)} 
                        
                    
                    </List>
                    </div>
                
                </Drawer>
                <Scene model={this.state.files}/>
            </>
        )
    }
}