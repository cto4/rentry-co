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
