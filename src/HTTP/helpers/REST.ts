import RequestHeaders from "../../typings/interfaces/http/RequestHeaders";
import fetch, { BodyInit } from "node-fetch";

class RESTManager {
    baseURL: string;
    headers: RequestHeaders;
    
    constructor(headers: RequestHeaders) {
        this.baseURL = 'https://discord.com/api/v10'
        this.headers = headers;
    }

    async get(url: string) {
        url = `${this.baseURL}${url}`;
        return await fetch(url, { headers: this.headers }).then(r => r.json());
    }

    async post(url: string, body: BodyInit | undefined) {
        url = `${this.baseURL}${url}`;
        body = JSON.stringify(body);

        return await fetch(url, { method: 'POST', headers: this.headers, body }).then(r => r.json());
    }

    async delete(url: string) {
        url = `${this.baseURL}${url}`;
        return await fetch(url, { method: 'DELETE', headers: this.headers, }).then(r => r.json());
    }

    async put(url: string, body: BodyInit | undefined) {
        url = `${this.baseURL}${url}`;
        body = JSON.stringify(body);

        return await fetch(url, { method: 'PUT', headers: this.headers, body }).then(r => r.json());
    }

    async patch(url: string, body: BodyInit | undefined) {
        url = `${this.baseURL}${url}`;
        body = JSON.stringify(body);

        return await fetch(url, { method: 'PATCH', headers: this.headers, body }).then(r => r.json());
    }
}

export default RESTManager;