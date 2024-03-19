import { Onvo, Question } from "../index";

describe("Questions", () => {
  let onvo: Onvo;
  let newQuestion: Question;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should create question", async () => {
    newQuestion = await onvo.questions.create({
      messages: [{ role: "user", content: "How many orders do I have?" }],
      dashboardId: "42058ac8-a83b-4e26-8b3c-b86a773d052a",
    });

    expect(newQuestion).toBeDefined();
    expect(newQuestion.id).toBeDefined();
  }, 60000);
  it("should list questions", async () => {
    let questions = await onvo.questions.list({
      dashboard: "42058ac8-a83b-4e26-8b3c-b86a773d052a",
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
