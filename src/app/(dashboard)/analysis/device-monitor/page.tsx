

"use client" 

import React, { FC, useCallback } from 'react';

import styles from './styles.module.scss';
import DeviceMonitor from '@/ui/sections/analysis/DeviceMonitor/DeviceMonitor';

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
   <DeviceMonitor></DeviceMonitor>
  </div>
)
  };

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }


  
