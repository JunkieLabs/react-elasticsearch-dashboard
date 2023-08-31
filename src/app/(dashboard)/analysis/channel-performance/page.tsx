"use client" 

import React, { FC, useCallback } from 'react';

import styles from './styles.module.scss';
import ChannelPerformance from '@/ui/sections/analysis/ChannelPerformance/ChannelPerformance';

interface PagesProps {
  
  searchParams: Record<string, string> | null | undefined;
}


// const  useSearchs= () => {
//   return useCallback(async (query: string) => {
//     const r = await fetch(`/api/elastic/search?q=${query}`);
//     return await r.json();
//   }, []);
// }
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Pages: FC<PagesProps> = (props) =>{
  
  // const { data, error } = useSWR(`/api/elastic`, fetcher);

  // const searchs = useSearchs();
  // const onSearch = useCallback(
  //   async (query: string) => {
  //     const searchresult = await searchs(query);

  //     console.log("tas: ", searchresult)
 
  //     // setTasks(tasks);
  //   },
  //   [searchs]
  // );
  // console.log("data", data);
 
  return ( <div className={styles.Main}>
   <ChannelPerformance searchParams={props.searchParams}></ChannelPerformance>
  </div>
)
  };

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }
  
