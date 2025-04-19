/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    api: {
      connect: (params: { uri: string }) => Promise<any>;
      getDBStats: (dbName: string) => Promise<any>;
      exportStats: (stats: any) => Promise<string>;
    };
  }
}
