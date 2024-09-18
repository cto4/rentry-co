import RentryCo from "./index";
import { expect, test } from "bun:test";

const rentry = new RentryCo();

// Create Example
const create = await rentry.create({ content: "# created" });
test("Create", () => {
  expect(create.status).toBe("200");
});

// Read Example
const read = await rentry.read({ id: create.id });
test("Read", () => {
  expect(read.status).toBe("200");
});

// Update Example
const update = await rentry.update({ id: create.id, token: create.token, content: "# updated" });
const readUpdated = await rentry.read({ id: create.id });
test("Update", () => {
  expect(update.status).toBe("200");
  expect(readUpdated.status).toBe("200");
});

// Delete Example
const del = await rentry.delete({ id: create.id, token: create.token });
test("Update", () => {
  expect(del.status).toBe("200");
});

const result = { create, read, update, readUpdated, delete: del };
Bun.write("./lib.test.json", JSON.stringify(result, null, 2));
