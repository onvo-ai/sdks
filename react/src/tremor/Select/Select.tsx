// Tremor Raw Select [v0.0.0]

import React from "react";
import * as SelectPrimitives from "@radix-ui/react-select";
import { cx, focusInput, hasErrorInput } from "../../lib/utils";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";

const Select = SelectPrimitives.Root;
Select.displayName = "Select";

const SelectGroup = SelectPrimitives.Group;
SelectGroup.displayName = "SelectGroup";

const SelectValue = SelectPrimitives.Value;
SelectValue.displayName = "SelectValue";

const selectTriggerStyles = [
  cx(
    // base
    "onvo-group/trigger onvo-flex onvo-w-full onvo-select-none onvo-items-center onvo-justify-between onvo-truncate onvo-rounded-md onvo-border onvo-px-2 onvo-py-1.5 onvo-shadow-sm onvo-outline-none onvo-transition sm:onvo-text-sm",
    // border color
    "onvo-border-gray-300 dark:onvo-border-gray-800",
    // text color
    "onvo-text-gray-900 dark:onvo-text-gray-50",
    // placeholder
    "data-[placeholder]:onvo-text-gray-400 data-[placeholder]:dark:onvo-text-gray-500",
    // background color
    "bg-white dark:bg-gray-950",
    // hover
    "hover:onvo-bg-gray-50 hover:dark:onvo-bg-gray-950/50",
    // disabled
    "data-[disabled]:onvo-bg-gray-100 data-[disabled]:onvo-text-gray-400",
    "data-[disabled]:dark:onvo-border-gray-700 data-[disabled]:dark:onvo-bg-gray-800 data-[disabled]:dark:onvo-text-gray-500",
    focusInput
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
  ),
];

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Trigger> & {
    hasError?: boolean;
  }
>(({ className, hasError, children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitives.Trigger
      ref={forwardedRef}
      className={cx(
        selectTriggerStyles,
        hasError ? hasErrorInput : "",
        className
      )}
      {...props}
    >
      <span className="onvo-truncate">{children}</span>
      <SelectPrimitives.Icon asChild>
        <ChevronUpDownIcon
          className={cx(
            // base
            "onvo-size-4 onvo-shrink-0",
            // text color
            "onvo-text-gray-400 dark:onvo-text-gray-600",
            // disabled
            "group-data-[disabled]/trigger:onvo-text-gray-300 group-data-[disabled]/trigger:dark:onvo-text-gray-600"
          )}
        />
      </SelectPrimitives.Icon>
    </SelectPrimitives.Trigger>
  );
});

SelectTrigger.displayName = "SelectTrigger";

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollUpButton>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.ScrollUpButton
    ref={forwardedRef}
    className={cx(
      "onvo-flex onvo-cursor-default onvo-items-center onvo-justify-center onvo-py-1",
      className
    )}
    {...props}
  >
    <ChevronUpIcon className="onvo-size-3 onvo-shrink-0" aria-hidden="true" />
  </SelectPrimitives.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitives.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollDownButton>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.ScrollDownButton
    ref={forwardedRef}
    className={cx(
      "onvo-flex onvo-cursor-default onvo-items-center onvo-justify-center onvo-py-1",
      className
    )}
    {...props}
  >
    <ChevronDownIcon className="onvo-size-3 onvo-shrink-0" aria-hidden="true" />
  </SelectPrimitives.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitives.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Content>
>(
  (
    {
      className,
      position = "popper",
      children,
      sideOffset = 8,
      collisionPadding = 10,
      ...props
    },
    forwardedRef
  ) => (
    <SelectPrimitives.Portal>
      <SelectPrimitives.Content
        ref={forwardedRef}
        className={cx(
          // base
          "onvo-relative onvo-z-50 onvo-overflow-hidden onvo-rounded-md onvo-border onvo-shadow-xl onvo-shadow-black/[2.5%]",
          // widths
          "onvo-min-w-[calc(var(--radix-select-trigger-width)-2px)] onvo-max-w-[95vw]",
          // heights
          "onvo-max-h-[--radix-select-content-available-height]",
          // background color
          "onvo-bg-white dark:onvo-bg-gray-950",
          // text color
          "onvo-text-gray-900 dark:onvo-text-gray-50",
          // border color
          "onvo-border-gray-300 dark:onvo-border-gray-800",
          // transition
          "onvo-will-change-[transform,opacity]",
          // "data-[state=open]:animate-slideDownAndFade",
          "data-[state=closed]:onvo-animate-hide",
          "data-[side=bottom]:onvo-animate-slideDownAndFade data-[side=left]:onvo-animate-slideLeftAndFade data-[side=right]:onvo-animate-slideRightAndFade data-[side=top]:onvo-animate-slideUpAndFade",
          className
        )}
        sideOffset={sideOffset}
        position={position}
        collisionPadding={collisionPadding}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitives.Viewport
          className={cx(
            "onvo-p-1",
            position === "popper" &&
              "onvo-h-[var(--radix-select-trigger-height)] onvo-w-full onvo-min-w-[calc(var(--radix-select-trigger-width))]"
          )}
        >
          {children}
        </SelectPrimitives.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitives.Content>
    </SelectPrimitives.Portal>
  )
);

SelectContent.displayName = "SelectContent";

const SelectGroupLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Label>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.Label
    ref={forwardedRef}
    className={cx(
      // base
      "onvo-px-3 onvo-py-2 onvo-text-xs onvo-font-medium onvo-tracking-wide",
      // text color
      "onvo-text-gray-500 dark:onvo-text-gray-500",
      className
    )}
    {...props}
  />
));

SelectGroupLabel.displayName = "SelectGroupLabel";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitives.Item
      ref={forwardedRef}
      className={cx(
        // base
        "onvo-grid onvo-cursor-pointer onvo-grid-cols-[1fr_20px] onvo-gap-x-2 onvo-rounded onvo-px-3 onvo-py-2 onvo-outline-none onvo-transition-colors data-[state=checked]:onvo-font-semibold sm:onvo-text-sm",
        // text color
        "onvo-text-gray-900 dark:onvo-text-gray-50",
        // disabled
        "data-[disabled]:onvo-pointer-events-none data-[disabled]:onvo-text-gray-400 data-[disabled]:hover:onvo-bg-none dark:data-[disabled]:onvo-text-gray-600",
        // focus
        "focus-visible:onvo-bg-gray-100 focus-visible:dark:onvo-bg-gray-900",
        // hover
        "hover:onvo-bg-gray-100 hover:dark:onvo-bg-gray-900",
        className
      )}
      {...props}
    >
      <SelectPrimitives.ItemText className="onvo-flex-1 onvo-truncate">
        {children}
      </SelectPrimitives.ItemText>
      <SelectPrimitives.ItemIndicator>
        <CheckIcon
          className="onvo-size-5 onvo-shrink-0 onvo-text-gray-800 dark:onvo-text-gray-200"
          aria-hidden="true"
        />
      </SelectPrimitives.ItemIndicator>
    </SelectPrimitives.Item>
  );
});

SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Separator>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.Separator
    ref={forwardedRef}
    className={cx(
      // base
      "-onvo-mx-1 onvo-my-1 onvo-h-px",
      // background color
      "onvo-bg-gray-300 dark:onvo-bg-gray-700",
      className
    )}
    {...props}
  />
));

SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
