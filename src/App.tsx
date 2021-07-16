
import Layout from "./Layouts/Layout";


   enum Type{
    "Alpha","Text","Date","Time","Boolean","Picture","Blob","Object"
  }
  // render function...
  export interface Item {
    name: string,
    Type:any,
    iskey:Boolean,
    invisible:Boolean,
    unique:Boolean,
    Null:Boolean,
    Incrémentation_auto:Boolean,
    Taille:bigint,
    Index:Boolean,
    Commentaire:Text 
  }
  
  export default function App () {
   
    return ( 
      <div>
      <Layout> </Layout>
      </div>
    
     
    );
  }
