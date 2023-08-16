import React, { lazy, Suspense } from 'react';

const LazyChipsInput = lazy(() => import('./ChipsInput'));

const ChipsInput = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChipsInput {...props} />
  </Suspense>
);

export default ChipsInput;
