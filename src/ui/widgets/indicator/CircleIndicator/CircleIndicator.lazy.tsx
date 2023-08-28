import React, { lazy, Suspense } from 'react';
import { CircleIndicatorProps } from './CircleIndicator';

const LazyCircleIndicator = lazy(() => import('./CircleIndicator'));

const CircleIndicator = (props: CircleIndicatorProps &  JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCircleIndicator {...props} />
  </Suspense>
);

export default CircleIndicator;
