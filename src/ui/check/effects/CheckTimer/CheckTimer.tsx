import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './CheckTimer.module.scss';

interface CheckTimerProps { }

const CheckTimer: FC<CheckTimerProps> = () => {

  const [ds, setDs] = useState(0);

  const intervalRef = useRef<NodeJS.Timer>();

  // const waitWhenRefIsReady = () => {
  //   intervalRef.current = setInterval(() => {
  //     // Do something

  //     console.log("tiem", ds)
  //     if(ds === 5){
  //       clearInterval(intervalRef.current);
  //     }else{
  //       setDs(d=>d+1);
  //     }
  //   }, 500);
  // };

  useEffect(() => {
    // waitWhenRefIsReady();

    var count = ds;

    intervalRef.current = setInterval(() => {
      // setDs(ds + 1);
      console.log("tiem", count)

      if (count === 5) {
        console.log("sdsdsds", ds)
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      } else {
        count++;
        setDs(count);

      }
    }, 1000);
    return () => {
      if (intervalRef.current) {
        console.log("sdsdsds", ds)
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, []);


  // useEffect(() => {

  //   console.log("start");
  //   return () => {
  //     console.log("end");
  //   };
  // }, []);

  useEffect(() => {

    // if(chartRef.current)
    // const ctx = chartRef.current.getContext('2d');

    // chartInstance.current = new Chart(ctx, {
    //   type: 'pie',
    //   data: {
    //     labels: data.labels,
    //     datasets: [
    //       {
    //         data: data.values,
    //         backgroundColor: data.colors,
    //       },
    //     ],
    //   },
    // });
  }, []);



  return (
    <div className={styles.CheckTimer}>
      CheckTimer Component
    </div>
  );
}

export default CheckTimer;
