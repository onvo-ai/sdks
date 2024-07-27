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
  title: "Primitives/Dropdown Menu",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <div className="onvo-flex onvo-justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="onvo-min-w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                <span className="onvo-text-blue-500">Upgrade</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled shortcut="⌘B">
              <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                <DropdownMenuIconWrapper></DropdownMenuIconWrapper>
                <span>Billing</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘S">
              <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                <DropdownMenuIconWrapper></DropdownMenuIconWrapper>
                <span>Account Settings</span>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem hint="Pro">
              <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                <span>Manage workspace</span>
              </span>
            </DropdownMenuItem>

            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>
                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                  <span>Invite users</span>
                </span>
              </DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuItem>
                  <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                    <span>Email</span>
                  </span>
                </DropdownMenuItem>

                <DropdownMenuSubMenu>
                  <DropdownMenuSubMenuTrigger>
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                      <span>Message</span>
                    </span>
                  </DropdownMenuSubMenuTrigger>
                  <DropdownMenuSubMenuContent>
                    <DropdownMenuItem>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <span>Whatsapp</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <span>Telegram</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <span>Discord</span>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <span>Slack</span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuSubMenuContent>
                </DropdownMenuSubMenu>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                    <span>More...</span>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
            <DropdownMenuItem shortcut="⌘T">
              <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                <span>New Workspace</span>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
              <span>Support</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem shortcut="⇧⌘Q">
            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
              <span>Sign out</span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);
Variants.args = {};
