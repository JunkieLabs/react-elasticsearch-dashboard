import React, { FC } from 'react';
import styles from './styles.module.scss';

interface PagesProps {}

const Pages: FC<PagesProps> = () => (
  <div className={styles.Main}>
    Channel Performance Component
  </div>
);

export default Pages;


// export default function Page() {
//     return <h1 >Hello, Next.js!</h1>
    
//   }
  
