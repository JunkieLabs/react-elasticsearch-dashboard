import React, { lazy, Suspense } from 'react';

const LazyReportGeneration = lazy(() => import('./ReportGeneration'));

const ReportGeneration = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyReportGeneration {...props} />
  </Suspense>
);

export default ReportGeneration;
