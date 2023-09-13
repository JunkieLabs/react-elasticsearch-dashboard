

"use client" 

import React, { FC, useCallback } from 'react';

import styles from './styles.module.scss';
import TopChannels from '@/ui/sections/analysis/TopChannels/TopChannels';
import TopSlowChannelsMap from '@/ui/sections/map/TopSlowChannelsMap/TopSlowChannelsMap';

interface PagesProps {}

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


  
