import React, { useEffect, useState } from 'react'
import  Catalogue  from '../Components/Catalogue';
import  DiagramP  from '../Components/DiagramP';
import Propreties from '../Components/Propreties/Field_Propreties';
import  '../App.css';
import Field_Propreties from '../Components/Propreties/Field_Propreties';
import Link_Propreties from '../Components/Propreties/Link_Propreties';
import Node_Propreties from '../Components/Propreties/Node_Propreties';
import { connect, ConnectedProps } from 'react-redux';
import { Store } from '../Store/Store';
import { InitialDiagramComponents } from '../Store/DiagramReducer';
import  { Ps } from '../Components/Propreties/Propretiees';
import go, { Size } from 'gojs';
import { Fragment } from 'react';


/*var c=count.nodeDataArray
const [component,setComponent] = React.useState("");
const [name,setName] = React.useState("");
const [,setfrom] = React.useState("");
const [to,setto] = React.useState("");
<div id="buttons">
       <button id="loadModel" onClick={()=>load()}>Load</button>
     </div>*/

//_INITIAL_DATA_.type="node" 
 
function a() {
  globalThis.r="a"
}
function b() {
  globalThis.r="b"
}
function e() {
  globalThis.r="c"
}
  
 function Layout (props:PropsFromRedux) {
    InitialDiagramComponents.c="nodeze"
    const [component,setcomp] =React.useState(<div></div>)
    const [c,setc] =React.useState("")

    const[d,setd]=React.useState("fg")
     useEffect(() => {
       
       return () => {
        switch (c) {
          case "a":
            setcomp(
            <Node_Propreties
            />);
            break;
            case "b":
              setcomp(<Link_Propreties  />)
              break;
              case "c": setcomp(<p>hi</p>); break;
          default:
            break;
        }}}
       /* if(c=="node")  
        setcomp(<Node_Propreties render={(props:any) => {
          const { setData } = props;
          return <Ps setData={setData} />;
        }}
        />);  
        else if(c=="link")  
        
       
       }
       }*/
       
     , [c])
     var model:any=document.getElementById("mySavedModel")
     
     function load() {
       if(model!==null)
       props.diagram.model = go.Model.fromJson(model.value);
     }
   
    return (
      <Fragment>
        <div className="grid-container" id="grid-container">
        <nav> Navbar  
        <button type="button" className="btn btn-primary" onClick={a}> a  </button>
        <button type="button" className="btn btn-primary" onClick={b}>  b  </button>
        <button type="button" className="btn btn-primary" onClick={e}> c </button>
        </nav>
        <main> <p>{c}</p>
        <DiagramP></DiagramP></main>
        <div  className="sidebar"> <Catalogue>{c} {c}</Catalogue></div>
        <div  id="right_sidebar"> <Link_Propreties  />  </div>
    </div> </Fragment>
    );
}
const mapState = (state:Store.RootState ) => ({
    componenttype:  state.getcompotype() ,
    diagram:state.diagram
    //selected_component:component_selected
  })
  
  const mapDispatch = {
   
  }
  const connector = connect(mapState, mapDispatch);
  
  // The inferred type will look like:
  // {isOn: boolean, toggleOn: () => void}
  type PropsFromRedux = ConnectedProps<typeof connector>;
  export default connector(
   Layout);
