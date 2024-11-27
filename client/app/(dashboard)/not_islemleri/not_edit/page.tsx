





'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  
  const [param, setParam] = useState('Parametre Yok');
  
  useEffect(() => {
    const paramValue = searchParams.get('param');
    setParam(paramValue || 'Parametre Yok');
  }, [searchParams]);
  
  return (
    <div>
      <h1>Not Edit: {param}</h1>
    </div>
  );
}

const PageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default PageWithSuspense;

