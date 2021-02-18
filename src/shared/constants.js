const PREFIX = "ADANA_APP";

module.exports = {
  prefix: PREFIX,
  errorSplit: "HTTP error response:",
  channels: {
    // General
    debug: `${PREFIX}_debug`,
    version: `${PREFIX}_version`,
    restartApp: `${PREFIX}_restart_app`,

    // Auth
    authenticate: `${PREFIX}_authenticate`,
    logout: `${PREFIX}_logout`,


    // Updates
    checkForUpdates: `${PREFIX}_check_for_updates`,
    updateAvailable: `${PREFIX}_update_available`,
    updateDownloaded: `${PREFIX}_update_downloaded`,

    // Project
    getProjects: `${PREFIX}_get_projects`,
    getProject: `${PREFIX}_get_project`,
    getProjectIssues: `${PREFIX}_get_project_issues`,

    // Time Entries
    getTimeEntries: `${PREFIX}_get_time_entries`,
    deleteTimeEntry: `${PREFIX}_delete_time_entry`,
    createTimeEntries: `${PREFIX}_create_time_entries`,
    postTimeEntry: `${PREFIX}_post_time_entry`,
    postMultipleTimeEntry: `${PREFIX}_post_multiple_time_entry`,
    patchTimeEntry: `${PREFIX}_patch_time_entry`,

    // Time Entry templates
    postTimeEntryTemplate: `${PREFIX}_post_time_entry_template`,
    getTimeEntryTemplates: `${PREFIX}_get_time_entry_template`,
    patchTimeEntryTemplate: `${PREFIX}_patch_time_entry_template`,
    deleteTimeEntryTemplate: `${PREFIX}_delete_time_entry_template`,

    // Reminders
    getReminders: `${PREFIX}_get_reminders`,
    postReminder: `${PREFIX}_post_reminder`,
    deleteReminder: `${PREFIX}_delete_reminder`,
    patchReminder: `${PREFIX}_patch_reminder`,
    initRemindersListener: `${PREFIX}_init_remindersListener`,
    invokeReminder: `${PREFIX}_invokeReminder`,

  },
};
