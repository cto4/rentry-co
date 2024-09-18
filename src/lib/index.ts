interface RentryResult {
  status?: string;
  content?: string;
  edit_code?: string;
  url?: string;
}

export interface Result {
  status?: string;
  content?: string;
  errors?: string;
  token?: string;
  id?: string;
}

export interface ReadProps {
  id: string;
}

export interface CreateProps {
  id?: string;
  content: string;
}

export interface UpdateProps {
  id: string;
  content: string;
  token: string;
}

export interface DeleteProps {
  id: string;
  token: string;
}

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
  create({ id, content }: CreateProps) {
    return new Promise<Result>(async (resolve, reject) => {
      const csrf = await this.csrf();

      const api = "https://rentry.co/api/new";
      const headers = { ...csrf.headers };

      const body = new FormData();
      body.append("csrfmiddlewaretoken", csrf.token);
      body.append("text", content);
      body.append("url", id ?? "");

      try {
        const req = await fetch(api, { method: "POST", headers, body });
        const res: RentryResult = await req.json();
        if (req.ok && res.status == "200") {
          resolve({
            status: res.status,
            token: res.edit_code,
            id: res.url.split("/")[3],
          });
        } else reject(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Read rentry.co entry
   * @returns
   */
  read({ id }: ReadProps) {
    return new Promise<Result>(async (resolve, reject) => {
      try {
        const req = await fetch(`https://rentry.co/api/raw/${id}`);
        const res: RentryResult = await req.json();
        if (req.ok && res.status == "200") resolve(res);
        else reject(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Update rentry.co entry
   * @returns
   */
  update({ id, content, token }: UpdateProps) {
    return new Promise<Result>(async (resolve, reject) => {
      const csrf = await this.csrf();

      const api = "https://rentry.co/api/edit/" + id;
      const headers = { ...csrf.headers } as HeadersInit;

      const body = new FormData();
      body.append("csrfmiddlewaretoken", csrf.token);
      body.append("edit_code", token);
      body.append("text", content);

      try {
        const req = await fetch(api, { method: "POST", headers, body });
        const res: RentryResult = await req.json();
        if (req.ok && res.status == "200") resolve(res);
        else reject(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Delete rentry.co entry
   * @returns
   */
  delete({ id, token }: DeleteProps) {
    return new Promise<Result>(async (resolve, reject) => {
      const csrf = await this.csrf();

      const api = "https://rentry.co/api/edit/" + id;
      const headers = { ...csrf.headers } as HeadersInit;

      const body = new FormData();
      body.append("csrfmiddlewaretoken", csrf.token);
      body.append("edit_code", token);
      body.append("delete", "true");

      try {
        const req = await fetch(api, { method: "POST", headers, body });
        const res: RentryResult = await req.json();
        if (req.ok && res.status == "200") resolve(res);
        else reject(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async csrf() {
    const req = await fetch("https://rentry.co");
    const Cookie = req.headers.getSetCookie().join(";");
    const token = Cookie.split(";")
      .find((c) => c.startsWith("csrftoken"))
      .split("=")[1];
    return { token, headers: { Cookie, Referer: "https://rentry.co" } };
  }
}

export default RentryCo;
