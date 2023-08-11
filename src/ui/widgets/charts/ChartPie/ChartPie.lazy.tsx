import React, { lazy, Suspense } from 'react';

const LazyChartPie = lazy(() => import('./ChartPie'));

const ChartPie = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChartPie {...props} />
  </Suspense>
);

export default ChartPie;
