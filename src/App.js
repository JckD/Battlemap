
import './App.css';
import React from 'react'
import Test from './components/test.component';
import { useState } from 'react';
import loadModel from './utils/modelLoader.js';
import SideBar from './components/sideBar.component';

function App() {
  
  return (
    <>
      <SideBar/>
      <Test/>
    </>
    
  );
}

export default App;
