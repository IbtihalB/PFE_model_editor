
  import  {ReactDiagram}  from 'gojs-react';
  import  '../App.css';
  import React from "react";
  import { Store} from '../Store/Store'
  import { connect, ConnectedProps } from 'react-redux';


 const DiagramP:React.FC <PropsFromRedux>=(props:PropsFromRedux)=>{
     
    return(
      
    <div className="diagram_context" >
    <div style={{ position: "relative"}}> 
       <ReactDiagram
      initDiagram={props.diagram}
      divClassName='diagram-component'
      nodeDataArray={props.nodedataarray} 
      skipsDiagramUpdate={true}  
    />  
     </div> 
  
        </div>
    
        );}
    

        const mapState = (state:Store.RootState ) => ({
         
          diagram:state.init,
          nodedataarray:state.nodeDataArray

          //selected_component:component_selected
        })
        
        const mapDispatch = {
         
        }
        const connector = connect(mapState, mapDispatch);
        
        // The inferred type will look like:
        // {isOn: boolean, toggleOn: () => void}
        type PropsFromRedux = ConnectedProps<typeof connector>;
        export default connector(DiagramP);

