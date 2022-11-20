const { contextBridge, ipcRenderer } = require("electron");
const mqtt = require("mqtt");
window.mqtt = mqtt;

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipc", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ["minimize", "setKiosk", "lock", "unlock"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["afterUnlock", "afterLock"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
