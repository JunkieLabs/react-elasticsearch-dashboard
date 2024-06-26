"use client"

import { FC, useState } from 'react';

import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';

import BarChartRounded from '@mui/icons-material/BarChartRounded';
import PublicRounded from '@mui/icons-material/PublicRounded';
import TokenRounded from '@mui/icons-material/TokenRounded';
import SwampedDtvLogo from '../../../../public/logo/swampedtv_logo.svg';
// import {ReactComponent  as  Next} from '../../../../public/next.svg';
// import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import styles from './styles.module.scss';
import Link from 'next/link';
import { RootState } from '@/domain/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { UiNavigationConstants } from '@/ui/navigation.constants';
import { StoreActionApp } from '@/domain/store/app/reducer';

export interface SideNavProps { }

const SideNav: FC<SideNavProps> = (props) => {


  const routePath = useSelector((state: RootState) => state.App.routePath);

  const sidenavXsOpen = useSelector((state: RootState) => state.App.sidenavXsOpen);


  const emailStage = useSelector((state: RootState) => state.Auth.email);

  const dispatch = useDispatch();
  // const [filterIsTop, setFilterIsTop] = useState<boolean>(sidenavOpen);

  const handleSidenavXsOpen = async (isOpen: boolean) => {
    // console.log("handleRegionChange: ", region);
    dispatch(StoreActionApp.sidenavXsToggle(isOpen))

  }

  console.log("SideNav: ", sidenavXsOpen);

  return (
    //   <div className={styles.Main}>

    <Sheet
      className={styles.Main + " Sidebar"}
      sx={{
        position: {
          xs: 'fixed',
          lg: 'sticky',
        },
        transform: {
          xs: `translateX(calc(100% * ${sidenavXsOpen ? 0 : -1}))`,
          // xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          lg: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 1000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        px: 1.5,
        py: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '224px',
            [theme.breakpoints.up('md')]: {
              '--Sidebar-width': '256px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',

          opacity: `calc(${sidenavXsOpen ? 0 : -1} - 0.2)`,
          // opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
          transition: 'opacity 0.4s',
          transform: {
            xs: sidenavXsOpen ? `translateX(calc( var(--Sidebar-width, 0px)))` : `translateX(calc(100% * ( -1 ) ))`,
            // xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => { handleSidenavXsOpen(false) }}
      />
      <Box sx={{ display: 'flex', gap: 2, minHeight: "2rem", alignItems: 'center', justifyContent: 'center' }}>
        <Box className={"td-size-12"}>

          <SwampedDtvLogo />
        </Box>  {/* <Next/> */}
        <Typography fontWeight="md">Swamped-Dtv</Typography>
        {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List key={1111}
          sx={{
            '--ListItem-radius': '8px',
            '--List-gap': '4px',
            '--List-nestedInsetStart': '40px',
            '--ListItemDecorator-size': '1.2rem',
          }}
          slotProps={{
            root: {

            }
          }}
        >
          <ListItem nested  >

            <ListSubheader id="hed2">
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <ListItemDecorator>
                  <BarChartRounded />
                </ListItemDecorator>
                <ListItemContent>Analysis</ListItemContent>
              </Box>
            </ListSubheader>
            <Link href="/analysis/channel-performance" legacyBehavior passHref >
              <ListItemButton component="a" selected={routePath.includes(UiNavigationConstants.analysis.channelPerformance)}>
                <ListItemDecorator>
                  <Box className={`td-align-middle td-w-1 td-h-1 td-bg-gray-700`} ></Box>
                </ListItemDecorator>
                <ListItemContent>
                  Channel Performance</ListItemContent>
              </ListItemButton>
            </Link>
            <Link href="/analysis/device-monitor" legacyBehavior passHref >
              <ListItemButton component="a" selected={routePath.includes(UiNavigationConstants.analysis.deviceMonitor)}>
                <ListItemDecorator>
                  <Box className={`td-align-middle td-w-1 td-h-1 td-bg-gray-700`} ></Box>
                </ListItemDecorator>
                <ListItemContent>Device Monitor</ListItemContent>
              </ListItemButton>
            </Link>

            <Link href="/analysis/top-channels" legacyBehavior passHref>
              <ListItemButton component="a" selected={routePath.includes(UiNavigationConstants.analysis.topChannels)}>
                <ListItemDecorator>
                  <Box className={`td-align-middle td-w-1 td-h-1 td-bg-gray-700`} ></Box>
                </ListItemDecorator>
                <ListItemContent>Top Channels</ListItemContent>
              </ListItemButton>
            </Link>
            <Link href="/analysis/slow-channels" legacyBehavior passHref>
              <ListItemButton component="a" selected={routePath.includes(UiNavigationConstants.analysis.slowChannels)}>
                <ListItemDecorator>
                  <Box className={`td-align-middle td-w-1 td-h-1 td-bg-gray-700`} ></Box>
                </ListItemDecorator>
                <ListItemContent>Slow Channels</ListItemContent>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListDivider inset={`gutter`} />
          <ListItem nested>

            <ListSubheader id="hed3"> <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <ListItemDecorator>
                <PublicRounded />
              </ListItemDecorator>
              <ListItemContent>Map</ListItemContent>
            </Box></ListSubheader>
            <Link href="/map/top-slow-channels" legacyBehavior passHref>

              <ListItemButton component="a" selected={routePath.includes(UiNavigationConstants.map.topSlowChannels)}>
                <ListItemDecorator>
                  <Box className={`td-align-middle td-w-1 td-h-1 td-bg-gray-700`} ></Box>
                </ListItemDecorator>
                <ListItemContent>Top/Slow Channel</ListItemContent>
              </ListItemButton>
            </Link>

          </ListItem>

          <ListDivider inset={`gutter`} />

          <ListItem nested key={22}>

            <ListSubheader id="hed4">

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <ListItemDecorator>
                  <TokenRounded />
                </ListItemDecorator>
                <ListItemContent>Actions</ListItemContent>
              </Box></ListSubheader>
            <Link href={'/' + UiNavigationConstants.actions.reportGeneration} legacyBehavior passHref >

              <ListItemButton key={3} selected={routePath.includes(UiNavigationConstants.actions.reportGeneration)}>
                <ListItemDecorator>
                  <Box className={`td-align-middle td-w-1 td-h-1 td-bg-gray-700`} ></Box>
                </ListItemDecorator>
                <ListItemContent>Report generation</ListItemContent>
              </ListItemButton>

            </Link>


          </ListItem>


        </List>


        <List
          key={1122}
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': '8px',
            '--List-gap': '8px',
            '--ListItemDecorator-size': '1.2rem',
          }}
        >

          <ListDivider inset={`gutter`} />
          <ListItem>
            <Link href={'/' + UiNavigationConstants.configuration} legacyBehavior passHref >
              <ListItemButton selected={routePath.includes(UiNavigationConstants.configuration)}>
                <ListItemDecorator>
                  <Box className={`td-align-middle td-w-1 td-h-1 td-bg-gray-700`} ></Box>
                </ListItemDecorator>
                <ListItemContent>Configuration</ListItemContent>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          {/* <Typography fontSize="sm" fontWeight="lg">
            Admin
          </Typography> */}
          <Typography level="body-xs">{emailStage ?? ""}</Typography>
        </Box>
        <IconButton variant="plain" color="neutral">
          {/* <i data-feather="log-out" /> */}
        </IconButton>
      </Box>
    </Sheet>

    //   </div>
  );
}

export default SideNav;



