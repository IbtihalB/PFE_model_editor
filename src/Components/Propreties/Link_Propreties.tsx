import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
interface prop{
    render:(props: any) => JSX.Element
  } 
 const  Link_Propreties: React.FC<prop> = (props: prop) =>{

   /* const { setData } = props;
    const [e,sete]=React.useState()
    const {render}=props
    const [data, setData] = useState();
    const { render } = props;  <div>{render({ setData })} </div>
        <div>{data} </div>*/
    return (
      <>
      <div>
      <h1>link</h1>
      </div>
      </>
    );
     /*useEffect(() => {
        
        return () => {
         sete(<div>
            <h1>{props.c} </h1>
        </div>)   
        }
    }, [props.c])
    return (
        <div>  
        <h1>{render({sete})} </h1>
    {e} </div>
       
    )*/
}
export default Link_Propreties