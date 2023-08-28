"use client" 

import React, { FC, useCallback } from 'react';

import useSWR from 'swr';
import styles from './styles.module.scss';
import DummyCharts from '@/ui/sections/dummy/DummyCharts/DummyCharts';
import { fetcher } from '@/tools/apiHelper';

interface PagesProps {}


// const  useSearchs= () => {
//   return useCallback(async (query: string) => {
//     const r = await fetch(`/api/elastic/search?q=${query}`);
//     return await r.json();
//   }, []);
// }

const Pages: FC<PagesProps> = () =>{
  
  const { data, error } = useSWR(`/api/elastic`, fetcher);

  // const searchs = useSearchs();
  // const onSearch = useCallback(
  //   async (query: string) => {
  //     const searchresult = await searchs(query);

  //     console.log("tas: ", searchresult)
 
  //     // setTasks(tasks);
  //   },
  //   [searchs]
  // );
  console.log("data", data);
 
  return ( <div className={styles.Main}>
   <DummyCharts></DummyCharts>
  </div>
)
  };

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }
  
