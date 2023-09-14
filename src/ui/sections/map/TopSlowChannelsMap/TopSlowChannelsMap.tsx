
'use client';
import React, { FC, useEffect } from 'react';
import styles from './TopSlowChannelsMap.module.scss';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  
} from 'react-leaflet';

interface TopSlowChannelsMapProps { }

const TopSlowChannelsMap: FC<TopSlowChannelsMapProps> = () =>{
  useEffect(() => {
    (async function init() {
      delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);
  
  return (
  <div className={styles.TopSlowChannelsMap}>
    <Container className={"tb-position--relative"}>
      <Box className="td-overflow-hidden" sx={{
        display: "flex",
        flexDirection: "column"
      }}>



        <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

        <MapContainer className='td-h-96' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Container>
  </div>
);
    }

export default TopSlowChannelsMap;
