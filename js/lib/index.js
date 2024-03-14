// src/base.ts
var OnvoBase = class {
  #apiKey;
  endpoint;
  // Base fetch method
  async fetchBase(url, method, body) {
    try {
      let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      };
      if (this.#apiKey && this.#apiKey.trim() !== "") {
        headers["x-api-key"] = this.#apiKey;
      }
      const response = await fetch(this.endpoint + url, {
        method: method || "GET",
        headers,
        body: body ? JSON.stringify(body) : void 0
      });
      let data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data;
    } catch (error) {
      throw new Error("Error in making the request: " + error.message);
    }
  }
  constructor(apiKey, options) {
    if (!apiKey)
      throw new Error("API key is required");
    this.#apiKey = apiKey;
    this.endpoint = options?.endpoint || "https://dashboard.onvo.ai";
  }
};

// src/accounts/index.ts
var OnvoAccounts = class extends OnvoBase {
  list() {
    return this.fetchBase("/api/accounts");
  }
  get(id) {
    return this.fetchBase("/api/accounts/" + id);
  }
};

// src/teams/index.ts
var OnvoTeams = class extends OnvoBase {
  list() {
    return this.fetchBase("/api/teams");
  }
  get(id) {
    return this.fetchBase("/api/teams/" + id);
  }
  update(id, body) {
    return this.fetchBase("/api/teams/" + id, "POST", body);
  }
};

// src/embed_users/index.ts
var OnvoEmbedUsers = class extends OnvoBase {
  list() {
    return this.fetchBase("/api/embed-users");
  }
  get(id) {
    return this.fetchBase("/api/embed-users/" + id);
  }
  delete(id) {
    return this.fetchBase("/api/embed-users/" + id, "DELETE");
  }
  upsert(userId, userData) {
    return this.fetchBase("/api/embed-users", "POST", {
      id: userId,
      name: userData.name,
      email: userData.email,
      metadata: userData.metadata
    });
  }
};

// src/datasources/index.ts
var OnvoDatasources = class extends OnvoBase {
  list() {
    return this.fetchBase("/api/datasources");
  }
  get(id) {
    return this.fetchBase("/api/datasources/" + id);
  }
  delete(id) {
    return this.fetchBase("/api/datasources/" + id, "DELETE");
  }
  update(id, body) {
    return this.fetchBase(
      "/api/datasources/" + id,
      "POST",
      body
    );
  }
  create(body) {
    return this.fetchBase(
      "/api/datasources",
      "PUT",
      body
    );
  }
};

// src/automations/index.ts
var OnvoAutomations = class extends OnvoBase {
  list() {
    return this.fetchBase("/api/automations");
  }
  get(id) {
    return this.fetchBase("/api/automations/" + id);
  }
  delete(id) {
    return this.fetchBase("/api/automations/" + id, "DELETE");
  }
  update(id, body) {
    return this.fetchBase(
      "/api/automations/" + id,
      "POST",
      body
    );
  }
  create(body) {
    return this.fetchBase(
      "/api/automations",
      "PUT",
      body
    );
  }
};

// src/dashboards/index.ts
var OnvoDashboards = class extends OnvoBase {
  list() {
    return this.fetchBase("/api/dashboards");
  }
  get(id) {
    return this.fetchBase("/api/dashboards/" + id);
  }
  delete(id) {
    return this.fetchBase("/api/dashboards/" + id, "DELETE");
  }
  update(id, body) {
    return this.fetchBase(
      "/api/dashboards/" + id,
      "POST",
      body
    );
  }
  create(body) {
    return this.fetchBase("/api/dashboards", "PUT", body);
  }
};

// src/dashboard/dashboard_datasources.ts
var OnvoDashboardDatasources = class extends OnvoBase {
  #dashboardId;
  constructor(dashboardId, apiKey, options) {
    super(apiKey, options);
    this.#dashboardId = dashboardId;
  }
  // Dashboard Datasource endpoints
  list() {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources"
    );
  }
  unlink(datasourceId) {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources/" + datasourceId,
      "DELETE"
    );
  }
  link(datasourceId) {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources",
      "PUT",
      {
        datasourceId
      }
    );
  }
};

// src/dashboard/index.ts
var OnvoDashboard = class extends OnvoBase {
  datasources;
  #id;
  constructor(id, apiKey, options) {
    super(apiKey, options);
    this.#id = id;
    this.datasources = new OnvoDashboardDatasources(id, apiKey, options);
  }
  updateWidgetCache() {
    return this.fetchBase(
      "/api/dashboards/" + this.#id + "/update-cache",
      "POST"
    );
  }
  getWidgetSuggestions() {
    return this.fetchBase(
      "/api/dashboards/" + this.#id + "/widget-suggestions"
    );
  }
};

// src/embed_user/index.ts
var OnvoEmbedUser = class extends OnvoBase {
  #id;
  constructor(id, apiKey, options) {
    super(apiKey, options);
    this.#id = id;
  }
  getAccessToken() {
    return this.fetchBase(
      "/api/embed-users/" + this.#id + "/token"
    );
  }
};

// src/datasource/index.ts
var OnvoDatasource = class extends OnvoBase {
  #id;
  constructor(id, apiKey, options) {
    super(apiKey, options);
    this.#id = id;
  }
  getData() {
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/data"
    );
  }
  fetchColumnDescriptions() {
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/populate-columns",
      "POST"
    );
  }
};

// src/questions/index.ts
var OnvoQuestions = class extends OnvoBase {
  list(filters) {
    return this.fetchBase(
      "/api/questions?dashboard=" + filters.dashboard
    );
  }
  create(payload) {
    return this.fetchBase("/api/questions", "POST", {
      dashboard: payload.dashboardId,
      id: payload.questionId || void 0,
      messages: payload.messages
    });
  }
  delete(id) {
    return this.fetchBase("/api/questions/" + id, "DELETE");
  }
  update(id, body) {
    return this.fetchBase(
      "/api/questions/" + id,
      "POST",
      body
    );
  }
};

