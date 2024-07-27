import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { SearchSelect } from "./SearchSelect";

const meta: Meta = {
  component: SearchSelect,
  title: "Primitives/Search Select",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SearchSelect>;

const data = [
  {
    value: "dress-shirt-striped",
    label: "Striped Dress Shirt EWAKIFJHGADJKSFBADJKSGH",
  },
  {
    value: "relaxed-button-down",
    label: "Relaxed Fit Button Down",
  },
  {
    value: "slim-button-down",
    label: "Slim Fit Button Down",
  },
  {
    value: "dress-shirt-solid",
    label: "Solid Dress Shirt",
  },
  {
    value: "dress-shirt-check",
    label: "Check Dress Shirt",
  },
];

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2 onvo-max-w-72">
    <SearchSelect onValueChange={(e) => console.log(e)} items={data} />

    <SearchSelect
      onValueChange={(e) => console.log(e)}
      items={data}
      placeholder="Search for item"
    />
    <SearchSelect
      onValueChange={(e) => console.log(e)}
      items={data}
      value="relaxed-button-down"
    />
  </div>
);
Variants.args = {};
