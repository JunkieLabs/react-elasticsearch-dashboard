import React, { lazy, Suspense } from 'react';

const LazyPickChannelsByBouquet = lazy(() => import('./PickChannelsByBouquet'));

const PickChannelsByBouquet = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPickChannelsByBouquet {...props} />
  </Suspense>
);

export default PickChannelsByBouquet;
