import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { QuestionMessage } from "./QuestionMessage";
import { Wrapper } from "../../layouts/Wrapper";
import { DashboardWrapper } from "../../layouts/Dashboard";

const meta: Meta<typeof QuestionMessage> = {
  component: QuestionMessage,
  title: "Components/Question Message",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{
  token: string;
  baseUrl: string;
  id: string;
  adminMode: boolean;
}>;

const messages = [
  {
    role: "user" as const,
    content: "Hello, how are you?",
  },
  {
    role: "assistant" as const,
    content: "I'm good, thanks for asking!",
  },
  {
    role: "assistant" as const,
    content: "I'm good, thanks for asking! How are you? `Good``Been better``Awful`",
  },
];

export const Primary: Story = (args) => {
  return (
    <div className="onvo-h-screen onvo-w-screen onvo-relative">
      <Wrapper {...args}>
        <DashboardWrapper id={args.id}>
          <div className=" onvo-w-full onvo-relative onvo-max-w-screen-lg onvo-mx-auto onvo-mt-2">
            {messages.map((a: any, i: number) => (
              <QuestionMessage
                key={i}
                message={a}
                isLast={i === messages.length - 1}
                onDownload={() => { }}
                onReply={(msg) => { }}
                onEdit={(msg) => { }}
                onAdd={() => { }}
              />
            ))}
          </div>
        </DashboardWrapper>
      </Wrapper>
    </div>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImFlNWIxZGRlLTFmZjUtNDk2Ny1hZmUxLTYzOWI3NTVjNzEwMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiI1ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE5MzA3MDgxfQ.230JQNigbv9HOSXms9m-JGKlpGveuD3-_bR3XdqRhEk",
  baseUrl: "http://localhost:3004",
  id: "ae5b1dde-1ff5-4967-afe1-639b755c7102",
};

Primary.parameters = { layout: "fullscreen" };
