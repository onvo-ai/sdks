import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Slider } from "./Slider";

const meta: Meta = {
    component: Slider,
    title: "Primitives/Slider",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Variants: Story = (args) => (
    <div className="onvo-flex onvo-flex-col onvo-p-2 dark:onvo-bg-slate-800 onvo-items-start onvo-justify-start onvo-h-screen onvo-w-screen">
        <div className="onvo-w-96">
            <Slider min={0} max={100} defaultValue={[0, 100]} />
        </div>
    </div>
);
Variants.args = {};
