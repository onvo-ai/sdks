import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { CronInput } from "./CronInput";

const meta: Meta = {
    component: CronInput,
    title: "Primitives/Cron Input",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CronInput>;

export const Variants: Story = (args) => (
    <div className="onvo-flex onvo-flex-col onvo-gap-2">

        <CronInput value="0 1 * * *" onValueChange={(str) => console.log(str)} />
    </div>
);
Variants.args = {};
