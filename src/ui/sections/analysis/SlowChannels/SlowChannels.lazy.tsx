import React, { lazy, Suspense } from 'react';

const LazySlowChannels = lazy(() => import('./SlowChannels'));

const SlowChannels = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySlowChannels {...props} />
  </Suspense>
);

export default SlowChannels;
