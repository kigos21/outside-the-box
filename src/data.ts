import { ServicePill, RegularRateList } from '@/types';

// SERVICES
export const regularRates: ServicePill[] = [
  {
    title: '2 hours',
    price: '149.00',
  },
  {
    title: '5 hours',
    price: '279.00',
  },
  {
    title: '7 hours',
    price: '329.00',
  },
  {
    title: 'Whole Day',
    price: '449.00',
  },
];

export const regularRateLists: RegularRateList[] = [
  {
    title: 'Inclusions:',
    items: ['Unlimited Wi-Fi', 'Unlimited Coffee', 'Unlimited Drinking Water'],
  },
  {
    title: 'Add-ons:',
    items: ['Use of Drafting Tables'],
    price: '+ 25.00 / Hour',
  },
];

export const specialPromos: ServicePill[] = [
  {
    title: 'Get 2 Hours Get 1 Free',
    price: '149.00',
  },
  {
    title: 'Until Closing',
    price: '349.00',
  },
];
