import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Copilot } from "./Copilot";
import { Wrapper } from "../Wrapper/Wrapper";
import { Button } from "../../tremor/Button";
import { Label } from "../../tremor/Text";

const meta: Meta<typeof Copilot> = {
  component: Copilot,
  title: "Layouts/Copilot",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{ token: string; baseUrl: string; id: string }>;

export const Primary: Story = (args) => {
  return (
    <div className="onvo-h-screen onvo-w-screen">
      <Wrapper token={args.token} baseUrl={args.baseUrl}>
        <Copilot
          dashboardId={args.id}
          variant="copilot"
          trigger={
            <div className="onvo-fixed onvo-bottom-5 onvo-right-5 onvo-h-12 onvo-w-36 onvo-rounded-full onvo-cursor-pointer onvo-bg-black onvo-shadow-xl onvo-px-4 onvo-flex onvo-flex-row onvo-gap-3 onvo-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="onvo-size-12"
              >
                <defs>
                  <linearGradient
                    id="sparkleGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00f260" />
                    <stop offset="100%" stopColor="#0575e6" />
                  </linearGradient>
                </defs>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="url(#sparkleGradient)"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
              <Label className=" onvo-text-slate-200 dark:onvo-text-slate-200 onvo-leading-[1]">
                Chat with your data
              </Label>
            </div>
          }
        />

        <Copilot
          variant="fullscreen"
          dashboardId={args.id}
        // trigger={<Button className="onvo-w-64">Open full screen</Button>}
        />
      </Wrapper></div>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImFlNWIxZGRlLTFmZjUtNDk2Ny1hZmUxLTYzOWI3NTVjNzEwMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiI1ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE5MzA3MDgxfQ.230JQNigbv9HOSXms9m-JGKlpGveuD3-_bR3XdqRhEk",
  baseUrl: "http://localhost:3004",
  id: "ae5b1dde-1ff5-4967-afe1-639b755c7102",
};

Primary.parameters = { layout: "fullscreen" };
