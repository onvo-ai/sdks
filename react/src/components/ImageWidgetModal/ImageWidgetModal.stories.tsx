import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ImageWidgetModal, useImageWidgetModal } from "./ImageWidgetModal";
import { Button } from "../../tremor/Button";
import { Wrapper } from "../Wrapper";
import { Dashboard } from "../Dashboard";

const meta: Meta = {
  component: ImageWidgetModal,
  title: "Components/Image Widget Modal",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{
  token: string;
  baseUrl: string;
  id: string;
}>;

export const Primary: Story = (args) => {
  const { setOpen } = useImageWidgetModal();
  return (
    <div className="onvo-h-screen onvo-w-screen">
      <Wrapper {...args}>
        <Dashboard id={args.id}>
          {" "}
          <Button
            className="onvo-w-44"
            onClick={() => {
              setOpen(true);
            }}
          >
            Open Modal
          </Button>
          <ImageWidgetModal />
        </Dashboard>
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