declare module 'remote/remote-module' {
  export const RemoteModule: import('@angular/core').Type<any>;
}
declare module 'remote/remote-app-bootstrap' {
  export const remoteAppBootstrap: import('@mexo/core').ApplicationConstructor<
    Record<string, unknown>
  >;
}
declare module 'remote-react/remote-react-app' {
  const x: import('@mexo/core').ApplicationConstructor<Record<string, unknown>>;
  export default x;
}
