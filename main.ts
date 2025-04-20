import { app, BrowserWindow, ipcMain } from "electron";
import { connect, getDatabases, getDBStats } from "./db/connector";
import path from "path";
import fs from "fs";

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 300,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  window.loadURL("http://localhost:5173");
}

ipcMain.handle("connect", async (event, { uri }: { uri: string }) => {
  try {
    await connect(uri);
    const databases = await getDatabases();
    return databases;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
});

ipcMain.handle("get-db-stats", async (_event, dbName: string) => {
  return await getDBStats(dbName);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ipcMain.handle("export-stats", async (_event, stats: any) => {
  const filePath = path.join(app.getPath("desktop"), "mongodb_stats.json");
  fs.writeFileSync(filePath, JSON.stringify(stats, null, 2));
  return filePath;
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
