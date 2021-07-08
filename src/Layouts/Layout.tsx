import React, { useEffect, useState } from 'react'
import  Catalogue  from '../Components/Catalogue';
import { DiagramP } from '../Components/DiagramP';
import Propreties from '../Components/Propreties/Field_Propreties';
import  '../App.css';
import Field_Propreties from '../Components/Propreties/Field_Propreties';
import Link_Propreties from '../Components/Propreties/Link_Propreties';
import Node_Propreties from '../Components/Propreties/Node_Propreties';
import { connect, ConnectedProps } from 'react-redux';
import { Store } from '../Store/Store';
import { InitialDiagramComponents } from '../Store/DiagramReducer';
import  { Ps } from '../Components/Propreties/Propretiees';


/*var c=count.nodeDataArray
const [component,setComponent] = React.useState("");
const [name,setName] = React.useState("");
const [,setfrom] = React.useState("");
const [to,setto] = React.useState("");*/

//_INITIAL_DATA_.type="node" 
  
 function Layout (props:PropsFromRedux) {
    InitialDiagramComponents.c="nodeze"
    const [component,setcomp] =React.useState(<div></div>)
    const [c,setc] =React.useState(globalThis.r)

    const[d,setd]=React.useState("fg")
     useEffect(() => {
       
       return () => {
        switch (globalThis.r) {
          case "node":
            setcomp(
            <Node_Propreties render={(props:any) => {
              const { setData } = props;
              return <Ps setData={setData} />;
            }}
            />);
            break;
            case "link":
              setcomp(<Link_Propreties render={(props:any) => {
                const { setData } = props;
                return <Ps setData={setData} />;
              }}
              />)
              break;
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
       
     , [globalThis.r])
   
   
    return (
        <div className="grid-container" id="grid-container">
        <nav> Navbar {globalThis.r} </nav>
        <main>Main 
        <DiagramP></DiagramP></main>
        <div  className="sidebar"> <Catalogue> {global.r}</Catalogue></div>
        <div  id="right_sidebar">  {component}
            </div>
        </div>
    );
}
const mapState = (state:Store.RootState ) => ({
    componenttype:  state.getcompotype() ,
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
