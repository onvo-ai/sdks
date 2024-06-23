import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Empty } from "./Empty";
import { Card } from "../../tremor/Card";
import { Button } from "../../tremor/Button";

const meta: Meta = {
  component: Empty,
  title: "Elements/Empty",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Empty>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-max-w-screen-md onvo-gap-2">
    <Card>
      <Empty title="No data" subtitle="No data found for this action" />
    </Card>
    <Card>
      <Empty
        title="No data"
        subtitle="No data found for this action"
        button={<Button>Refresh</Button>}
      />
    </Card>

    <Card>
      <Empty
        direction="row"
        title="No data"
        subtitle="No data found for this action"
        button={<Button>Refresh</Button>}
      />
    </Card>
  </div>
);
Variants.args = {};
