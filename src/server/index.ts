import { Router } from "express";
import RentryCo from "@lib/index";

const RentryCoExpress = Router();
export const rentry = new RentryCo();

RentryCoExpress.post("/new", async function (req, res) {
  const request = await rentry.new({ content: req.body });
  res.json(request);
});

RentryCoExpress.post("/new/:id", async function (req, res) {
  const request = await rentry.new({ id: req.params.id, content: req.body });
  res.json(request);
});

RentryCoExpress.post("/edit/:id/:token", async function (req, res) {
  const request = await rentry.edit({ id: req.params.id, token: req.params.token, content: req.body });
  res.json(request);
});

RentryCoExpress.get("/get/:id", async function (req, res) {
  const request = await rentry.get({ id: req.params.id });
  res.json(request);
});

RentryCoExpress.all("*", (req, res) => {
  res.json({
    docs: "https://cto4.github.io/rentry-co",
    try: {
      "/new": "create new entry",
      "/new/:id": "create new entry with id",
      "/edit/:id/:token": "edit entry",
      "/get/:id": "get raw entry",
    },
  });
});

export default RentryCoExpress;
