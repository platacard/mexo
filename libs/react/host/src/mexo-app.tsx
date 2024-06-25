'use client';

import { forwardRef, HtmlHTMLAttributes, useEffect, useRef } from 'react';

import { Application, constructApp } from '@mexo/core';

interface MicrofrontAppProps extends HtmlHTMLAttributes<HTMLDivElement> {
  name: string;
}

export const MexoApp = forwardRef<HTMLDivElement, MicrofrontAppProps>(
  ({ name, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const appRef = useRef<Application | null>(null);

    const setReferences = (node: HTMLDivElement) => {
      containerRef.current = node;
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    };

    useEffect(() => {
      let ignore = false;

      const construct = async (name: string, container: HTMLDivElement) => {
        const app = await constructApp(name);
        if (!ignore) {
          appRef.current?.destroy();
          app.bootstrap(container);
          appRef.current = app;
        }
      };

      if (name && containerRef.current) {
        construct(name, containerRef.current);
      }

      return () => {
        ignore = true;
        appRef.current?.destroy();
      };
    }, [name]);

    return <div ref={setReferences} {...props}></div>;
  },
);
