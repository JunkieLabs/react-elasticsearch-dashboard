import React, { lazy, Suspense } from 'react';

const LazyChannelDetails = lazy(() => import('./ChannelDetails'));

const ChannelDetails = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChannelDetails {...props} />
  </Suspense>
);

export default ChannelDetails;
