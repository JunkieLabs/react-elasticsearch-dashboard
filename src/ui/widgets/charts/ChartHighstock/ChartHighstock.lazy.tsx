import React, { lazy, Suspense } from 'react';

const LazyChartHighstock = lazy(() => import('./ChartHighstock'));

const ChartHighstock = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChartHighstock {...props} />
  </Suspense>
);

export default ChartHighstock;
