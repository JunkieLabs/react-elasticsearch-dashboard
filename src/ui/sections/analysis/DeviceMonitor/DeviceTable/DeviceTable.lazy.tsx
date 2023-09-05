import React, { lazy, Suspense } from 'react';

const LazyDeviceTable = lazy(() => import('./DeviceTable'));

const DeviceTable = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDeviceTable {...props} />
  </Suspense>
);

export default DeviceTable;
