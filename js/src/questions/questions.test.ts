import { Onvo, Question } from "../index";

describe("Questions", () => {
  let onvo: Onvo;
  let newQuestion: Question;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should create question", async () => {
    newQuestion = await onvo.questions.create({
      messages: [{ role: "user", content: "How many orders do I have?" }],
      dashboardId: "f90182a2-f485-45a8-a9d6-b72021c03b50",
    });

    expect(newQuestion).toBeDefined();
    expect(newQuestion.id).toBeDefined();
  }, 60000);
  it("should list questions", async () => {
    let questions = await onvo.questions.list({
      dashboard: "f90182a2-f485-45a8-a9d6-b72021c03b50",
    });

    expect(questions).toBeDefined();
    expect(questions.length).toBeDefined();
    expect(questions.length).toBeGreaterThan(0);
  });

  it("should update question", async () => {
    let question = await onvo.questions.update(newQuestion.id, {
      messages: [
        ...(newQuestion.messages as any[]),
        { role: "user", content: "Show it as a bar chart?" },
      ],
    });

    expect(question).toBeDefined();
    expect(question.messages).toBeDefined();
    expect((question.messages as any[]).length).toEqual(3);
    expect((question.messages as any[])[2].content).toEqual(
      "Show it as a bar chart?"
    );
  }, 60000);

  it("should delete question", async () => {
    let response = await onvo.questions.delete(newQuestion.id);

    expect(response).toBeDefined();
    expect(response.success).toEqual(true);
  });
});
