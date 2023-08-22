import React, { lazy, Suspense } from 'react';

const LazyConfiguration = lazy(() => import('./Configuration'));

const Configuration = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyConfiguration {...props} />
  </Suspense>
);

export default Configuration;
