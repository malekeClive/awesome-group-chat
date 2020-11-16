import React, { Suspense } from 'react';
import Loading from '../../helpers/SkeletonComponent';

export default function Loader(WrappedComponent) {
  return (props => {
    return (
      <Suspense fallback={ <Loading /> }>
        <WrappedComponent {...props} />
      </Suspense>
    )
  })
}
