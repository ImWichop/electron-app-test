const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class MainScreen {
  window;

  position = {
    width: 1000,
    height: 600,
    maximized: false,
  };

  constructor() {
    this.window = new BrowserWindow({
      width: this.position.width,
      height: this.position.height,
      removeMenu: true,
      // acceptFirstMouse: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "./preload.js"),
      },
    });

    this.window.once("ready-to-show", () => {
      this.window.show();

      if (this.position.maximized) {
        this.window.maximize();
      }
    });

    this.handleMessages();

    let wc = this.window.webContents;
    wc.openDevTools({ mode: "undocked" });

    this.window.loadURL(path.join('file:',__dirname,'dist/electron-app/index.html'))
  }

  showMessage(message) {
    this.window.webContents.send("onUpdates", message);
  }

  close() {
    this.window.close();
    ipcMain.removeAllListeners();
  }

  hide() {
    this.window.hide();
  }

  handleMessages() {
    //Ipc functions go here.
  }
}

module.exports = MainScreen;