
'use client';
import { Inter } from 'next/font/google'
import { Box } from '@mui/system'
import SideNav from '@/ui/common/side-nav/side-nav'
import TopNav from '@/ui/common/TopNav/TopNav'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { StoreActionCities } from '@/domain/store/cities/reducer'
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer'

const inter = Inter({ subsets: ['latin'] })

// import { useRouter } from 'next/router';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const dispatch = useDispatch();
  useEffect(() =>{



    // console.log("app startup: ", );
    dispatch(StoreActionCommonFilters.commonFilterAgeInit())
    dispatch(StoreActionCities.citiesInit())
    
    // console.log("app startup: 2", );


  }, []);


  return (


    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>

      {/* <WaterMark /> */}



      <SideNav />

      {/* <Box>

      </Box> */}
      <Box component="main" className="MainContent wwww" flex={1}>
        <TopNav />
        <Box className={`td-relative`}>{children}</Box>
      </Box>
    </Box>
  )
}


