import React, { lazy, Suspense } from 'react';

const LazyChartTable = lazy(() => import('./ChartTable'));

const ChartTable = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChartTable {...props} />
  </Suspense>
);

export default ChartTable;
