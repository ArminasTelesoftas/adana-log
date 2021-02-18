const { ipcRenderer, contextBridge } = require("electron");
const { prefix } = require("../src/shared/constants");
const { configureScope } = require("@sentry/electron");

function callIpcRenderer(method, channel, ...args) {
  configureScope((scope) => {
    scope.setContext("callIpcRenderer", {
      method: method,
      channel: channel
    });
  });
  if (typeof channel !== "string" || !channel.startsWith(prefix)) {
    // eslint-disable-next-line no-throw-literal
    throw "Error: IPC channel name not allowed";
  }
  if (["invoke", "send"].includes(method)) {
    return ipcRenderer[method](channel, ...args);
  }
  if ("on" === method) {
    const listener = args[0];
    // eslint-disable-next-line no-throw-literal
    if (!listener) throw "Listener must be provided";

    // Wrap the given listener in a new function to avoid exposing
    // the `event` arg to our renderer.
    const wrappedListener = (_event, ...a) => listener(...a);
    ipcRenderer.on(channel, wrappedListener);

    // The returned function must not return anything (and NOT
    // return the value from `removeListener()`) to avoid exposing ipcRenderer.
    return () => {
      ipcRenderer.removeListener(channel, wrappedListener);
    };
  }
}

contextBridge.exposeInMainWorld("api", {
  invoke: (...args) => callIpcRenderer("invoke", ...args),
  send: (...args) => callIpcRenderer("send", ...args),
  on: (...args) => callIpcRenderer("on", ...args),
});
