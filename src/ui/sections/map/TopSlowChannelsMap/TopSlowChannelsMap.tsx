
'use client';
import React, { FC, useEffect, useState } from 'react';
import styles from './TopSlowChannelsMap.module.scss';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import { Theme } from '@mui/joy/styles';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,


} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'

import DateRangeInput from '@/ui/widgets/inputs/DateRangeInput/DateRangeInput';
import Filters from './Filters/Filters';
import { format, parseISO, subDays } from 'date-fns';
import { ModelChartCommonItem } from '@/types/charts/common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/domain/store/store';
import { ChartHelper } from '@/domain/charts/helper';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import SwitchTopSlow from './SwitchTopSlow/SwitchTopSlow';
import { GeoHelper } from '@/domain/geo/helper';
import { ModelElasticEventHitPart, ModelElasticEventPartial } from '@/types/elastic/events/events';

interface TopSlowChannelsMapProps { }

const TopSlowChannelsMap: FC<TopSlowChannelsMapProps> = () => {
  useEffect(() => {
    (async function init() {
      delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });
    })();
  }, []);

  const [dateRange, setDateRange] = useState<Date[]>([subDays(new Date(), 7), new Date()]);
  const [pointersMap, setPointersMap] = useState<Map<string, ModelElasticEventPartial[]>>(new Map<string, ModelElasticEventPartial[]>())

  const geoHits = useSelector((state: RootState) => state.TopSlowChannelGeo.hits);

  const dispatch = useDispatch();

  useEffect(() => {

    var calcPointersMap = GeoHelper.groupHitsByChannelName(geoHits)
    setPointersMap(calcPointersMap);




  }, [geoHits])




  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    dispatch(StoreActionCommonFilters.commonFilterSet(dateRange))



    return () => { }

  }, [dateRange]);

  return (
    <Box className={styles.TopSlowChannelsMap} sx={[
      (theme: Theme) => ({
        [theme.breakpoints.up('md')]: {
          height: 'calc( 100vh - 64px )'
          // '--Header-height': '64px',
        }

      }),

      {
        height: 'calc( 100vh - 52px )'
      },
    ]}>
      <Box className="td-overflow-hidden td-h-full" sx={{
        display: "flex",
        flexDirection: "column"
      }}>


        <Container className={"tb-position--relative"}>

          <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>
          <Box sx={{
            display: "flex",
            flexDirection: 'column'

          }}>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row"
            }}>

              <Box sx={{ flex: "1 1 0%" }}>
                {/* <h4 className="td-text-lg td-font-medium">Filters</h4> */}
                <SwitchTopSlow></SwitchTopSlow>

              </Box>
              <DateRangeInput setDateRange={setDateRange}></DateRangeInput>
            </Box>
            <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

            <Filters></Filters>

            <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>
          </Box>

        </Container>

        <Box sx={{ flex: "1 1 0%", position: "relative" }}>

          <MapContainer className='td-absolute td-w-full td-h-full td-z-0' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Array.from(pointersMap.entries()).map(([key, geoPartials]) => (
              <MarkerClusterGroup key={key}
                chunkedLoading
              >
                {geoPartials.filter(value => (value.location?.coordinates.length ?? 0) == 2).map((geoPartial, index) => (
                  <Marker
                    key={index}
                    position={[geoPartial.location!.coordinates[1], geoPartial.location!.coordinates[0]]}
                    title={geoPartial.channel_name}
                  //  icon={customIcon}

                  >
                    <Popup>
                      Channel Name: {geoPartial.channel_name} <br />
                      
                      Date:  {format(parseISO(geoPartial.timestamp!), "dd-MM-yyyy hh:mm")}.
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            ))}
            {/* <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
          </MapContainer>
        </Box>


      </Box>
    </Box>
  );
}

export default TopSlowChannelsMap;
