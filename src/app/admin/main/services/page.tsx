// app/admin/main/services/page.tsx
import { prismaClient } from '@/lib/prismaClient';
import Services from './Services';

interface Service {
  id: string;
  name: string;
  hours: number;
  price: number;
  type: string;
}

export default async function ServicesPage() {
  const services: Service[] = await prismaClient.service.findMany({
    select: {
      id: true,
      name: true,
      hours: true,
      price: true,
      type: true,
    },
  });

  return <Services services={services} />;
}
