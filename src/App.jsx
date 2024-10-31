import "./App.css";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={true} />
        <Routes>
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
