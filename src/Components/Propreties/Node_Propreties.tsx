
import React, { Fragment } from 'react'
//import  '../App.css';
import { makeStyles, Theme, createStyles, Accordion, AccordionDetails, AccordionSummary, Typography, AccordionActions, Button, Chip, Divider, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Margin } from 'gojs';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
interface prop{
  render:(props: any) => JSX.Element
}


   const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',     
       backgroundColor: "transparent", 
       height:"14%",
       

    },
    
    secondaryHeading: {backgroundColor: "transparent", 
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {backgroundColor: "transparent", 
      
      marginTop:"-25px"
    },
    column: {
      flexBasis: '33.33%', backgroundColor: "transparent", 
      marginTop:"-20px",marginLeft:"-5px",color:"white"
    },
    
    accordsum:{
      backgroundColor: "transparent", 
        height:'10%',
        marginTop:"-20px",marginLeft:"-5px"
      
    },
    textfield:{
      height:'5%'
    },
     input:{
      marginTop:"-20px",marginLeft:"15px"
  },
  heading: {
    backgroundColor: "transparent", 
    fontSize: theme.typography.pxToRem(15),
    marginTop:"-12px",color:"white"
  },
  expand:{
    marginTop:"-51px",
    marginLeft:"200px",
    color:"white"
  },
  component:{
    marginTop:"1px"
  },
  table:{
    marginTop:'-7px'
  }

  }),
 
);
const  Node_Propreties: React.FC = () =>{
  const classes = useStyles();
  const [state, setState] = React.useState({
    
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  /* const { setData } = props;
   const [e,sete]=React.useState()
   const {render}=props<div>{render({ setData })} </div>
       <div>{data} </div>
       <AccordionActions>
         
          <Button size="small" color="primary">
            Edit
          </Button>
        </AccordionActions>
   const [data, setData] = useState();
   const { render } = props;*/


  return (
    <div>
     
    <div className={classes.component}>
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}>Propreties</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        
          <div > <p className={classes.column}> Name </p></div>
          <div className={classes.input}>
          <input type="email" className=" form-control-sm" id="exampleFormControlInput1" placeholder="nom de table" />
          </div>
         
          
        </AccordionDetails>
        
        
      </Accordion>
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}>Triggers</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        
        <FormGroup >
        <FormControlLabel
        label="Primary"
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        }
        
      />
       <FormControlLabel       
        label="Pri"
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedF"
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        }

      />
       <FormControlLabel
       label="Primary"
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedG"
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        }
        
      />
      </FormGroup>

        </AccordionDetails>
        <button type="button" className="btn btn-primary" > Edit </button>

        
        
      </Accordion>
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}>Attributes</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        
        <FormGroup >
        <FormControlLabel
        label="Primary"
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        }
        
      />
       <FormControlLabel
       label="Primary"
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedF"
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        }
        
      />
       <FormControlLabel
        control={
          <Checkbox
          
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedG"
            color="primary"
          />
        }
        labelPlacement="start"
        label="Primary"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedG"
            color="primary"
          />
        }
        label="Primary"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedG"
            color="primary"
          />
        }
        label="Primary"
      />
      </FormGroup>
          
        </AccordionDetails>
        
        
      </Accordion>
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}>Comments</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        
          <div > <p className={classes.column}>  </p></div>
          
          <TextField
         id="outlined-multiline-static"
         
         multiline
         rows={4}
         defaultValue="Default Value"
         variant="outlined"
        />
          
         
          
        </AccordionDetails>
        
        
      </Accordion>
      </div>
    </div>
  );
}
   
    

export default Node_Propreties




























































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

