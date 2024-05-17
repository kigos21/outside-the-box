'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch('/api/logout');

      if (response.ok) {
        router.push('/');
      }
    };

    logout();
  }, [router]);

  return (
    <div>
      <p>Please wait...</p>
    </div>
  );
}
