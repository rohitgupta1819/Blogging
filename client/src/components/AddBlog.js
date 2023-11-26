import React, { useState } from 'react';
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStyles } from "./Utils";

const labelStyles = {fontSize:"24px", fontWeight:"bold" , mb:1, mt:2}

const AddBlog = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
      title:"",
      description:"",
      imageUrl:""
     
  })

  const handleChange = (e) =>{
    setInputs ((prevState)=>({
       ...prevState,
      [e.target.name]:e.target.value, 
    }))
     
  };

  const sendRequest = async()=>{
    const res = await axios 
      .post("http://localhost:5000/api/blog/addblog",{
         title:inputs.title,
         description:inputs.description,
         image:inputs.imageUrl,
         user:localStorage.getItem("userId")
      })

      .catch((err)=>console.log(err));
      
      const data = await res.data;
      console.log(data);
      return data;

 }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs)
    sendRequest()
    .then((data)=>console.log(data))
    .then(()=>navigate("/blogs"))
      
  }

  return (
    <div>
     <form onSubmit={handleSubmit}>
        <Box
        border={3}
        borderRadius={10}
        display="flex"
        flexDirection={"column"}
        width="80%"
        margin="auto"
        marginTop={3}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        >
          <Typography fontWeight={"bold"} padding={3} color="grey" variant="h2" textAlign={"center"} className={classes.font}>Post Your Blog</Typography>
          <InputLabel className={classes.font} sx={labelStyles}>Title</InputLabel>
          <TextField
          className={classes.font}
          name="title"
          margin='auto'
          variant="outlined"
          value={inputs.value}
          onChange={handleChange}
          />
          <InputLabel className={classes.font} sx={labelStyles}>Description</InputLabel>
          <TextField
          className={classes.font}
          name="description"
          margin='auto'
          variant="outlined"
          value={inputs.value}
          onChange={handleChange}
          />
          <InputLabel className={classes.font} sx={labelStyles}>Image Url</InputLabel>
          <TextField
          className={classes.font}
          name="imageUrl"
          margin='auto'
          variant="outlined"
          value={inputs.value}
          onChange={handleChange}
          />
          <Button
          sx={{mt:2,
          borderRadius:4}}
          variant="contained"
          color="warning"
          type="submit"
           >Submit</Button>
        </Box>
     </form>

    </div>
  )
}

export default AddBlog