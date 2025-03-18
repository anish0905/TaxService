
import { createRoot } from 'react-dom/client'
import React  from 'react';
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')).render(

    <div>
<App />
<ToastContainer position="top-center" autoClose={3000} />
</div>

 
)