// src/automation/index.ts
var OnvoAutomation = class extends OnvoBase {
  #id;
  constructor(id, apiKey, options) {
    super(apiKey, options);
    this.#id = id;
  }
  getRuns() {
    return this.fetchBase("/api/automations/" + this.#id + "/runs");
  }
};

// src/widget/index.ts
var OnvoWidget = class extends OnvoBase {
  #id;
  constructor(id, apiKey, options) {
    super(apiKey, options);
    this.#id = id;
  }
  getImage() {
    return this.fetchBase(
      "/api/widgets/" + this.#id + "/image"
    );
  }
  updatePrompts(messages) {
    return this.fetchBase("/api/widgets/" + this.#id, "PATCH", {
      messages
    });
  }
  executeCode(code) {
    return this.fetchBase(
      "/api/widgets/" + this.#id + "/execute-code",
      "POST",
      {
        code
      }
    );
  }
};

// src/sessions/index.ts
var OnvoSessions = class extends OnvoBase {
  // Dashboard Session endpoints
  list(filters) {
    return this.fetchBase(
      "/api/sessions?parent_dashboard=" + filters.parent_dashboard
    );
  }
  get(filters) {
    return this.fetchBase(
      "/api/sessions?dashboard=" + filters.dashboard
    );
  }
  delete(id) {
    return this.fetchBase(
      "/api/sessions?dashboard=" + id,
      "DELETE"
    );
  }
  revokeAll(filters) {
    return this.fetchBase(
      "/api/sessions?parent_dashboard=" + filters.dashboard,
      "DELETE"
    );
  }
  async upsert({
    user,
    dashboard,
    parameters
  }) {
    let data = await this.fetchBase("/api/sessions", "POST", {
      user,
      parameters,
      dashboard
    });
    return { ...data, url: this.endpoint + data.url };
  }
};

// src/widgets/index.ts
var OnvoWidgets = class extends OnvoBase {
  // Dashboard Widget endpoints
  list(filters) {
    return this.fetchBase(
      "/api/widgets?dashboard=" + filters.dashboard
    );
  }
  get(id) {
    return this.fetchBase("/api/widgets/" + id);
  }
  delete(id) {
    return this.fetchBase("/api/widgets/" + id, "DELETE");
  }
  update(id, body) {
    return this.fetchBase(
      "/api/widgets/" + id,
      "POST",
      body
    );
  }
  create(body) {
    return this.fetchBase("/api/widgets", "POST", body);
  }
};

// src/types/tables.ts
var Table = /* @__PURE__ */ ((Table2) => {
  Table2["Countries"] = "countries";
  Table2["Invites"] = "invites";
  Table2["ItineraryInvites"] = "itinerary_invites";
  Table2["Itineraries"] = "itineraries";
  Table2["Members"] = "members";
  Table2["Teams"] = "teams";
  Table2["Travelers"] = "travelers";
  Table2["Accounts"] = "accounts";
  Table2["DataSources"] = "datasources";
  Table2["EmbedUsers"] = "embed_users";
  Table2["APIKeys"] = "api_keys";
  Table2["Widgets"] = "widgets";
  Table2["Dashboards"] = "dashboards";
  Table2["DashboardDatasources"] = "dashboard_datasources";
  Table2["Sessions"] = "sessions";
  Table2["Questions"] = "questions";
  Table2["Integrations"] = "integrations";
  Table2["DecryptedIntegrations"] = "decrypted_integrations";
  Table2["DecryptedSessions"] = "decrypted_sessions";
  Table2["DecryptedWidgets"] = "decrypted_widgets";
  Table2["DecryptedDatasources"] = "decrypted_datasources";
  Table2["Subscriptions"] = "subscriptions";
  Table2["SubscriptionPlans"] = "subscription_plans";
  Table2["Automations"] = "automations";
  Table2["AutomationRuns"] = "automation_runs";
  Table2["Logs"] = "logs";
  return Table2;
})(Table || {});

// src/index.ts
var Onvo = class extends OnvoBase {
  accounts;
  teams;
  embed_users;
  datasources;
  automations;
  dashboards;
  questions;
  widgets;
  sessions;
  automation;
  dashboard;
  embed_user;
  datasource;
  widget;
  constructor(apiKey, options) {
    super(apiKey, options);
    this.accounts = new OnvoAccounts(apiKey, options);
    this.teams = new OnvoTeams(apiKey, options);
    this.embed_users = new OnvoEmbedUsers(apiKey, options);
    this.datasources = new OnvoDatasources(apiKey, options);
    this.automations = new OnvoAutomations(apiKey, options);
    this.dashboards = new OnvoDashboards(apiKey, options);
    this.questions = new OnvoQuestions(apiKey, options);
    this.sessions = new OnvoSessions(apiKey, options);
    this.widgets = new OnvoWidgets(apiKey, options);
    this.dashboard = (dashboardId) => {
      return new OnvoDashboard(dashboardId, apiKey, options);
    };
    this.embed_user = (embedUserId) => {
      return new OnvoEmbedUser(embedUserId, apiKey, options);
    };
    this.datasource = (datasourceId) => {
      return new OnvoDatasource(datasourceId, apiKey, options);
    };
    this.automation = (automationId) => {
      return new OnvoAutomation(automationId, apiKey, options);
    };
    this.widget = (widgetId) => {
      return new OnvoWidget(widgetId, apiKey, options);
    };
  }
};
var src_default = Onvo;
export {
  Onvo,
  Table,
  src_default as default
};
//# sourceMappingURL=index.js.map