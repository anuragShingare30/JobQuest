'use client';
import React from "react";
import { Toaster } from "react-hot-toast";


const Providers = ({ children }) => {
  

  return (
   <div>
    <Toaster />
      {children}
   </div>
      
        
  );
};
export default Providers;