const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { getData, getData2 } = require("../db/getdata");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    minWidth: 370,
    minHeight: 470,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: isDev,
      nativeWindowOpen: true,
      preload: path.join(app.getAppPath(), "/public/preload.js"),
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("latest-query", (event, arg) => {
  console.log("query from renderer : ", arg);
  getData2(arg)
    .then((res) => event.sender.send("sql-return-latest", res))
    .catch((error) => console.log(error));
});


ipcMain.on("search-query", (event, arg) => {
  // console.log('query from renderer : ', arg);
  var stmt = `select idMovie, c00, c01, c03, c08, c16, c19, c20, premiered, strPath,rating, uniqueid_value from movie_view where c00 like '%${arg}%' order by idMovie desc`;
  getData(stmt)
    .then((res) => event.sender.send("sql-return-search", res))
    .catch((error) => console.log(error));
});

ipcMain.on("latest-query", (event, arg) => {
  // console.log("query from renderer : ", arg);
  getData2(arg)
    .then((res) => event.sender.send("sql-return-latest", res))
    .catch((error) => console.log(error));
});

ipcMain.on("ratings-query", (event, arg) => {
  // console.log('query from renderer : ', arg);
  getData(arg)
    .then((res) => event.sender.send("sql-return-ratings", res))
    .catch((error) => console.log(error));
});

ipcMain.on("id-query", (event, arg) => {
  // console.log('query from renderer : ', arg);
  var stmt = `select idMovie, c00, c01, c03, c08, c16, c19, c20, premiered, strPath,rating, uniqueid_value from movie_view where idMovie=${arg}`;
  getData(stmt)
    .then((res) => event.sender.send("sql-return-id", res))
    .catch((error) => console.log(error));
});