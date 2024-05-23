'use client';

import React, { memo, useEffect, useRef } from 'react';

import {
  Application,
  AppRegistrationOptions,
  constructApp,
  registerApp,
} from '@mexo/core';

export const MexoHostProvider = memo(function MexoHostProvider({
  apps,
  children,
}: {
  apps: AppRegistrationOptions[];
  children: React.ReactNode;
}) {
  useEffect(
    () => {
      apps.forEach((app) => {
        registerApp(app);
      });
    },
    apps.map((app) => app.name),
  );

  return children;
});

export function MexoApp({ name }: { name: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: Application | null;

    constructApp(name).then((application) => {
      app = application;

      if (app) {
        app.bootstrap(containerRef.current!);
      }
    });

    return () => {
      app?.destroy();
    };
  }, [name]);

  return <div ref={containerRef}></div>;
}
