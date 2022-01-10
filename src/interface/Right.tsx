import React, { ReactNode } from 'react';

import { hudClass } from './interfaceUtils';

interface Props {
  children: ReactNode;
}

export default function Right({ children }: Props) {
  return (
    <div className={hudClass} style={{ right: '-180px', width: '180px' }}>
      {children}
    </div>
  );
}
