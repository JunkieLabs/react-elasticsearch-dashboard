import React, { lazy, Suspense } from 'react';

const LazyDummyCharts = lazy(() => import('./DummyCharts'));

const DummyCharts = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDummyCharts {...props} />
  </Suspense>
);

export default DummyCharts;
