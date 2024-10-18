import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  return (
    <>
      <Login/>
      <ToastContainer/>
      </>
  )
}

export default App