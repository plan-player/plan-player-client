/// <reference types="vite/client" />

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module 'react-input-emoji';
