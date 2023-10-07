const { app, BrowserWindow } = require("electron");
const path = require("path");

let splash;

app.on("ready", () => {
  // create main browser window
  mainWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 1920,
    height: 1080,
    show: false, // don't show the main window
  });
  // create a new `splash`-Window
  splash = new BrowserWindow({
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
  });
});
