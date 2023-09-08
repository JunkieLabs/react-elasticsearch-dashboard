import React, { lazy, Suspense } from 'react';

const LazyDeviceLogs = lazy(() => import('./DeviceLogs'));

const DeviceLogs = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDeviceLogs {...props} />
  </Suspense>
);

export default DeviceLogs;
