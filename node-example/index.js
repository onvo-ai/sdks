import Onvo from "@onvo/node";
import dotenv from "dotenv";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
let onvo = new Onvo("http://localhost:3004", process.env.API_KEY);

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/dashboards", async function (req, res) {
  try {
    let data = await onvo.getDashboards();
    res.send(JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
});
app.get("/api/reports", async function (req, res) {
  try {
    let data = await onvo.getReports();
    res.send(JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/dashboards/:id", async function (req, res) {
  try {
    await onvo.identifyUser("123456", {
      name: "John appleseed",
      email: "john@appleseed.com",
      metadata: {
        phone_number: "+1 234 5678",
        organisation_id: "87dfty9872ydq8tg",
      },
    });

    let sessionUrl = await onvo.createDashboardSession({
      dashboardId: req.params.id,
      userId: "123456",
      parameters: {
        year: 2023,
        sort: "asc",
      },
    });
    console.log("URL: ", sessionUrl);
    res.send(JSON.stringify({ url: sessionUrl }));
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/reports/:id", async function (req, res) {
  try {
    await onvo.identifyUser("123456", {
      name: "John appleseed",
      email: "john@appleseed.com",
      metadata: {
        phone_number: "+1 234 5678",
        organisation_id: "87dfty9872ydq8tg",
      },
    });

    let sessionUrl = await onvo.createReportSession({
      reportId: req.params.id,
      userId: "123456",
      parameters: {
        year: 2023,
        sort: "asc",
      },
    });
    console.log("URL: ", sessionUrl);
    res.send(JSON.stringify({ url: sessionUrl }));
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000);
console.log("Example app running at http://localhost:3000");
