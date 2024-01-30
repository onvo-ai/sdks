import Onvo from "@onvo-ai/node";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
if (!process.env.API_KEY) {
  console.log("No API key found, exiting...");
  process.exit();
}

let onvo = new Onvo("https://dashboard.onvo.ai", process.env.API_KEY);

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

app.get("/api/dashboards/:id", async function (req, res) {
  try {
    await onvo.upsertEmbedUser("123456", {
      name: "John appleseed",
      email: "john@appleseed.com",
      metadata: {
        study_id: 585,
        group_id: 1234,
      },
    });

    let data = await onvo.upsertDashboardSession({
      dashboardId: req.params.id,
      userId: "123456",
    });
    console.log(data);
    res.send(JSON.stringify({ url: data.url }));
  } catch (e) {
    console.log(e);
  }
});

app.listen(3001);
console.log("Example app running at http://localhost:3001");
