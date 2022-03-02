const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

let btn = document.getElementById("nav-search-block");
btn.onclick = () => {
  console.log("explore clicked");
  ipc.send("explore");
};
