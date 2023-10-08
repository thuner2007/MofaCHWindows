const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let splash;

app.on("ready", () => {
  // create main browser window
  mainWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 1920,
    height: 1080,
    show: false, // don't show the main window
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      nativeWindowOpen: true,
    },
  });
  // create a new `splash`-Window
  splash = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 810,
    height: 610,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  splash.loadFile(path.join(__dirname, "splash.html"));
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once("ready-to-show", () => {
    splash.destroy();
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  });
});

app.on("ready", () => {
  // ... (existing code)

  // Define an IPC handler to listen for "quit" message
  ipcMain.on("quit", () => {
    // Close the main window
    mainWindow.close();
  });
});
