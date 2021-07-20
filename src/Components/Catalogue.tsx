//import * as go from 'gojs';
import  '../App.css';
import { Store } from '../Store/Store';
import React, { Fragment, Props } from 'react';
import { connect, ConnectedProps, DefaultRootState } from 'react-redux';
import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExpandMore from '@material-ui/icons/ExpandMore';
import { useEffect } from 'react';
import { AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import LabelImportantRoundedIcon from '@material-ui/icons/LabelImportantRounded';
import LayersIcon from '@material-ui/icons/Layers';
import { Accordion } from '@material-ui/core';
import { model } from '../Layouts/Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: "transparent",
      marginLeft:'-4%',
      marginTop:'-15px',
    },
    
    
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      height:'27px',
      marginTop:theme.spacing(1),
      marginRight: theme.spacing(2),
      marginLeft: '2%',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(1, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',color:'white',
    },
    inputRoot: {
      color: 'white',
      fontSize:15,
    },
    inputInput: {
      color: 'white',
      padding: theme.spacing(1, 1, 3, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    title: {
      margin: theme.spacing(2, 1, 0),
      color:"white",fontSize:'100%',
      fontFamily:' system-ui'
    },
    listSection: {
      backgroundColor: 'inherit',marginLeft:'13px',marginTop:'-30px',marginBottom:'-21px',border:"none",
      borderBlockColor:"transparent",boxShadow:"none", hideBorder: { boxShadow: 'none', '&.MuiExpansionPanel-root:before': { display: 'none', }, },

        
    },
    ul: {
      backgroundColor: 'inherit',marginTop:'17px'
    },
    node: {
      

      backgroundColor: 'inherit',
      width:'100%',fontsize:'2px',  fontFamily:' system-ui ',
      
    },
    icon:{
       fontSize:19,
       color:'#c4c4c4',
    },
    item: {
      backgroundColor: 'inherit',
        marginLeft:'7px',marginTop:'-8px',marginBottom:'5px',boxShadow: "none" , border:"none", hideBorder: { boxShadow: 'none', '&.MuiExpansionPanel-root:before': { display: 'none', }, },
   
     
    },
    itemfield:{
      backgroundColor: 'inherit',
      marginLeft:'7px',marginTop:'-10px',marginBottom:'-19px',boxShadow: "none"
    },
    itemtext:{
      color:'#c4c4c4',
      marginLeft:'-1px',
      fontSize:'5rem' ,marginTop:'-7px',border:"none"
    
    },
    addbutton:{
        marginTop:'7px',
        marginLeft:'75px',
        
      
    },
    menu:{
      marginTop:'10px',
      overflow: 'auto',
      maxHeight: 300,
      marginLeft:'2px',

    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      marginLeft:"5px",border:"none"
    },
    field:{
      marginLeft:"-59px",color:"#c4c4c4"
    },
    fieldicon:{
      marginLeft:"-26px",color:"#c4c4c4",height:"16px"
    },
    text:{width:"320px"}
  }),
);

const Catalogue:React.FC<PropsFromRedux>=(props:PropsFromRedux)=>{
  const classes = useStyles();
 
  const [searchItem,setsearchItem] =React.useState("");
  const [nodes, setNodes] = React.useState(
  
  props.nodeDataArray.filter(
     (node)=>{
       if(searchItem=="")
       return node
       else if(node.key.toLowerCase().includes(searchItem.toLowerCase()))
       return node
      }).map((node)=>
   <Accordion className={classes.item}>
   <AccordionSummary
     expandIcon={<ExpandMore />}
     aria-controls="panel1a-content"
     id="panel1a-header" className={classes.itemtext}> 
   <LayersIcon className={classes.icon}/>
   <Typography className={classes.heading}>{node.key}</Typography>
   </AccordionSummary>
   <AccordionDetails className={classes.listSection}> 
   <div>
   {node.items.map((item:any)=>
   <ListItem className={classes.itemfield}  >
          <ListItemIcon>
          <LabelImportantRoundedIcon className={classes.fieldicon}/>
          </ListItemIcon>
            <ListItemText primary={item.name} className={classes.field} />
          </ListItem>)}</div>
   </AccordionDetails> 
   </Accordion> 
 
    
  ));

  useEffect(() => {
   setNodes( props.nodeDataArray.filter(
     (node)=>{
       if(searchItem=="")
       return node
       else if(node.key.toLowerCase().includes(searchItem.toLowerCase()))
       return node
      }).map((node)=>
   <Accordion className={classes.item}>
   <AccordionSummary
     expandIcon={<ExpandMore />}
     aria-controls="panel1a-content"
     id="panel1a-header" className={classes.itemtext} > 
   <LayersIcon className={classes.icon}/>
   <Typography className={classes.heading}>{node.key}</Typography>
   </AccordionSummary>
   <AccordionDetails className={classes.listSection}>
   <div>
   {node.items.map((item:any)=>
   <ListItem className={classes.itemfield}  ><ListItemIcon>
          <LabelImportantRoundedIcon className={classes.fieldicon}/>
          </ListItemIcon>
            <ListItemText primary={item.name} className={classes.field} />
          </ListItem>)}</div>
   </AccordionDetails> 
   </Accordion> 
 
 ))   
  }, [nodes])

  
  
  return (<Fragment>
    <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,}}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event)=>{setsearchItem(event.target.value)}} />
  </div>
      
    <h6  className={classes.title}> Default Catalogue </h6>
    <div className={classes.menu}><List className={classes.root}>{nodes} </List></div>
         <div className={classes.addbutton}>
          <button type="button" className="btn btn-primary" onClick={props.addTable}> New table + </button>
         </div>
          <br></br>
         <textarea  className={classes.text}value={model}> </textarea>
      
           </Fragment>

  );
}
 
  

const mapState = (state:Store.RootState ) => ({
  nodeDataArray: state.diagram.model.nodeDataArray,
  diagram: state.diagram
})

const mapDispatch = {
  addTable: () => ({type:'ADDTABLE'}),
}
const connector = connect(mapState, mapDispatch);

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(
 Catalogue);


