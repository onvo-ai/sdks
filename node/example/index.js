import Onvo from "../lib/index.js";
import dotenv from "dotenv";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Later on. app could also be router, etc., if you ever get that far

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/get-session", async function (req, res) {
  dotenv.config();

  let onvo = new Onvo("http://localhost:3004", process.env.API_KEY);

  await onvo.identifyUser("123456", {
    name: "John appleseed",
    email: "john@appleseed.com",
    metadata: {
      phone_number: "+1 234 5678",
      organisation_id: "87dfty9872ydq8tg",
    },
  });

  let sessionUrl = await onvo.createSession({
    dashboardId: "ebc7ab74-3fd2-47e6-90df-addaec3a029e",
    userId: "123456",
    parameters: {
      year: 2023,
      sort: "asc",
    },
  });
  console.log(sessionUrl);
  res.send(JSON.stringify({ url: sessionUrl }));
});

app.listen(3000);
