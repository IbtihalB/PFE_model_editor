import { makeStyles, Theme, createStyles, Accordion, AccordionSummary, Typography, AccordionDetails, FormControlLabel, Checkbox, TextField, FormControl, InputLabel, NativeSelect, InputBase, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react'

import { FormGroup } from 'reactstrap';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
interface prop{
    render:(props: any) => JSX.Element
  } 
  const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
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
      marginTop:"-20px",marginLeft:"-5px",color:"white"
    },
    
    accordsum:{
      backgroundColor: "transparent", 
        height:'10%',
        marginTop:"-20px",marginLeft:"-5px"
      
    },
    textfield:{
      height:'5%'
    },
    margin: {
      margin: theme.spacing(1),
      width:"190px"
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
  }

  }),
 
);
 const  Field_Propreties: React.FC = () =>{
  const classes = useStyles(); const [age, setAge] = React.useState('');

  const handleChangee = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const [state, setState] = React.useState({
    
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

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
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}>Definition</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <FormGroup > 
          <div > <p className={classes.column}> Name </p></div>
          <input type="email" className=" form-control-sm" id="exampleFormControlInput1" placeholder="nom de table" />
          <br></br>
          <div > <p className={classes.column}> Type </p>   <p > Real </p></div>

          <input type="email" className=" form-control-sm" id="exampleFormControlInput1" placeholder="nom de table" />
          <FormControlLabel
         label="Invisible"
         labelPlacement="start"
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
        label="Unique"
        labelPlacement="start"
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

      /><FormControlLabel
      label="Expose as Rest resource"
      labelPlacement="start"
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
     label="Reject NULL value input"
     labelPlacement="start"
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
   <FormControlLabel       
     label="Map NULL values to blank values"
     labelPlacement="start"
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
        
        
      </Accordion>
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}>Indexing</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
       <FormGroup row> <div > <p className={classes.column}> Index </p></div>
       <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel>
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
          
      </FormGroup>

        </AccordionDetails>

      </Accordion>
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}> Data Entry Control</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
         <FormGroup >
       
        <FormControlLabel
        label="Allow Choice list"
        labelPlacement='start'
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
     </FormGroup>
          
        </AccordionDetails>
        
        
      </Accordion>
      
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}>Help tip</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
        <TextField
         id="outlined-multiline-static"
         
         multiline
         rows={2}
         defaultValue="Default Value"
         variant="outlined"
        />
         
          
          
          
         
          
        </AccordionDetails>
        
        
      </Accordion>
      
      <Accordion  className={classes.root}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header" className={classes.accordsum}
          
        >
          <div >
            <Typography className={classes.heading}> Comments</Typography>  
            <ExpandMore className={classes.expand}></ExpandMore>
          </div>
         
        </AccordionSummary>
        <AccordionDetails className={classes.details}>

         <TextField
         id="outlined-multiline-static"
         
         multiline
         rows={4}
         defaultValue="Default Value"
         variant="outlined"
        />
         
          
          
          
         
          
        </AccordionDetails>
        
        
      </Accordion>
      </div>
    );
     
}
export default Field_Propreties

