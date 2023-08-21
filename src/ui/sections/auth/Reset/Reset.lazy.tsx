import React, { lazy, Suspense } from 'react';

const LazyReset = lazy(() => import('./Reset'));

const Reset = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyReset {...props} />
  </Suspense>
);

export default Reset;
