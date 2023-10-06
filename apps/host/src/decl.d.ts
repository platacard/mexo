declare module 'remote/remote-module' {
  export const RemoteModule: import('@microzord/angular').MicrozordModule;
}
declare module 'remote/remote-app-bootstrap' {
  export const remoteAppBootstrap: import('@microzord/core').ApplicationConstructor<
    Record<string, unknown>
  >;
}
declare module 'remoteReact/remote-react-app' {
  const x: import('@microzord/core').ApplicationConstructor<Record<string, unknown>>;
  export default x;
}
