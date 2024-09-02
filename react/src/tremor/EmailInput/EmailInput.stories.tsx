import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { EmailInput } from "./EmailInput";

const meta: Meta = {
    component: EmailInput,
    title: "Primitives/Email Input",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof EmailInput>;

export const Variants: Story = (args) => (
    <div className="onvo-flex onvo-flex-col onvo-gap-2 onvo-max-w-96">
        <EmailInput placeholder="Hello world" value={[]} onValueChange={() => { }} />
    </div>
);
Variants.args = {};
