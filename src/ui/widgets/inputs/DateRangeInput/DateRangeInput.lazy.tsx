import React, { lazy, Suspense } from 'react';

const LazyDateRangeInput = lazy(() => import('./DateRangeInput'));

const DateRangeInput = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDateRangeInput {...props} />
  </Suspense>
);

export default DateRangeInput;
