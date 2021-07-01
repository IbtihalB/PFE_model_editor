import React, { useEffect, useState } from 'react'
import  Catalogue  from '../Components/Catalogue';
import { DiagramP } from '../Components/DiagramP';
import Propreties from '../Components/Propreties/Field_Propreties';
import  '../App.css';
import { cleanup } from '@testing-library/react';
import Field_Propreties from '../Components/Propreties/Field_Propreties';
import Link_Propreties from '../Components/Propreties/Link_Propreties';
import Node_Propreties from '../Components/Propreties/Node_Propreties';
import { componenttype } from '../global';
import { connect, ConnectedProps } from 'react-redux';
import { Store } from '../Store/Store';

var count :string="" ;
/*var c=count.nodeDataArray
const [component,setComponent] = React.useState("");
const [name,setName] = React.useState("");
const [,setfrom] = React.useState("");
const [to,setto] = React.useState("");*/

export const onSelectionChanged=(node: any,)=>{
    const bar=document.getElementById("right_sidebar");
    const grid=document.getElementById("grid-container");
    if(bar!==null && grid!==null){
    if (node.isSelected){
         count ="node";
         
        (globalThis as any).$sn=node.part?.data.key;
        bar.style.width = "250px"; 
    }
    
  else
   {
    bar.style.width = "0";
   } 
   }
  }

  export const onselectField =(field:any)=>{
    const bar=document.getElementById("right_sidebar");
    const grid=document.getElementById("grid-container");
    if(bar!==null && grid!==null){
        
         count ="field";
        (globalThis as any).$sn =field.portId;
        bar.style.width = "250px";  
    }}

    export const onunselectField =()=>{
        const bar=document.getElementById("right_sidebar");
        const grid=document.getElementById("grid-container");
        if(bar!==null && grid!==null){
       
           
            bar.style.width = "0";
            
        }}
    
  export const onSelectionChanged2=(link: any)=>{
    const bar=document.getElementById("right_sidebar");
    const grid=document.getElementById("grid-container");
    if(bar!==null && grid!==null){
    if (link.isSelected){
        count = "link";
        (globalThis as any).$sn= link.part?.data.from; 
        bar.style.width = "250px";   
    }
    
  else
   {
    bar.style.width = "0";
   }}
  
  }
 function Layout () {
    const [component, setCOMP] = React.useState(<div></div>);
    const [countt, setcount] = React.useState(count);

     

     useEffect(() => {
         setcount(count);
        switch (count) {
            case "node":
                setCOMP(<div><Node_Propreties ></Node_Propreties></div>);
                break;
                case "field":
                setCOMP(<Field_Propreties></Field_Propreties>);

                break;
                case "link":
                setCOMP(<div><Link_Propreties></Link_Propreties></div>);

                break;
        
            default: 
                break;
        } 
         
     }, [countt])
   
    return (
        <div className="grid-container" id="grid-container">
        <nav>Navbar <p>{countt}</p></nav>
        <main>Main<DiagramP></DiagramP></main>
        <div  className="sidebar"> <Catalogue></Catalogue></div>
        <div  id="right_sidebar">{component} </div>
        </div>
    );
}
const mapState = (state:Store.RootState ) => ({
    nodeDataArray: state,
  })
  
  const mapDispatch = {
   
  }
  const connector = connect(mapState, mapDispatch);
  
  // The inferred type will look like:
  // {isOn: boolean, toggleOn: () => void}
  type PropsFromRedux = ConnectedProps<typeof connector>;
  export default connector(
   Layout);
