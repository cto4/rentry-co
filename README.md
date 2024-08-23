# Rentry-Co

A javascript library for creating and managing entries in rentry.co

> a super lightweight no-dependencies 14KB unpacked library !

## Features

- read pastes
- edit pastes
- create pastes
- typescript support
- built-in express routes
- no-dependencies

## Installation

```
npm i rentry-co
```

## Usage

Import the library

```ts
// ComonJS
const RentryCo = require("rentry-co");
// ESM
import RentryCo from "rentry-co";

/*============================*/

// Use It
const rentry = new RentryCo();
```

### Create a new paste

Return the response as an object :

```ts
async function test() {
  var res = await rentry.new({
    id: "<ID>", // optional, skip for random id
    content: "Hello World",
  });
  console.log(res);
}
```

Output :

```json
{
  "status": "200",
  "token": "abxx12xx", // <TOKEN> for editing the paste
  "id": "abc123" // <ID>
}
```

### Edit an exist paste

Return the response as an object :

```ts
async function test() {
  var res = await rentry.edit({
    id: "<ID>",
    token: "<TOKEN>",
    content: "## Hi\nHello World",
  });
  console.log(res);
}
```

Output :

```json
{
  "status": "200",
  "token": "abxx12xx", // <TOKEN> for editing the paste
  "id": "abc123" // <ID>
}
```

### Read a paste

Return the response as an object :

```ts
async function test() {
  var res = await rentry.get({ id: "<ID>" });
  console.log(res);
}
```

Output :

```json
{
  "status": "200",
  "content": "## Hi\nHello World"
}
```

### Express routes

Use built-in expres routes from `RentryCoExpress` to create api.

> note: `body-parser` is required, install with `npm i body-parser`

```ts
import express from "express";
import bodyParser from "body-parser";
import RentryCoExpress from "rentry-co/server";

const app = express();
app.use(bodyParser.text());
app.use("/api/rentry", RentryCoExpress);

app.listen(3000, () => {
  console.log("server started at: http://localhost:3000");
});
```

## License

[MIT License](https://github.com/cto4/rentry-co/blob/main/LICENSE)
