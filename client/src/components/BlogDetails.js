import React, { useState, useEffect } from 'react';
import { Button, InputLabel, TextField, Typography, Box } from '@mui/material';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useStyles } from "./Utils";
const labelStyles = { fontSize: "24px", fontWeight: "bold", mb: 1, mt: 2 }

const BlogDetails = () => {


  const classes = useStyles();
  const navigate = useNavigate();
  const id = useParams().id;
  const [blog, setBlog] = useState();

  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  };

  const fetchBlogDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  }

  useEffect(() => {
    fetchBlogDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description
      })
    })
  }, [id])

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  }

  return (
    <div>
      {inputs && (
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
              value={inputs.title}
              onChange={handleChange}
            />
            <InputLabel className={classes.font} sx={labelStyles}>Description</InputLabel>
            <TextField
              className={classes.font}
              name="description"
              margin='auto'
              variant="outlined"
              value={inputs.description}
              onChange={handleChange}
            />

            <Button
              sx={{
                mt: 2,
                borderRadius: 4
              }}
              variant="contained"
              color="warning"
              type="submit"
            >Submit</Button>
          </Box>
        </form>
      )}
    </div>
  )
}

export default BlogDetails