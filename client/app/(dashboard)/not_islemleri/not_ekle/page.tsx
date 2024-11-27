"use client"
import * as React from 'react';
import { Suspense } from 'react';
import Typography from '@mui/material/Typography';
import { useSearchParams } from 'next/navigation'; // örnek bir hook kullanımı

export default function OrdersPage() {
  const [searchParams] = useSearchParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Typography>
        Welcome to the Toolpad orders!
        {/* useSearchParams veya dinamik içerik */}
        {searchParams}
      </Typography>
    </Suspense>
  );
}
