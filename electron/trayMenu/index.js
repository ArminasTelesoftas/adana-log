const { Menu, Tray } = require("electron");
const path = require("path");

const isDev = Boolean(process.env.ELECTRON_START_URL);

const trayMenu = (window) => {
  try {
    const tray = new Tray(
      path.join(__dirname, isDev ? "../../public/tray_logo_32x32.ico" : "../../tray_logo_32x32.ico")
    );
    const contextMenu = Menu.buildFromTemplate([
      { label: "Open", type: "normal", click: () => window.show() },
      { label: "Close", type: "normal", click: () => window.minimize() },
    ]);
    tray.setToolTip("Adana Log");
    tray.setContextMenu(contextMenu);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  trayMenu: trayMenu,
};
