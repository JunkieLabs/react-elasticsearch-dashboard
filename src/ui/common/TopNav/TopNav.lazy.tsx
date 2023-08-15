import React, { lazy, Suspense } from 'react';

const LazyTopNav = lazy(() => import('./TopNav'));

const TopNav = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTopNav {...props} />
  </Suspense>
);

export default TopNav;
