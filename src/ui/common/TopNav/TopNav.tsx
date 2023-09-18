'use client';

import React, { FC } from 'react';
import styles from './TopNav.module.scss';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';

import BarChartRounded from '@mui/icons-material/BarChartRounded';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { Theme } from '@mui/joy/styles';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/domain/store/store';
import Typography from '@mui/joy/Typography';
import { StoreActionApp } from '@/domain/store/app/reducer';

interface TopNavProps { }

const TopNav: FC<TopNavProps> = () => {
  const section = useSelector((state: RootState) => state.App.section);
  const subSection = useSelector((state: RootState) => state.App.subSection);
  const sidenavXsOpen = useSelector((state: RootState) => state.App.sidenavXsOpen);

  const dispatch = useDispatch();
  // const router = useRouter()

  // useEffect(() => {
  //   if (router.isMounted) {
  //     const path = router.pathname;
  //     const paths = path.split('/');
  //     setSubPaths(paths.slice(0, 2));
  //   }
  // }, [router]);

  // const routePath = router.;
  // const subPaths = routePath.split('/');

  // const firstTwoPaths = subPaths.slice(0, 2);

  // console.log("firstTwoPaths: ", firstTwoPaths)
  // const gtMd = useMediaQuery(customTheme.breakpoints.up("md"));
  const toggleSidebar = () => {
    // console.log("handleRegionChange: ", region);
    var isOpen = sidenavXsOpen;

    dispatch(StoreActionApp.sidenavXsToggle(!isOpen))

  }
  return (
    <Box className={styles.TopNav} sx={[
      (theme: Theme) => ({
        [theme.breakpoints.up('md')]: {
          '--Header-height': '64px',
        }

      }),

      {

        gap: 2,
        position: 'sticky',
        height: 'var(--Header-height)',
        top: 0,
        '--Header-height': '52px',
        width: '100%',
      },
    ]}>
      <Box

        sx={[


          {
            display: `flex`,
            alignItems: 'center',

            px: 3,
            py: 2,
            gap: 2,
          },

        ]}
      >

        {/* <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('lg')]: {
              '--Header-height': '64px',
            },
          },
        })}
      /> */}

        <IconButton
          onClick={() => { toggleSidebar() }}
          variant="outlined"
          color="neutral"
          size="sm"
          sx={[
            (theme: Theme) => ({
              [theme.breakpoints.up('lg')]: {
                'display': 'none',
              }
      
            }),]}
        >
          <MoreVertRounded />
        </IconButton>

        <h4 className={`td-text-md td-font-medium td-capitalize`}>
          {section.replace("-", " ")}
        </h4>
        {
          subSection &&

          <Box className={styles[`small-vline`]}>

          </Box>
        }
        {
          subSection &&

          <h4 className={`td-text-sm td-capitalize`}>
            {subSection.replace("-", " ")}
          </h4>
        }

      </Box>
    </Box>
  )
};

export default TopNav;

