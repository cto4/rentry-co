interface RentryResult {
  status?: string;
  content?: string;
  edit_code?: string;
  url?: string;
}

export interface Result {
  status?: string;
  content?: string;
  token?: string;
  id?: string;
}

interface GetProps {
  id: string;
}

interface NewProps {
  id?: string;
  content: string;
}

interface EditProps {
  id: string;
  content: string;
  token: string;
}

export class RentryCo {
  async get({ id }: GetProps) {
    return new Promise<Result>((resolve, reject) => {
      fetch(`https://rentry.co/api/raw/${id}`)
        .then((res) => res.json())
        .then((res: RentryResult) =>
          resolve({
            status: res.status,
            content: res.content,
          })
        )
        .catch(reject);
    });
  }

  async new({ id, content }: NewProps) {
    return new Promise<Result>(async (resolve, reject) => {
      const csrf = await this.csrf();

      const api = "https://rentry.co/api/new";
      const headers = { ...csrf.headers };

      const body = new FormData();
      body.append("csrfmiddlewaretoken", csrf.token);
      body.append("text", content);
      body.append("url", id ?? "");

      fetch(api, { method: "POST", headers, body })
        .then((res) => res.json())
        .then((res: RentryResult) =>
          resolve({
            status: res.status,
            token: res.edit_code,
            id: res.url.split("/")[3],
          })
        )
        .catch(reject);
    });
  }

  async edit({ id, content, token }: EditProps) {
    return new Promise<Result>(async (resolve, reject) => {
      const csrf = await this.csrf();

      const api = "https://rentry.co/api/edit/" + id;
      const headers = { ...csrf.headers } as HeadersInit;

      const body = new FormData();
      body.append("csrfmiddlewaretoken", csrf.token);
      body.append("edit_code", token);
      body.append("text", content);

      fetch(api, { method: "POST", headers, body })
        .then((res) => res.json())
        .then(({ status }: RentryResult) => resolve({ status, token, id }))
        .catch(reject);
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
