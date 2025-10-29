import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './Components/indexes';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Forget from './Components/ForgetPassword';
import Home from './Components/Home';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/forgetpassword" element={<Forget />} />
      <Route path="/home" element={<Home />} />


    </Routes>
  );
};

export default App;
