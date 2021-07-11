
  import * as go from 'gojs';
  import  {ReactDiagram}  from 'gojs-react';
  import  '../App.css';
  import React from "react";

  import { Store} from '../Store/Store'
import { connect, ConnectedProps } from 'react-redux';


  
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







// Use throughout your app instead of plain `useDispatch` and `useSelector`


 const DiagramP:React.FC <PropsFromRedux>=(props:PropsFromRedux)=>{
  /*const dispatch = useAppDispatch();
  useEffectlayout(() => {
    dispatch(CreateDiagram());
  })*/
  
  var model:any=document.getElementById("mySavedModel")
     let save=() =>{

       if(model!==null)
       (model as any).value =props.diagram.model.toJson();
      props.diagram.isModified = true;
     }
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
     <div id="a">
     <textarea id="mySavedModel"></textarea></div>
        </div>
    
        );}
    




        const mapState = (state:Store.RootState ) => ({
         
          diagram:state.diagram
          //selected_component:component_selected
        })
        
        const mapDispatch = {
         
        }
        const connector = connect(mapState, mapDispatch);
        
        // The inferred type will look like:
        // {isOn: boolean, toggleOn: () => void}
        type PropsFromRedux = ConnectedProps<typeof connector>;
        export default connector(DiagramP);

