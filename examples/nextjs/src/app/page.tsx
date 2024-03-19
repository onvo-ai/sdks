import Onvo from "@onvo-ai/js";
import dotenv from "dotenv";
import DashboardGrid from "./DashboardGrid";

dotenv.config();
if (!process.env.API_KEY) {
  console.log("No API key found, exiting...");
  process.exit();
}

let onvo = new Onvo(process.env.API_KEY, {
  endpoint: process.env.NEXT_PUBLIC_BASE_URL || "https://dashboard.onvo.ai",
});

export default async function Home() {
  let token = "";

  try {
    // UPSERT AN EMBED USER
    await onvo.embed_users.upsert("123456", {
      name: "John appleseed",
      email: "john@appleseed.com",
      metadata: {
        study_id: 585,
        group_id: 1234,
      },
    });

    // UPSERT A SESSION FOR EACH DASHBOARD
    let dashboards = await onvo.dashboards.list();
    await Promise.all(
      dashboards.map(async (dash: any) => {
        return onvo.sessions.upsert({
          embed_user: "123456",
          parent_dashboard: dash.id,
          parameters: {},
        });
      })
    );

    // GET ACCESS TOKEN
    let data = await onvo.embed_user("123456").getAccessToken();
    token = data.token;
    console.log("TOKEN: ", data);
  } catch (e) {
    console.log(e);
  }

  return (
    <main className="flex min-h-screen flex-row">
      <div className="p-24">
        <DashboardGrid token={token} />
      </div>
    </main>
  );
}
