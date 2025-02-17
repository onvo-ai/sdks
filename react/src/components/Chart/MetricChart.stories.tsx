import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Wrapper } from "../../layouts/Wrapper";
import ChartBase from "./ChartBase";

const meta: Meta<typeof ChartBase> = {
    component: ChartBase,
    title: "Charts/Metric Chart",
    argTypes: {},
};
export default meta;

type Story = StoryObj<{
    token: string;
    baseUrl: string;
    id: string;
    adminMode: boolean;
}>;

export const Primary: Story = (args) => {
    return (
        <Wrapper {...args}>
            {["vertical", "horizontal"].map(labelAlignment => (
                <>
                    <div className="onvo-grid onvo-grid-cols-3 onvo-gap-2 onvo-w-full onvo-p-4">
                        {["start", "center", "end"].map(horizontalAlignment => (
                            <div className="onvo-relative onvo-h-32 onvo-border onvo-border-gray-200" key={horizontalAlignment + labelAlignment}>
                                <ChartBase title="Hello World" id={"1234" + horizontalAlignment + labelAlignment} json={{
                                    "data": {
                                        "datasets": [
                                            {
                                                "data": [
                                                    1000
                                                ],
                                                "label": "Companies"
                                            }
                                        ]
                                    },
                                    "type": "metric",
                                    "options": {
                                        "plugins": {
                                            "title": {
                                                "text": "Total Number of Companies Invested Under Fund 100",
                                                "display": true,
                                                "align": horizontalAlignment
                                            },
                                            "subtitle": {
                                                "text": "Total Number of Companies Invested Under Fund 100",
                                                "display": true,
                                                "align": horizontalAlignment,
                                            },
                                            "metric": {
                                                "align": horizontalAlignment,
                                                //"labelPosition": labelAlignment
                                            },
                                            "datalabels": {
                                                "display": false
                                            }
                                        },
                                        "responsive": true,
                                        "maintainAspectRatio": false
                                    }

                                }} /></div>
                        ))}
                    </div>
                </>
            ))}

        </Wrapper>
    );
};




Primary.args = {
    token:
        "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImFlNWIxZGRlLTFmZjUtNDk2Ny1hZmUxLTYzOWI3NTVjNzEwMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiI1ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE5MzA3MDgxfQ.230JQNigbv9HOSXms9m-JGKlpGveuD3-_bR3XdqRhEk",
    baseUrl: "http://localhost:3004",
    id: "ae5b1dde-1ff5-4967-afe1-639b755c7102",
};

Primary.parameters = { layout: "fullscreen" };
