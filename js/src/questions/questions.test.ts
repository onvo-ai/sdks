import { Onvo } from "../index";

describe("Questions", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should create question", async () => {
    let acc = "";
    let promise = new Promise<any>((resolve, reject) => {
      onvo.questions.create(
        {
          messages: [{ role: "user", content: "How many orders do I have?" }],
          dashboardId: "1ca1e66c-0f5b-43fc-91aa-954c3377deba",
        },
        {
          onComplete: (str) => {
            resolve(str);
          },
          onStream: (str) => {
            acc += str;
          },
          onError: (err) => {
            reject(err);
          },
        }
      );
    });
    const response = await promise;

    expect(response).toBeDefined();
    expect(response).toEqual(acc);
  }, 60000);
});
