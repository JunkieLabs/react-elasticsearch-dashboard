import React, { lazy, Suspense } from 'react';

const LazyChannelPerformance = lazy(() => import('./ChannelPerformance'));

const ChannelPerformance = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChannelPerformance {...props} />
  </Suspense>
);

export default ChannelPerformance;
