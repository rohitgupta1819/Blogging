import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography, Button } from '@mui/material';
import { useStyles } from "./Utils";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Blog = ({ title, description, imageURL, userName, isUser, id }) => {

  console.log(title);

  const classes = useStyles();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  }


  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/delete/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleDelete = () => {

    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"))
  }

  return (
    <div>
      {""}
      <Card
        sx={{
          width: "40%",
          height: "auto",
          margin: "auto",
          marginTop: 2,
          marginBottom: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button variant='contained' onClick={handleDelete} color="error">Delete</Button>
            <Button variant='contained' onClick={handleEdit} sx={{ marginLeft: 1 }} color="success">Edit</Button>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar className={classes.font} sx={{ bgcolor: "red" }} araia-label="receipe">
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          /*height="194"*/
          image={imageURL}
          alt="Mern"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant='body2' color="text.secondary">
            <b>{userName}</b> {":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Blog