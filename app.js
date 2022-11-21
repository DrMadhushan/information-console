// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const ipc = ipcMain;
const path = require("path");
const fs = require("fs");

const config = require("./config.json");
const server = require("./server");
const mqttClient = require("./renderer");

const remote = require("electron").remote;
const port = process.env.port || 5000;
const host = "http://localhost:5000";

let mainWindow;

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile("index.html");
  mainWindow.loadURL(host);

  ipc.on("minimize", () => {
    mainWindow.kiosk = false;
    mainWindow.fullScreen = false;
  });
  ipc.on("setKiosk", () => {
    mainWindow.fullScreen = true;
    mainWindow.kiosk = true;
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipc.on("unlock", (event, data) => {
  console.log("Locker number = " + data);
  console.log("Publish to topic : "+ config.mqtt.pubTopic + data.lockerNo);
  mqttClient.publish(config.mqtt.pubTopic + data.lockerNo, "unlock", {
    qos: 0,
    retain: false,
  });
  mainWindow.webContents.send("afterUnlock", data);
});

const updateAdminPwd = (oldpw, newpw) => {
  try {
    const jsonString = fs.readFileSync("./config.json");
    const appConfig = JSON.parse(jsonString);
    if (oldpw == appConfig.admin.pwd) {
      appConfig.admin.pwd = newpw;
      const updatedJson = JSON.stringify(appConfig);
      fs.writeFileSync("./config.json", updatedJson);
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
