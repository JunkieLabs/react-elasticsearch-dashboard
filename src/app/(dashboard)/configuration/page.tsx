

"use client" 

import React, { FC, useCallback } from 'react';

import useSWR from 'swr';
import styles from './styles.module.scss';
import ChannelPerformance from '@/ui/layouts/ChannelPerformance/ChannelPerformance';
import TopChannels from '@/ui/sections/analysis/TopChannels/TopChannels';
import ReportGeneration from '@/ui/sections/actions/ReportGeneration/ReportGeneration';
import Configuration from '@/ui/sections/Configuration/Configuration';

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
   <Configuration></Configuration>
  </div>
)
  };

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }


  
