const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("myApi", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = [
      "search-query",
      "latest-query",
      "ratings-query",
      "id-query",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = [
      "sql-return-search",
      "sql-return-latest",
      "sql-return-ratings",
      "sql-return-id",
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  removeListeners: (channel) => {
    let validChannels = [
      "sql-return-search",
      "sql-return-latest",
      "sql-return-ratings",
      "sql-return-id",
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.removeAllListeners(channel);
    }
  },
});
