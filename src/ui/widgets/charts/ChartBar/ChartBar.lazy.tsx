import React, { lazy, Suspense } from 'react';

const LazyChartBar = lazy(() => import('./ChartBar'));

const ChartBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChartBar {...props} />
  </Suspense>
);

export default ChartBar;
