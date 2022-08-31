import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/*** servies ***/
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*** pages ***/
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPost from "./pages/AddPost";
import Learn from "./pages/Learn";
import Teach from "./pages/Teach";
import Discover from "./pages/Discover";
import PostsPage from "./pages/PostsPage";

const AuthRoute = ({children})=>{
  if(!localStorage.getItem('userAuth')) return <Navigate to="/login" />
  return children;
}

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addpost" element={<AuthRoute><AddPost /></AuthRoute>} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/teach" element={<Teach />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
