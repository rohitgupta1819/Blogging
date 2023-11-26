import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from '@mui/material';
import { useStyles } from './Utils';

import { authActions } from '../store/Index';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {

  let classes = useStyles();

  const [value, setValue] = useState();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <AppBar position='sticky' sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,113,121,1) 35%, rgba(0,212,255,1) 100%);" }}>
      <Toolbar>
        <Typography variant='h4'>BlogApp</Typography>

        <Box display='flex' marginLeft='auto'>
          {isLoggedIn && (
            <Box display='flex' marginLeft='auto' marginRight='auto'>

              <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)} >
                <Tab className={classes.font} LinkComponent={Link} to="/blogs" label="All Blogs" />
                <Tab className={classes.font} LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                <Tab className={classes.font} LinkComponent={Link} to="/blogs/add" label="Add Blog" />
              </Tabs>
            </Box>
          )}
          <Box display='flex' marginLeft='auto'>
            {!isLoggedIn && (
              <>
                <Button color='warning' variant='contained' sx={{ margin: 1, borderRadius: 10 }} LinkComponent={Link} to="/auth">Login</Button>
                <Button color='warning' variant='contained' sx={{ margin: 1, borderRadius: 10 }} LinkComponent={Link} to="/auth">Signup</Button>
              </>
            )}
            {isLoggedIn && (
              <Button onClick={ () => dispatch(authActions.logout())} color='warning' variant='contained' sx={{ margin: 1, borderRadius: 10 }} LinkComponent={Link} to="/auth">Logout</Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header