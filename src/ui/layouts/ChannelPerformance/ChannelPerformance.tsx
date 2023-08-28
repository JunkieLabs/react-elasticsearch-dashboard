import React, { FC, useEffect, useState } from 'react';
import styles from './ChannelPerformance.module.scss';
import Link from 'next/link';
import Button from '@mui/joy/Button';
// import { useRouter } from 'next/router';
import { TransformHelper } from '@/tools/parserTools';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';

interface ChannelPerformanceProps {

  // searchParams: Record<string, string> | null | undefined;
}

const ChannelPerformance: FC<ChannelPerformanceProps> = (props) => {

  // const router = useRouter();

  // const query = router.query;
  // const modal = props.searchParams && props.searchParams['modal'] ? TransformHelper.toBoolean(props.searchParams['modal'] as string) : false;

  // // const showModal = searchParams?.modal;
  // console.log("modal: ", modal)

  return (
    <div className={styles.ChannelPerformance}>
     
      

    </div>
  )
};

export default ChannelPerformance;
