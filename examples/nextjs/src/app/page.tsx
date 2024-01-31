import Onvo from "@onvo-ai/js";
import dotenv from "dotenv";
import DashboardGrid from "./DashboardGrid";

dotenv.config();
if (!process.env.API_KEY) {
  console.log("No API key found, exiting...");
  process.exit();
}

let onvo = new Onvo("https://dashboard.onvo.ai", process.env.API_KEY);

export default async function Home() {
  let token = "";

  try {
    await onvo.upsertEmbedUser("123456", {
      name: "John appleseed",
      email: "john@appleseed.com",
      metadata: {
        study_id: 585,
        group_id: 1234,
      },
    });

    let data = await onvo.getEmbedUserAccessToken("123456");
    token = data.token;
    console.log(data);
  } catch (e) {
    console.log(e);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DashboardGrid token={token} />
    </main>
  );
}
