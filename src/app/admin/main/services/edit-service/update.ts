//src/app/admin/main/services/edit-service/update.ts

'use server';

import { prismaClient } from '@/lib/prismaClient';
import { redirect } from 'next/navigation';

export async function updateService(formData: FormData) {
  const serviceId = formData.get('id')?.toString();
  const updatedServiceData = {
    name: formData.get('name')?.toString() || '',
    hours: Number(formData.get('hours') || 0),
    price: Number(formData.get('price') || 0),
    type: formData.get('type')?.toString() || '',
  };

  if (serviceId) {
    await prismaClient.service.update({
      where: { id: serviceId },
      data: updatedServiceData,
    });
  }

  redirect('/admin/main/services');
}
