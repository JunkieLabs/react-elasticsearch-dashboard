import React, { lazy, Suspense } from 'react';

const LazyRegister = lazy(() => import('./Register'));

const Register = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRegister {...props} />
  </Suspense>
);

export default Register;
