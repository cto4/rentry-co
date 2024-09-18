import { Router } from "express";
import RentryCo from "@lib/index";
const RentryCoExpress = Router();
export const rentry = new RentryCo();
RentryCoExpress.post("/create", async function (req, res) {
    const request = await rentry.create({ content: req.body });
    res.json(request);
});
RentryCoExpress.post("/create/:id", async function (req, res) {
    const request = await rentry.create({ id: req.params.id, content: req.body });
    res.json(request);
});
RentryCoExpress.post("/update/:id/:token", async function (req, res) {
    const request = await rentry.update({ id: req.params.id, token: req.params.token, content: req.body });
    res.json(request);
});
RentryCoExpress.post("/delete/:id/:token", async function (req, res) {
    const request = await rentry.delete({ id: req.params.id, token: req.params.token });
    res.json(request);
});
RentryCoExpress.get("/read/:id", async function (req, res) {
    const request = await rentry.read({ id: req.params.id });
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
