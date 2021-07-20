import React, { useEffect, useState } from 'react'
import  Catalogue  from '../Components/Catalogue';
import  DiagramP  from '../Components/DiagramP';
import  '../App.css';
import Node_Propreties from '../Components/Propreties/Node_Propreties';
import { connect, ConnectedProps } from 'react-redux';
import { Store } from '../Store/Store';
import go from 'gojs';
import { Fragment } from 'react';
import diagram from '../diagram.json'
import Field_Propreties from '../Components/Propreties/Field_Propreties';
import Link_Propreties from '../Components/Propreties/Link_Propreties';


 export var model:any=JSON.stringify(diagram);
  
 function Layout (props:PropsFromRedux) {
    const [component,setcomp] =React.useState(<div></div>)
   
      
        function save() {
         model  =  props.diagram.model.toJson();
          props.diagram.isModified = false;
        }
        function load() {
          if(model!==null)
          props.diagram.model = go.Model.fromJson(JSON.parse(model));
        }
    return (
      <Fragment>
        
        <div className="grid-container" id="grid-container">
        <nav> <button id="loadModel" onClick={load}>Load</button>
    <button id="saveModel" onClick={save}>Save</button></nav>
        <main>  <DiagramP></DiagramP> </main>
        <div  className="sidebar"> <Catalogue></Catalogue></div>
        <div  id="right_sidebar"> <Node_Propreties />  </div>
        

        </div>
       
     </Fragment>
    );
}
const mapState = (state:Store.RootState ) => ({
    
    diagram:state.diagram
  })
  
  const mapDispatch = {
   
  }
  const connector = connect(mapState, mapDispatch);
  
  // The inferred type will look like:
  // {isOn: boolean, toggleOn: () => void}
  type PropsFromRedux = ConnectedProps<typeof connector>;
  export default connector(
   Layout);
