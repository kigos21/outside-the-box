'use server';

export async function getApiKey() {
  return process.env.IMGBB_API_KEY;
}
