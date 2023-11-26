import React, { useEffect } from "react";
import { Route , Routes} from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogDetails";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/Index";

function App() {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {

    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>

        {!isLoggedIn ? (
          <Route path="/auth" element={<Auth/>}/>
        ) : (

          <>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/blogs/add" element={<AddBlog/>} />
          <Route path="/myBlogs" element={<UserBlogs/>} />
          <Route path="/myBlogs/:id" element={<BlogDetails/>} />
          </>
        )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
