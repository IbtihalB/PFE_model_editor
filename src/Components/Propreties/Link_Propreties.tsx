import { makeStyles, Theme, createStyles, Accordion, AccordionSummary, Typography, AccordionDetails, FormControlLabel, Checkbox, TextField, FormControl, InputLabel, NativeSelect, InputBase, withStyles, Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { render } from 'react-dom';
import { FormGroup } from 'reactstrap';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import BallotIcon from '@material-ui/icons/Ballot';
import { Margin } from 'gojs';
interface prop{
    render:(props: any) => JSX.Element
  } 
  const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow:"none",
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
   
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',     
       backgroundColor: "transparent", 
       height:"14%",
    },
    
    secondaryHeading: {backgroundColor: "transparent",
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {backgroundColor: "transparent", 
      
      marginTop:"-25px"
    },
    column: {
      flexBasis: '33.33%', backgroundColor: "transparent", 
      marginTop:"10px",marginLeft:"-5px",color:"white"
    },
    
    accordsum:{
      backgroundColor: "transparent", 
        marginTop:"-20px",marginLeft:"-5px",
      
    },
    textfield:{
      height:'5%'
    },
     input:{
      marginTop:"-20px",marginLeft:"15px"
  },
  heading: {
    backgroundColor: "transparent", 
    fontSize: theme.typography.pxToRem(15),
    marginTop:"-12px",color:"white"
  },
  expand:{
    marginTop:"-51px",
    marginLeft:"200px",
    color:"white"
  },
  component:{
    marginTop:"1px"
  },
  table:{
    marginTop:'-7px'
  },
  margin: {
    margin: theme.spacing(1),
    width:"150px",marginTop:"-70px",marginLeft:"70px"
  },
  margin2:{
    margin: theme.spacing(1),
    width:"150px",marginTop:"-80px",marginLeft:"70px", 
  },
  titleicon:{
    color:"white",
    marginTop:"-65px",
    marginLeft:"-39px",
  },
  title:{
    color:"white",
    marginTop:"-54px",
    marginLeft:"-11px"
  },
  compdetail:{
    color:"white",
    marginTop:"-24px",
    marginLeft:"85px",
  },
  titleComp:{
   
    marginTop:"-25px",
    marginBottom:"23px",
    marginLeft:"49px",
    display:"block",
    
  },
  from:{marginTop:"-44px",color:"white",marginLeft:"47px"},
  to:{
    marginTop:"-40px",
    color:"white",
    marginLeft:"47px"
  },
  definition: {marginBottom:"-35px",boxShadow:"none",
  backgroundColor: "transparent", 
    'label + &': {
      marginTop: theme.spacing(3),
      
    },
  },
  divider:{
    marginBottom:"5px",
    color:"black"
    
  },
  option:{
   boxShadow:"none",marginBottom:"-35px",
   backgroundColor: "transparent", 
    'label + &': {
      marginTop: theme.spacing(3),
  }},
  deletion:{
    boxShadow:"none",marginBottom:"-35px",
    backgroundColor: "transparent", 
    'label + &': {
      marginTop: theme.spacing(3),
  }},
  options:{
    boxShadow:"none",marginBottom:"-35px",
    backgroundColor: "transparent", 
     'label + &': {
       marginTop: theme.spacing(3),
   }},
   label:{
    marginTop:"-20px",
    marginLeft:"-20px",color:"white"
   },
   name:{
    marginTop:"-44px",color:"white",marginLeft:"47px"
   },
   type:{
    marginTop:"10px" ,
    marginLeft:"-5px",color:"white"
   },
   wild:{
    marginTop:"-30px" ,
    marginLeft:"-5px",color:"white"
   },
   nameoptions:{
    marginTop:"-44px",color:"white",marginLeft:"47px"

   },
   type2:{
    marginTop:"10px" ,
    marginLeft:"-5px",color:"white"
   },
   secondchekbox:{
    marginTop:"-20px" ,
    marginLeft:"-5px",color:"white"
   },
   thirdchakbox:{
    marginTop:"-10px" ,
    marginLeft:"-5px",color:"white"
   },
   fourthcheckbox:{
    marginTop:"-10px" ,
    marginLeft:"-5px",color:"white" 
   },
   fifthchekbox:{
    marginTop:"-10px" ,
    marginLeft:"-5px",
    color:"white"  
   },
   checkboxicon:{
     marginLeft:"30px"
   }
   

  }),
 
);
 const  Link_Propreties: React.FC = () =>{
  const classes = useStyles();
  const [state, setState] = React.useState({
    
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const [age, setAge] = React.useState('');

  const handleChangee = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  /* const { setData } = props;
   const [e,sete]=React.useState()
   const {render}=props<div>{render({ setData })} </div>
       <div>{data} </div>
       <AccordionActions>
         
          <Button size="small" color="primary">
            Edit
          </Button>
        </AccordionActions>
   const [data, setData] = useState();
   const { render } = props;*/
   /* const { setData } = props;
    const [e,sete]=React.useState()
    const {render}=props
    const [data, setData] = useState();
    const { render } = props;  <div>{render({ setData })} </div>
        <div>{data} </div>
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
    
     


  return (
    
     
    <div className={classes.component}>
    <div  className={classes.titleComp}> <BallotIcon className={classes.titleicon}> </BallotIcon> <Typography className={classes.title} >  Relation  </Typography > <Typography className={classes.compdetail}>  Table to Table  </Typography> </div>

      <Accordion  className={classes.definition}>
        <AccordionSummary
          
          id="panel1c-header" className={classes.accordsum} >
      <Divider className={classes.divider} ></Divider>

          <div>
            <Typography className={classes.heading}> Definition </Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <FormGroup > 
          <div > <p className={classes.column}> From </p></div>
         <div className={classes.from}> <input type="email" className=" form-control-sm" id="exampleFormControlInput1" placeholder="From" /></div>
          
          <div > <p className={classes.column}> To </p></div>
          <div className={classes.to}>
          <input type="email" className=" form-control-sm" id="exampleFormControlInput1" placeholder="To" />
         </div>
          </FormGroup>
         
          
        </AccordionDetails>
        
        <Divider className={classes.divider} ></Divider>

      </Accordion>

      <Accordion  className={classes.option}>      
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <Divider className={classes.divider} ></Divider>

          <div >
            <Typography className={classes.heading}>Many To One Option</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
       <FormGroup > <div > <p className={classes.column}> Name </p></div>
         <div className={classes.name}><input type="email" className=" form-control-sm" id="exampleFormControlInput1" placeholder="nom de table" /> </div>
          <div > <p className={classes.type}> Type </p></div>
          <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native" className={classes.margin}></InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={age}
          onChange={handleChangee}
          input={<BootstrapInput />
          }
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
          <div > <p className={classes.wild}> Wildcard <br></br>
          Choice </p></div>
          <FormControl className={classes.margin2}>
        <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={age}
          onChange={handleChangee}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
        
        <FormControlLabel
         label="Prompt if related one does not exist"
         labelPlacement="start"
         className={classes.secondchekbox}
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        }
        
      />
       <FormControlLabel       
        label="Auto Wildcard support"
        labelPlacement="start"
        className={classes.thirdchakbox}
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedF"
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        }

      />
       
      </FormGroup>

        </AccordionDetails>

        <Divider className={classes.divider} ></Divider>

      
      </Accordion>



      <Accordion  className={classes.options}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
                    <Divider className={classes.divider} ></Divider>

          <div >
            <Typography className={classes.heading}> One To Many Options</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
         <FormGroup ><div > <p className={classes.column}> Name </p></div>
          <div className={classes.nameoptions}><input type="email" className=" form-control-sm" id="exampleFormControlInput1" placeholder="nom de table" />
          </div>
          <div > <p className={classes.type2}> Type </p></div>
          <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
        <NativeSelect
          id="demo-customized-select-native sm"
          value={age}
          onChange={handleChangee}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
        <FormControlLabel
        label="Auto asking related value in subform"
        labelPlacement='start'
        className={classes.fourthcheckbox}
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
            icon={<CheckBoxOutlineBlankIcon className={classes.checkboxicon} fontSize="small" />}
            checkedIcon={<CheckBoxIcon className={classes.checkboxicon} fontSize="small" />}
          />
        }
        
      />
     </FormGroup>
          
        </AccordionDetails>
        
              <Divider className={classes.divider} ></Divider>

      </Accordion>

      <Accordion  className={classes.deletion}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
        <Divider className={classes.divider} ></Divider>

          <div >
            <Typography className={classes.heading}>Deletion Control</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <FormGroup className={classes.label}>
        <FormControlLabel
         label="Leave related many intact"
         labelPlacement="start"
         
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
            icon={<CircleUnchecked  fontSize="small" />}
            checkedIcon={<CircleCheckedFilled  className={classes.checkboxicon} fontSize="small" />}
          />
        }
        
      />
       <FormControlLabel       
        label="Delete related many "
        labelPlacement="start"
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedF"
            color="primary"
            icon={<CircleUnchecked className={classes.checkboxicon}fontSize="small" />}
            checkedIcon={<CircleCheckedFilled className={classes.checkboxicon} fontSize="small" />}
          />
        }

      />
       <FormControlLabel       
        label="Cannot delete if related many "
        labelPlacement="start"
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedF"
            color="primary"
            icon={<CircleUnchecked className={classes.checkboxicon}fontSize="small" />}
            checkedIcon={<CircleCheckedFilled className={classes.checkboxicon} fontSize="small" />}
          />
        }

      />
       
      </FormGroup>
         
          
          
          
         
          
        </AccordionDetails>
        
        <Divider className={classes.divider} ></Divider>

      </Accordion>
      </div>
    );
     
}
export default Link_Propreties
