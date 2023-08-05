import React, { lazy, Suspense } from 'react';
import { WaterMarkProps } from './WaterMark';

const LazyWaterMark = lazy(() => import('./WaterMark'));

const WaterMark = (props: WaterMarkProps & JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyWaterMark {...props} />
  </Suspense>
);

export default WaterMark;
