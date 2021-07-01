
  import * as go from 'gojs';
  import  {ReactDiagram}  from 'gojs-react';
  import  '../App.css';
  import React, { LegacyRef, useEffect, useRef } from "react";

import { Store} from '../Store/Store'


  
  // contains .diagram-component CSS
  
  // ...

  /**
   * Diagram initialization method, which is passed to the ReactDiagram component.
   * This method is responsible for making the diagram and initializing the model and any templates.
   * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
   */
   

   
 
  /**
   * This function handles any changes to the GoJS model.
   * It is here that you would make any updates to your React state, which is dicussed below.
   */
 /* function handleModelChange(null) {
    
    alert('The Data model has been updated!');
}*/


function Creation_modal() {
    
}




// Use throughout your app instead of plain `useDispatch` and `useSelector`


export  const DiagramP:React.FC =()=>{
  /*const dispatch = useAppDispatch();
  useEffectlayout(() => {
    dispatch(CreateDiagram());
  })*/
  
  const diagram_initial = Store.useAppSelector((Istate) => Istate.init);
  const nodeDataArray=Store.useAppSelector((state)=>state.nodeDataArray);  
  window.addEventListener('DOMContentLoaded', diagram_initial);
   
    return(
      
    <div className="diagram_context" >
    <div style={{ position: "relative"}}> 
       <ReactDiagram
      initDiagram={diagram_initial}
      divClassName='diagram-component'
      nodeDataArray={nodeDataArray} 
      skipsDiagramUpdate={true}
      
    />  
    
     </div>   
        </div>
    
        );}
    




function useEffectlayout(arg0: () => void) {
  throw new Error('Function not implemented.');
}

