import React, { lazy, Suspense } from 'react';

const LazyDeviceMonitor = lazy(() => import('./DeviceMonitor'));

const DeviceMonitor = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDeviceMonitor {...props} />
  </Suspense>
);

export default DeviceMonitor;
