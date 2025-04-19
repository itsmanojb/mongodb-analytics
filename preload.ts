import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  connect: (params: { uri: string }) => ipcRenderer.invoke("connect", params),
  getDBStats: (dbName: string) => ipcRenderer.invoke("get-db-stats", dbName),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportStats: (stats: any) => ipcRenderer.invoke("export-stats", stats),
});

export {};
