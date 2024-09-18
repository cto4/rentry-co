# Rentry-Co

A Full CRUD super-lite rentry.co wrapper with typescript support and no-dependencies library.

## Features

- create entries
- read entries
- update entries
- delete entries
- typescript support
- built-in express routes
- no-dependencies

## Installation

```sh
npm i rentry-co
```

## Usage

Import the library

```ts
// src/lib/rentry.js

// CommonJS
const RentryCo = require("rentry-co");
// ESM
import RentryCo from "rentry-co";

/*=============================*/

// Use It
const rentry = new RentryCo();
export default rentry;
```

### Create a new entry

```ts
async function test() {
  // id is optional, skip for random id
  var res = await rentry.create({
    id: "<ID>",
    content: "Hello World",
  });
  console.log(res);
}
```

Output :

> save token & id for feature use !

```json
{ "status": "200", "token": "abxx12xx", "id": "abc123" }
```

### Read entry

```ts
async function test() {
  var res = await rentry.read({ id: "<ID>" });
  console.log(res);
}
```

Output :

```json
{ "status": "200", "content": "## Hi\nHello World" }
```

### Update an existing entry

```ts
async function test() {
  var res = await rentry.update({
    id: "<ID>",
    token: "<TOKEN>",
    content: "## Hi\nHello World",
  });
  console.log(res);
}
```

Output :

```json
{ "status": "200", "content": "OK" }
```

### Delete entry

```ts
async function test() {
  var res = await rentry.delete({
    id: "<ID>",
    token: "<TOKEN>",
  });
  console.log(res);
}
```

Output :

```json
{ "status": "200", "content": "OK" }
```

### Express routes

Use built-in expres routes from `RentryCoExpress` to create api.

> note: `body-parser`, `cors` are required, install with `npm i body-parser cors`

```ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import RentryCoExpress from "./index";

const app = express();
app.use(bodyParser.text());
app.use(cors());

app.use("/api/rentry", RentryCoExpress);

app.listen(3000, () => {
  console.log("server started at: http://localhost:3000");
});
```

## License

[MIT License](https://github.com/cto4/rentry-co/blob/main/LICENSE)
