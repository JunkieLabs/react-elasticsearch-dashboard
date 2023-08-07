"use client" 

import React, { FC, useCallback } from 'react';

import useSWR from 'swr';
import styles from './styles.module.scss';

interface PagesProps {}


// const  useSearchs= () => {
//   return useCallback(async (query: string) => {
//     const r = await fetch(`/api/elastic/search?q=${query}`);
//     return await r.json();
//   }, []);
// }
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Pages: FC<PagesProps> = () =>{
  
  const { data, error } = useSWR<any>(`/api/elastic`, fetcher);

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
    Channel Performance Component
  </div>
)
  };

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }
  
