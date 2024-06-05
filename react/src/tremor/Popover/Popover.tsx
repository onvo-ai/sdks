// Tremor Raw Popover [v0.0.0]

import React from "react";
import * as PopoverPrimitives from "@radix-ui/react-popover";

import { cx } from "../../lib/utils";

const Popover = (
  props: React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Root>
) => {
  return <PopoverPrimitives.Root {...props} />;
};

Popover.displayName = "Popover";

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Trigger>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Trigger ref={forwardedRef} {...props} />;
});

PopoverTrigger.displayName = "PopoverTrigger";

const PopoverAnchor = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Anchor>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Anchor>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Anchor ref={forwardedRef} {...props} />;
});

PopoverAnchor.displayName = "PopoverAnchor";

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Close>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Close ref={forwardedRef} {...props} />;
});

PopoverClose.displayName = "PopoverClose";

interface ContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Content> {}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Content>,
  ContentProps
>(
  (
    {
      className,
      sideOffset = 10,
      side = "bottom",
      align = "center",
      collisionPadding,
      avoidCollisions,
      ...props
    }: ContentProps,
    forwardedRef
  ) => {
    return (
      <PopoverPrimitives.Portal>
        <PopoverPrimitives.Content
          ref={forwardedRef}
          sideOffset={sideOffset}
          side={side}
          align={align}
          collisionPadding={collisionPadding}
          avoidCollisions
          className={cx(
            // base
            "onvo-max-h-[var(--radix-popper-available-height)] onvo-min-w-60 onvo-overflow-hidden onvo-rounded-md onvo-border onvo-p-2.5 onvo-text-sm onvo-shadow-md",
            // border color
            "onvo-border-gray-300 dark:onvo-border-gray-800",
            // text color
            "onvo-text-gray-900 dark:onvo-text-gray-50",
            // background color
            "onvo-bg-white dark:onvo-bg-gray-950",
            // transition
            "onvo-will-change-[transform,opacity]",
            "data-[state=closed]:onvo-animate-hide",
            "data-[state=open]:data-[side=bottom]:onvo-animate-slideDownAndFade data-[state=open]:data-[side=left]:onvo-animate-slideLeftAndFade data-[state=open]:data-[side=right]:onvo-animate-slideRightAndFade data-[state=open]:data-[side=top]:onvo-animate-slideUpAndFade",

            className
          )}
          // https://github.com/radix-ui/primitives/issues/1159
          onWheel={(event) => {
            event.stopPropagation();
            const isScrollingDown = event.deltaY > 0;
            if (isScrollingDown) {
              event.currentTarget.dispatchEvent(
                new KeyboardEvent("keydown", { key: "ArrowDown" })
              );
            } else {
              event.currentTarget.dispatchEvent(
                new KeyboardEvent("keydown", { key: "ArrowUp" })
              );
            }
          }}
          {...props}
        />
      </PopoverPrimitives.Portal>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger };
