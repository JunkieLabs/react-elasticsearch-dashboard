

"use client" 

import React, { FC, useCallback } from 'react';

import styles from './styles.module.scss';
import DeviceMonitor from '@/ui/sections/analysis/DeviceMonitor/DeviceMonitor';

interface PagesProps {
  
  searchParams: Record<string, string> | null | undefined;
}

const Pages: FC<PagesProps> = (props) =>{
  
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
   <DeviceMonitor searchParams={props.searchParams}></DeviceMonitor>
  </div>
)
  };

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }


  
