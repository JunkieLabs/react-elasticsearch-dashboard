"use client" 

import React, { FC, useCallback } from 'react';

import useSWR from 'swr';
import styles from './styles.module.scss';
import Login from '@/ui/sections/auth/Login/Login';

interface PagesProps {}



const Pages: FC<PagesProps> = () =>{
  

//   console.log("data", data);
 
  return ( <div className={styles.Main}>
   <Login></Login>
  </div>
)
  };

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }
  
