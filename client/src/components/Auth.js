import React, { useState } from 'react';
import { TextField, Typography, Box, Button, } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../store/Index';

const Auth = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Inputs, setInputs] = useState({
    name:"",
    email:"",
    password:""
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value,
    }))

  };

  const sendRequest = async(type="login")=>{
    const res = await axios
     .post(`http://localhost:5000/api/user/${type}`,{
      name:Inputs.name,
      email:Inputs.email,
      password:Inputs.password,
     })
     .catch((err)=>console.log(err));

     const data = await res.data;
     console.log(data);
     return data;

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Inputs);
    if(isSignUp){
    sendRequest("signup")
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"));
    }else{
    sendRequest()
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          padding={3}
          boxShadow="10px 10px 20px #ccc"
          margin="auto"
          borderRadius={5}
          marginTop={5}>
          <Typography variant='h2' padding={3} textAlign="center">
            {isSignUp ? "Signup" : "Login"}
          </Typography>
          {isSignUp &&(
          <TextField
            type="text"
            name="name"
            placeholder="Name"
            margin='normal'
            value={Inputs.name}
            onChange={handleChange}
            />
          )} {" "}
            <TextField
            type="email"
            name="email"
            placeholder="Email"
            margin='normal'
            value={Inputs.email}
            onChange={handleChange}
            />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            margin='normal'
            value={Inputs.password}
            onChange={handleChange}
            
            />
            

          <Button type="submit" color="warning" variant='contained' sx={{ borderRadius: 3, marginTop: 3 }}>Submit</Button>
          
          <Button onClick={() => setIsSignUp(!isSignUp)} variant='contained' sx={{ borderRadius: 3, marginTop: 3 }}>Change To {isSignUp ? "Login" : "Signup"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth