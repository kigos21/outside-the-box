//src/app/admin/main/services/types.tsx
import { ForwardRefExoticComponent, SVGProps } from 'react';

export type IconComponentType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string;
    titleId?: string;
  }
>;
