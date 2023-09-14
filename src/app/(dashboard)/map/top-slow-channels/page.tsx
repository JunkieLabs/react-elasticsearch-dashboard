
'use client';

import React, { FC, useCallback } from 'react';

import styles from './styles.module.scss';
// import TopSlowChannelsMap from '@/ui/sections/map/TopSlowChannelsMap/TopSlowChannelsMap';
import dynamic from "next/dynamic"

interface PagesProps {}

const TopSlowChannelsMap = dynamic(() => import("@/ui/sections/map/TopSlowChannelsMap/TopSlowChannelsMap"), { ssr:false })



const Pages: FC<PagesProps> = () =>{
  
//   const { data, error } = useSWR(`/api/elastic`, fetcher);

  // const searchs = useSearchs();
  // const onSearch = useCallback(
  //   async (query: string) => {
  //     const searchresult = await searchs(query);

  //     console.log("tas: ", searchresult)
 
  //     // setTasks(tasks);
  //   },
  //   [searchs]
  // );
//   console.log("data", data);
 
  return ( <div className={styles.Main}>
   <TopSlowChannelsMap></TopSlowChannelsMap>
  </div>
)
  };

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }


  
