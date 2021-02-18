const { channels } = require("../src/shared/constants");
const { app, ipcMain, Notification } = require("electron");
const { Api } = require("./api/index");
const { autoUpdater } = require("electron-updater");
const { configureScope } = require("@sentry/electron");

module.exports = {
  initBridge: (mainWindow) => {
    let intervalId = null;
    const api = new Api();

    autoUpdater.on("update-available", (update) => {
      mainWindow.webContents.send(channels.updateAvailable, { update });
    });

    autoUpdater.on("update-downloaded", (update) => {
      mainWindow.webContents.send(channels.updateDownloaded, { update });
    });

    ipcMain.handle(channels.checkForUpdates, async () => {
      await autoUpdater.checkForUpdates();
      mainWindow.webContents.send(channels.updateDownloaded);
    });

    ipcMain.handle(channels.restartApp, () => {
      autoUpdater.quitAndInstall();
    });

    ipcMain.handle(channels.version, async (_, props) => {
      return { version: app.getVersion() };
    });

    ipcMain.handle(channels.authenticate, async (_, props) => {
      configureScope((scope) => {
        scope.setUser({username: props.login});
      });
      return api.login(props);
    });

    ipcMain.handle(channels.logout, async () => {
      clearInterval(intervalId);
      return api.logout();
    });

    ipcMain.handle(channels.getProjects, async (_, props) => {
      return api.getProjects(props.apiKey);
    });

    ipcMain.handle(channels.getProject, async (_, props) => {
      return api.getProject(props.apiKey, props.projectId);
    });

    ipcMain.handle(channels.getTimeEntryActivities, async (_, props) => {
      return api.getTimeEntryActivities(props.apiKey);
    });

    ipcMain.handle(channels.deleteTimeEntry, async (_, props) => {
      return api.deleteTimeEntry(props.apiKey, props.timeEntryId);
    });

    ipcMain.handle(channels.getProjectIssues, async (_, props) => {
      const { apiKey, projectId } = props;
      return api.getProjectIssues(apiKey, projectId);
    });

    ipcMain.handle(channels.postTimeEntry, (_, props) => {
      const { apiKey, data } = props;
      return api.postTimeEntry(apiKey, data);
    });

    ipcMain.handle(channels.postMultipleTimeEntry, (_, props) => {
      const { apiKey, data } = props;
      return api.postMultipleTimeEntry(apiKey, data);
    });

    ipcMain.handle(channels.patchTimeEntry, (_, props) => {
      const { apiKey, timeEntryId, data } = props;
      return api.patchTimeEntry(apiKey, timeEntryId, data);
    });

    ipcMain.handle(channels.getTimeEntries, async (_, props) => {
      const { apiKey, projectId, fromDate, toDate } = props;
      return api.getTimeEntries(apiKey, { projectId, fromDate, toDate });
    });

    ipcMain.handle(channels.postTimeEntryTemplate, async (_, props) => {
      return api.postTemplate(props.data);
    });

    ipcMain.handle(channels.getTimeEntryTemplates, async (_, props) => {
      return api.getTemplates(props.projectId);
    });

    ipcMain.handle(channels.patchTimeEntryTemplate, async (_, props) => {
      const { templateId, isDefault } = props;
      return api.patchTemplate(templateId, isDefault);
    });

    ipcMain.handle(channels.deleteTimeEntryTemplate, async (_, props) => {
      const { templateId } = props;
      return api.deleteTemplate(templateId);
    });

    ipcMain.handle(channels.getReminders, async (_, props) => {
      return api.getReminders();
    });

    ipcMain.handle(channels.postReminder, async (_, props) => {
      return api.postReminder(props.data);
    });

    ipcMain.handle(channels.patchReminder, async (_, props) => {
      return api.patchReminder(props.data);
    });

    ipcMain.handle(channels.deleteReminder, async (_, props) => {
      const { reminderId } = props;
      return api.deleteReminder(reminderId);
    });

    ipcMain.on(channels.initRemindersListener, async () => {
      const fn60Sec = async () => {
        const { reminders } = await api.getReminders();
        const now = new Date();
        reminders.forEach((reminder) => {
          const time = new Date(reminder.time);
          if (time.getHours() === now.getHours() && time.getMinutes() === now.getMinutes()) {
            const notification = new Notification({
              title: "Adana Reminder",
              body: "Don't forget to log your hours! Click here to open.",
            });
            notification.show();
            notification.on("click", () => {
              mainWindow.show();
              mainWindow?.webContents?.send(channels.invokeReminder, { reminder });
            });
          }
        });
      };
      fn60Sec();
      intervalId = setInterval(fn60Sec, 60 * 1000);
    });
  },
};
