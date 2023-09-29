import Onvo from "../lib/index.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
let onvo = new Onvo("http://localhost:3004", process.env.API_KEY);

const app = express();

app.use(express.static("public"));

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
    await onvo.upsertEmbedUser("123456", {
      name: "John appleseed",
      email: "john@appleseed.com",
      metadata: {
        phone_number: "+1 234 5678",
        organisation_id: "87dfty9872ydq8tg",
      },
    });

    let data = await onvo.createDashboardSession({
      dashboardId: req.params.id,
      userId: "123456",
      parameters: {
        year: 2023,
        sort: "asc",
      },
    });
    console.log(data);
    res.send(JSON.stringify({ url: data.url }));
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/reports/:id", async function (req, res) {
  try {
    await onvo.upsertEmbedUser("123456", {
      name: "John appleseed",
      email: "john@appleseed.com",
      metadata: {
        phone_number: "+1 234 5678",
        organisation_id: "87dfty9872ydq8tg",
      },
    });

    let data = await onvo.createReportSession({
      reportId: req.params.id,
      userId: "123456",
      parameters: {
        year: 2023,
        sort: "asc",
      },
    });
    res.send(JSON.stringify({ url: data.url }));
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000);
console.log("Example app running at http://localhost:3000");
