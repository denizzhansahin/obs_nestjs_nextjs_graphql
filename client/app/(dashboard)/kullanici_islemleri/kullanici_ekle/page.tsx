

'use client'

import { useSearchParams } from 'next/navigation'

function Page() {
  const searchParams = useSearchParams();
  
  const param = searchParams.get('param') || "Parametre Yok";
  
  return (
    <div>
      <h1>Kullanıcı Ekle: {param}</h1>
    </div>
  );
}

export default Page;
