import React, { lazy, Suspense } from 'react';

const LazyExpansonPanel = lazy(() => import('./ExpansonPanel'));

const ExpansonPanel = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyExpansonPanel {...props} />
  </Suspense>
);

export default ExpansonPanel;
