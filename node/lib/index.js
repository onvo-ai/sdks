import fetch from "node-fetch";
export default class Onvo {
    apiKey;
    endpoint;
    constructor(endpoint, apiKey) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
    }
    identifyUser(userId, userData) {
        return fetch(this.endpoint + "/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.apiKey,
            },
            body: JSON.stringify({
                id: userId,
                name: userData.name,
                email: userData.email,
                metadata: userData.metadata,
            }),
        }).then((a) => a.json());
    }
    async createSession({ dashboardId, userId, parameters, }) {
        let data = await fetch(this.endpoint + "/api/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.apiKey,
            },
            body: JSON.stringify({
                dashboard: dashboardId,
                user: userId,
                parameters: parameters,
            }),
        }).then((a) => a.json());
        return this.endpoint + data.url;
    }
}
