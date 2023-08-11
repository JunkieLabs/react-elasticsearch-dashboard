import React, { lazy, Suspense } from 'react';

const LazyCheckTimer = lazy(() => import('./CheckTimer'));

const CheckTimer = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCheckTimer {...props} />
  </Suspense>
);

export default CheckTimer;
