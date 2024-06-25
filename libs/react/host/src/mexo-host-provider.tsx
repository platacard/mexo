'use client';

import React, { useEffect } from 'react';

import { AppRegistrationOptions, registerApp } from '@mexo/core';

export const MexoHostProvider = ({
  apps,
  children,
}: {
  apps: AppRegistrationOptions[];
  children: React.ReactNode;
}) => {
  useEffect(() => {
    apps.forEach((app) => {
      registerApp(app);
    });
  }, [apps]);

  return children;
};
