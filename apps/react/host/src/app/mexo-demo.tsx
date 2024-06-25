'use client';

import React from 'react';

import { MexoApp } from '@mexo/react/host';

export const MexoDemo = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <button type="button" onClick={() => setVisible(!visible)}>
        Toggle visibility
      </button>
      {visible && <MexoApp name={'ng-remote'} />}
    </>
  );
};
