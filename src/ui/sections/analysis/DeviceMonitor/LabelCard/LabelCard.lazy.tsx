import React, { lazy, Suspense } from 'react';

const LazyLabelCard = lazy(() => import('./LabelCard'));

const LabelCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLabelCard {...props} />
  </Suspense>
);

export default LabelCard;
