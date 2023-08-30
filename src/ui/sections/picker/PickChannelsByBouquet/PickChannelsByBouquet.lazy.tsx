import React, { lazy, Suspense } from 'react';
import { PickChannelsByBouquetProps } from './PickChannelsByBouquet';

const LazyPickChannelsByBouquet = lazy(() => import('./PickChannelsByBouquet'));

const PickChannelsByBouquet = (props: PickChannelsByBouquetProps & JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPickChannelsByBouquet {...props} />
  </Suspense>
);

export default PickChannelsByBouquet;
