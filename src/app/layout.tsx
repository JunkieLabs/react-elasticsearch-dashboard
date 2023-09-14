// app/ThemeRegistry.tsx
'use client';

import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Box } from '@mui/system'
// import WaterMark from '@/ui/components/WaterMark/WaterMark'
import { CssVarsProvider } from '@mui/joy/styles'
import customTheme from '@/resources/themeing'

import createCache from '@emotion/cache';
import { Options as ThemeOptions } from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/joy/CssBaseline';
import React, { useEffect } from 'react';
import { Providers } from '@/domain/store/provider';
// import { useRouter } from 'next/router';
// 'use client';

import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { appSetSectionFromPath } from '@/domain/store/app/reducer';
// import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
// import { StoreActionCities } from '@/domain/store/cities/reducer';

// import { Chart, registerables } from 'chart.js'

// Chart.register(...registerables);

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

interface ThemeProps {

  options: ThemeOptions
  children: React.ReactNode

}



// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
const ThemeRegistry = (props: ThemeProps) => {
  const { options, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });



  return (
    <CacheProvider value={cache}>
      <CssVarsProvider theme={customTheme}>
        {/* the custom theme is optional */}
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  );
}


function ReduxLayout({ children,
}: {
  children: React.ReactNode
}) {

  const dispatch = useDispatch();
  var router = usePathname()

  console.log("router: ", router)

  useEffect(() => {

    // store.
    dispatch(appSetSectionFromPath(router))


    return () => { }

  }, [router, dispatch]);

  


  return (<ThemeRegistry options={{ key: 'joy' }}>

    <Box className={`td-relative`}>
      <Box>

      </Box>
      <Box className={`td-relative`}>{children}</Box>

    </Box>
  </ThemeRegistry>);

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  


  return (

    <html lang="en">
    <head>

    <title>Title</title>
        <meta name='description' content='Description' />
      
    </head>
      <body className={inter.className}>
        <Providers>
          {/* {children} */}
          <ReduxLayout>
            {children}
          </ReduxLayout>

        </Providers>
      </body>
    </html>
  );
}
