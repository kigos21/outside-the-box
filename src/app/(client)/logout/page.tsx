'use client';

import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  router.push('/login');
}
