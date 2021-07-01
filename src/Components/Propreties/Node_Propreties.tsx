import go, { Diagram } from 'gojs';
import { Point, Rect, Size, Margin, Spot } from 'gojs';
import React, { Fragment } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { Store } from '../../Store/Store';
//import  '../App.css';
import TextField from '@material-ui/core/TextField/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useEffect } from 'react';


export default function Node_Propreties() {
    return (
        <div>
            <h1>node</h1>
        </div>
    )
}



























































//import  {sidebarcomponenettype } from '../Layouts/Layout';
/*
interface propretiescomponent{
    type:any,
    data:any
}

<h6  className={classes.title}> </h6>
<TextField id="filled-basic" label="Filled" variant="filled" value="f"/>
  
const Propreties:React.FC<propretiescomponent>=(props:propretiescomponent)=>{

    /*componentWillReceiveProps(nextProps) {
        // Any time props.email changes, update state.
        if (nextProps.email !== this.props.email) {
          this.setState({
            email: nextProps.email
          });
        }
      }*/
      /*
   
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    title: {
        margin: theme.spacing(-6, 1, 0),
        color:"white",fontSize:'100%',
        fontFamily:' system-ui'
      }, }),
      );
      const classes = useStyles();
      const [type, settype] = React.useState((globalThis as any).$dk)
      const [date, setdata] = React.useState((globalThis as any).$sn)
      
      const [form, setForms] = React.useState(<div><h6  className={props.type}> {date}  </h6>
        <TextField id="filled-basic" label={(globalThis as any).$dk} variant="filled" value={(globalThis as any).$dk}/></div>)  
        
      useEffect(() => {
          if(props.type!==props.type )
        switch (props.type) {
            case "node":
                if(props.data!==props.data)
                {setForms( <div><h6  > {props.type} {props.data} node</h6>
            <TextField id="filled-basic" label={(globalThis as any).$dk} variant="filled" value={(globalThis as any).$dk}/></div>)};
                break;
                case "field":
                    setForms( <div><h6  > {props.type} {props.data} field</h6>
                    <TextField id="filled-basic" label={(globalThis as any).$dk} variant="filled" value={(globalThis as any).$dk}/></div>);
                break;
                case "link":
                    setForms( <div><h6  >  {props.type} {props.data} link</h6>
                    <TextField id="filled-basic" label={(globalThis as any).$dk} variant="filled" value={(globalThis as any).$dk}/></div>);
                break;
        
            default:
                break;
        }
       
      }, [(globalThis as any).$dk,(globalThis as any).$sn,type])
    return (
       
             <div >
                
                <h6  >  {props.type} {props.data}</h6>
            </div>

              

          );
}
const mapState = (state:Store.RootState ) => ({
    diagram: state.diagram,
  })
  
  const mapDispatch = {
    
  }
  const connector = connect(mapState, mapDispatch);
  
  // The inferred type will look like:
  // {isOn: boolean, toggleOn: () => void}
  type PropsFromRedux = ConnectedProps<typeof connector>;
  export default connector(Propreties);
  */
 
/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

/**
  This class implements an inspector for GoJS model data objects.
  The constructor takes three arguments:
    {string} divid a string referencing the HTML ID of the to-be inspector's div.
    {Diagram} diagram a reference to a GoJS Diagram.
    {Object} options An optional JS Object describing options for the inspector.

  Options:
    inspectSelection {boolean} Default true, whether to automatically show and populate the Inspector
                               with the currently selected Diagram Part. If set to false, the inspector won't show anything
                               until you call Inspector.inspectObject(object) with a Part or JavaScript object as the argument.
    includesOwnProperties {boolean} Default true, whether to list all properties currently on the inspected data object.
    properties {Object} An object of string:Object pairs representing propertyName:propertyOptions.
                        Can be used to include or exclude additional properties.
    propertyModified function(propertyName, newValue) a callback
    multipleSelection {boolean} Default false, whether to allow multiple selection and change the properties of all the selected instead of
                                the single first object
    showAllProperties {boolean} Default false, whether properties that are shown with multipleSelection use the intersect of the properties when false or the union when true
                                only affects if multipleSelection is true
    showSize {number} Defaults 0, shows how many nodes are showed when selecting multiple nodes
                      when its lower than 1, it shows all nodes

  Options for properties:
    show: {boolean|function} a boolean value to show or hide the property from the inspector, or a predicate function to show conditionally.
    readOnly: {boolean|function} whether or not the property is read-only
    type: {string} a string describing the data type. Supported values: "string|number|boolean|color|arrayofnumber|point|rect|size|spot|margin|select"
    defaultValue: {*} a default value for the property. Defaults to the empty string.
    choices: {Array|function} when type == "select", the Array of choices to use or a function that returns the Array of choices.

  Example usage of Inspector:

  var inspector = new Inspector("myInspector", myDiagram,
    {
      includesOwnProperties: false,
      properties: {
        "key": { show: Inspector.showIfPresent, readOnly: true },
        "comments": { show: Inspector.showIfNode  },
        "LinkComments": { show: Inspector.showIfLink },
        "chosen": { show: Inspector.showIfNode, type: "checkbox" },
        "state": { show: Inspector.showIfNode, type: "select", choices: ["Stopped", "Parked", "Moving"] }
      }
    });

  This is the basic HTML Structure that the Inspector creates within the given DIV element:

  <div id="divid" class="inspector">
    <tr>
      <td>propertyName</td>
      <td><input value=propertyValue /></td>
    </tr>
    ...
  </div>

*/

