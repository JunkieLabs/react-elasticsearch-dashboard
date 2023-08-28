import React, { lazy, Suspense } from 'react';

const LazyFilters = lazy(() => import('./Filters'));

const Filters = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFilters {...props} />
  </Suspense>
);

export default Filters;
