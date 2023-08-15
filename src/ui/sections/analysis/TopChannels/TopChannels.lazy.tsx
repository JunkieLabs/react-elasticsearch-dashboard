import React, { lazy, Suspense } from 'react';

const LazyTopChannels = lazy(() => import('./TopChannels'));

const TopChannels = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTopChannels {...props} />
  </Suspense>
);

export default TopChannels;
