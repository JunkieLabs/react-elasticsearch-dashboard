import React, { lazy, Suspense } from 'react';

const LazyAirBnbSlider = lazy(() => import('./AirBnbSlider'));

const AirBnbSlider = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAirBnbSlider {...props} />
  </Suspense>
);

export default AirBnbSlider;
