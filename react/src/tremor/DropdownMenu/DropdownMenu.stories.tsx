"use client";

import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIconWrapper,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";

const meta: Meta = {
  component: DropdownMenu,
  title: "Tremor/DropdownMenu",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Variants: Story = (args) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span className="flex items-center gap-x-2">
                <span className="text-blue-500">Upgrade</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled shortcut="⌘B">
              <span className="flex items-center gap-x-2">
                <DropdownMenuIconWrapper></DropdownMenuIconWrapper>
                <span>Billing</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘S">
              <span className="flex items-center gap-x-2">
                <DropdownMenuIconWrapper></DropdownMenuIconWrapper>
                <span>Account Settings</span>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem hint="Pro">
              <span className="flex items-center gap-x-2">
                <span>Manage workspace</span>
              </span>
            </DropdownMenuItem>

            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>
                <span className="flex items-center gap-x-2">
                  <span>Invite users</span>
                </span>
              </DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuItem>
                  <span className="flex items-center gap-x-2">
                    <span>Email</span>
                  </span>
                </DropdownMenuItem>

                <DropdownMenuSubMenu>
                  <DropdownMenuSubMenuTrigger>
                    <span className="flex items-center gap-x-2">
                      <span>Message</span>
                    </span>
                  </DropdownMenuSubMenuTrigger>
                  <DropdownMenuSubMenuContent>
                    <DropdownMenuItem>
                      <span className="flex items-center gap-x-2">
                        <span>Whatsapp</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="flex items-center gap-x-2">
                        <span>Telegram</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="flex items-center gap-x-2">
                        <span>Discord</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="flex items-center gap-x-2">
                        <span>Slack</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuSubMenuContent>
                </DropdownMenuSubMenu>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="flex items-center gap-x-2">
                    <span>More...</span>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
            <DropdownMenuItem shortcut="⌘T">
              <span className="flex items-center gap-x-2">
                <span>New Workspace</span>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <span className="flex items-center gap-x-2">
              <span>Support</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem shortcut="⇧⌘Q">
            <span className="flex items-center gap-x-2">
              <span>Sign out</span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);
Variants.args = {};
