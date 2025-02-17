// Tremor Raw Tooltip [v0.0.1]

"use client";

import React from "react";
import * as TooltipPrimitives from "@radix-ui/react-tooltip";

import { cx } from "../../lib/utils";

interface TooltipProps
  extends Omit<TooltipPrimitives.TooltipContentProps, "content" | "onClick">,
  Pick<
    TooltipPrimitives.TooltipProps,
    "open" | "defaultOpen" | "onOpenChange" | "delayDuration"
  > {
  content: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  side?: "bottom" | "left" | "top" | "right";
  showArrow?: boolean;
  triggerAsChild?: boolean;
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitives.Content>,
  TooltipProps
>(
  (
    {
      children,
      className,
      content,
      delayDuration,
      defaultOpen,
      open,
      onClick,
      onOpenChange,
      showArrow = true,
      side,
      sideOffset = 10,
      triggerAsChild = false,
      ...props
    }: TooltipProps,
    forwardedRef
  ) => {
    return (
      <TooltipPrimitives.Provider delayDuration={150}>
        <TooltipPrimitives.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          delayDuration={delayDuration}
        >
          <TooltipPrimitives.Trigger onClick={onClick} asChild={triggerAsChild}>
            {children}
          </TooltipPrimitives.Trigger>
          <TooltipPrimitives.Content
            ref={forwardedRef}
            side={side}
            sideOffset={sideOffset}
            align="center"
            className={cx(
              // base
              "onvo-max-w-60 onvo-select-none onvo-rounded-md onvo-px-2.5 onvo-py-1.5 onvo-text-sm onvo-leading-5 onvo-shadow-md",
              // text color
              "onvo-text-gray-50 dark:onvo-text-gray-900",
              // background color
              "onvo-bg-gray-900 dark:onvo-bg-gray-50",
              // transition
              "onvo-will-change-[transform,opacity]",
              "data-[side=bottom]:onvo-animate-slideDownAndFade data-[side=left]:onvo-animate-slideLeftAndFade data-[side=right]:onvo-animate-slideRightAndFade data-[side=top]:onvo-animate-slideUpAndFade data-[state=closed]:onvo-animate-hide",
              className
            )}
            {...props}
          >
            {content}
            {showArrow ? (
              <TooltipPrimitives.Arrow
                className="onvo-border-none onvo-fill-gray-900 dark:onvo-fill-gray-50"
                width={12}
                height={7}
                aria-hidden="true"
              />
            ) : null}
          </TooltipPrimitives.Content>
        </TooltipPrimitives.Root>
      </TooltipPrimitives.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip, type TooltipProps };
