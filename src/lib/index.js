/**
 * [RentryCo](https://github.com/cto4/rentry-co) -- By [cto4](https://github.com/cto4)
 *
 * A Full CRUD super-lite rentry.co wrapper with typescript support and no-dependencies library.
 */
export class RentryCo {
    /**
     * Create a new rentry.co entry
     * @returns
     */
    create({ id, content }) {
        return new Promise(async (resolve, reject) => {
            const csrf = await this.csrf();
            const api = "https://rentry.co/api/new";
            const headers = { ...csrf.headers };
            const body = new FormData();
            body.append("csrfmiddlewaretoken", csrf.token);
            body.append("text", content);
            body.append("url", id ?? "");
            try {
                const req = await fetch(api, { method: "POST", headers, body });
                const res = await req.json();
                if (req.ok && res.status == "200") {
                    resolve({
                        status: res.status,
                        token: res.edit_code,
                        id: res.url.split("/")[3],
                    });
                }
                else
                    reject(res);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Read rentry.co entry
     * @returns
     */
    read({ id }) {
        return new Promise(async (resolve, reject) => {
            try {
                const req = await fetch(`https://rentry.co/api/raw/${id}`);
                const res = await req.json();
                if (req.ok && res.status == "200")
                    resolve(res);
                else
                    reject(res);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Update rentry.co entry
     * @returns
     */
    update({ id, content, token }) {
        return new Promise(async (resolve, reject) => {
            const csrf = await this.csrf();
            const api = "https://rentry.co/api/edit/" + id;
            const headers = { ...csrf.headers };
            const body = new FormData();
            body.append("csrfmiddlewaretoken", csrf.token);
            body.append("edit_code", token);
            body.append("text", content);
            try {
                const req = await fetch(api, { method: "POST", headers, body });
                const res = await req.json();
                if (req.ok && res.status == "200")
                    resolve(res);
                else
                    reject(res);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Delete rentry.co entry
     * @returns
     */
    delete({ id, token }) {
        return new Promise(async (resolve, reject) => {
            const csrf = await this.csrf();
            const api = "https://rentry.co/api/edit/" + id;
            const headers = { ...csrf.headers };
            const body = new FormData();
            body.append("csrfmiddlewaretoken", csrf.token);
            body.append("edit_code", token);
            body.append("delete", "true");
            try {
                const req = await fetch(api, { method: "POST", headers, body });
                const res = await req.json();
                if (req.ok && res.status == "200")
                    resolve(res);
                else
                    reject(res);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async csrf() {
        const req = await fetch("https://rentry.co");
        const Cookie = req.headers.getSetCookie().join(";");
        const token = Cookie.split(";")
            .find((c) => c.startsWith("csrftoken"))
            .split("=")[1];
        return { token, headers: { Cookie, Referer: "https://rentry.co" } };
    }
}
export default RentryCo;
