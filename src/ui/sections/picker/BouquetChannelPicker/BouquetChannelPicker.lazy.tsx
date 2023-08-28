import React, { lazy, Suspense } from 'react';

const LazyBouquetChannelPicker = lazy(() => import('./BouquetChannelPicker'));

const BouquetChannelPicker = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBouquetChannelPicker {...props} />
  </Suspense>
);

export default BouquetChannelPicker;
