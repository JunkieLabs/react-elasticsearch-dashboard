import React, { lazy, Suspense } from 'react';

const LazyTopSlowChannelsMap = lazy(() => import('./TopSlowChannelsMap'));

const TopSlowChannelsMap = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTopSlowChannelsMap {...props} />
  </Suspense>
);

export default TopSlowChannelsMap;
