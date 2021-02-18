const fetch = require("node-fetch");
const Store = require("electron-store");
const { nanoid } = require("nanoid");

const checkStatus = (response) => {
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    throw new Error(`HTTP error response: ${response.status} ${response.statusText}`);
  }
};

const handleResponse = async (response) => {
  try {
    checkStatus(response);
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

class Api {
  userId = null;

  constructor() {
    this.domain = "adana.telesoftas.net";
    this.baseUrl = `https://${this.domain}`;
    this.storage = new Store();
  }

  login = async ({ login, password }) => {
    const response = await fetch(`https://${login}:${password}@${this.domain}/users/current.json`, {
      method: "GET",
    });
    const json = await handleResponse(response);
    this.userId = json.user.id;
    return json;
  };

  logout = () => {
    this.userId = null;
  }

  getProjects = async (apiKey) => {
    const response = await fetch(`${this.baseUrl}/projects.json`, {
      headers: { "X-Redmine-API-Key": apiKey },
    });
    return handleResponse(response);
  };

  getProject = async (apiKey, projectId) => {
    const response = await fetch(
      `${this.baseUrl}/projects/${projectId}.json?include=trackers,issue_categories,enabled_modules,time_entry_activities`,
      {
        headers: { "X-Redmine-API-Key": apiKey },
      }
    );
    return handleResponse(response);
  };

  getTimeEntryActivities = async (apiKey) => {
    const response = await fetch(`${this.baseUrl}/enumerations/time_entry_activities.json`, {
      headers: { "X-Redmine-API-Key": apiKey },
    });
    return handleResponse(response);
  };

  deleteTimeEntry = async (apiKey, timeEntryId) => {
    return await fetch(`${this.baseUrl}/time_entries/${timeEntryId}.json`, {
      headers: { "X-Redmine-API-Key": apiKey },
      method: "DELETE",
    });
    // invalid-json error when response.json()
    // return handleResponse(response);
  };

  getProjectIssues = async (apiKey, projectId) => {
    const response = await fetch(`${this.baseUrl}/issues.json?project_id=${projectId}`, {
      headers: { "X-Redmine-API-Key": apiKey },
    });
    return handleResponse(response);
  };

  postTimeEntry = async (apiKey, data) => {
    const { project_id, hours, date, activity_id, comments, issue_id } = data;
    const response = await fetch(`${this.baseUrl}/time_entries.json`, {
      method: "POST",
      headers: {
        "X-Redmine-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time_entry: {
          spent_on: date,
          hours,
          activity_id,
          project_id,
          comments,
          issue_id,
        },
      }),
    });
    return handleResponse(response);
  };

  postMultipleTimeEntry = async (apiKey, data) => {
    const { project_id, hours, dates, activity_id, comments, issue_id } = data;
    return await Promise.all(
      dates.map((el) =>
        this.postTimeEntry(apiKey, {
          date: el,
          hours,
          activity_id,
          project_id,
          comments,
          issue_id,
        })
      )
    );
  };

  patchTimeEntry = async (apiKey, timeEntryId, data) => {
    const { project_id, hours, date, activity_id, comments, issue_id } = data;
    return await fetch(`${this.baseUrl}/time_entries/${timeEntryId}.json`, {
      method: "PUT",
      headers: {
        "X-Redmine-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time_entry: {
          spent_on: date,
          hours,
          activity_id,
          project_id,
          comments,
          issue_id,
        },
      }),
    });
    // invalid-json error when response.json()
    // return handleResponse(response);
  };

  getTimeEntries = async (apiKey, data) => {
    const { projectId, fromDate, toDate } = data;
    const response = await fetch(
      `${this.baseUrl}/time_entries.json?project_id=${projectId}&from=${fromDate}&to=${toDate}&user_id=${this.userId}`,
      {
        headers: { "X-Redmine-API-Key": apiKey },
      }
    );
    return handleResponse(response);
  };

  postTemplate = async (data) => {
    const storageItems = (
      (await this.storage.get(`${this.userId}.timeEntryTemplates1`)) || []
    ).map((el) => ({ ...el, isDefault: Boolean(data.isDefault ? false : el.isDefault) }));
    const template = {
      ...data,
      id: nanoid(),
    };
    await this.storage.set(`${this.userId}.timeEntryTemplates1`, [template, ...storageItems]);
    return { template };
  };

  getTemplates = async (projectId) => {
    const templates = (await this.storage.get(`${this.userId}.timeEntryTemplates1`)) || [];
    return { templates: templates.filter((el) => el.projectId === projectId) };
  };

  patchTemplate = async (templateId, isDefault) => {
    const templates = (await this.storage.get(`${this.userId}.timeEntryTemplates1`)) || [];
    const template = templates.find((el) => el.id === templateId);
    const updated = templates.map((el) =>
      el.id === templateId
        ? { ...el, isDefault }
        : { ...el, isDefault: isDefault ? false : el.isDefault }
    );
    await this.storage.set(`${this.userId}.timeEntryTemplates1`, updated);
    return { template: { ...template, isDefault } };
  };

  deleteTemplate = async (templateId) => {
    const templates = (await this.storage.get(`${this.userId}.timeEntryTemplates1`)) || [];
    const updated = templates.filter((el) => el.id !== templateId);
    await this.storage.set(`${this.userId}.timeEntryTemplates1`, updated);
    return {};
  };

  getReminders = async () => {
    const reminders = (await this.storage.get(`${this.userId}.reminders`)) || [];
    return { reminders };
  };

  postReminder = async (data) => {
    const storageItems = (await this.storage.get(`${this.userId}.reminders`)) || [];
    const reminder = {
      ...data,
      id: nanoid(),
    };
    await this.storage.set(`${this.userId}.reminders`, [reminder, ...storageItems]);
    return { reminder };
  };

  patchReminder = async (data) => {
    const { id, ...rest } = data;
    const reminders = (await this.storage.get(`${this.userId}.reminders`)) || [];
    const reminder = reminders.find((el) => el.id === id);
    const patch = { ...reminder, ...rest };
    const updated = reminders.map((el) => (el.id === id ? patch : el));

    await this.storage.set(`${this.userId}.reminders`, updated);
    return { reminder: patch };
  };

  deleteReminder = async (reminderId) => {
    const templates = (await this.storage.get(`${this.userId}.reminders`)) || [];
    const updated = templates.filter((el) => el.id !== reminderId);
    await this.storage.set(`${this.userId}.reminders`, updated);
    return {};
  };
}

module.exports = { Api };
