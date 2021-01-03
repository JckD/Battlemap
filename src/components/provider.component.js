import React, { Component } from "react";

export const MContext = React.createContext(); //exporting context object
/**
 *  Provider component
 * 
 *  Passes state between Sidebar component and Scene component 
 *  using React Context API
 * 
 *  https://www.pluralsight.com/guides/how-to-pass-data-between-react-components
 */


export default class StateProvider extends Component {
    state = { models : '' }

    render () {
        return (
            <MContext.Provider value={
                { state: this.state,
                setModels : (value) => this.setState ({
                        models : value })}} >
                
                {this.props.children} 
                
            </MContext.Provider>
        )
    }
}