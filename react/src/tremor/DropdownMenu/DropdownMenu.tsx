// Tremor Raw Dropdown Menu [v0.0.0]

"use client";

import * as React from "react";
import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu";

import { cx } from "../../lib/utils";
import {
  CheckIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

const DropdownMenu = DropdownMenuPrimitives.Root;
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuTrigger = DropdownMenuPrimitives.Trigger;
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuGroup = DropdownMenuPrimitives.Group;
DropdownMenuGroup.displayName = "DropdownMenuGroup";

const DropdownMenuSubMenu = DropdownMenuPrimitives.Sub;
DropdownMenuSubMenu.displayName = "DropdownMenuSubMenu";

const DropdownMenuRadioGroup = DropdownMenuPrimitives.RadioGroup;
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

const DropdownMenuSubMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubTrigger>
>(({ className, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.SubTrigger
    ref={forwardedRef}
    className={cx(
      // base
      "onvo-relative onvo-flex onvo-cursor-default onvo-select-none onvo-items-center onvo-rounded onvo-py-1.5 onvo-pl-2 onvo-pr-1 onvo-outline-none onvo-transition-colors data-[state=checked]:onvo-font-semibold sm:onvo-text-sm",
      // text color
      "onvo-text-gray-900 dark:onvo-text-gray-50",
      // disabled
      "data-[disabled]:onvo-pointer-events-none data-[disabled]:onvo-text-gray-400 data-[disabled]:hover:onvo-bg-none dark:data-[disabled]:onvo-text-gray-600",
      // focus
      "focus-visible:onvo-bg-gray-100 data-[state=open]:onvo-bg-gray-100 focus-visible:dark:onvo-bg-gray-900 data-[state=open]:dark:onvo-bg-gray-900",
      // hover
      "hover:onvo-bg-gray-100 hover:dark:onvo-bg-gray-900",
      //
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon
      className="onvo-ml-auto onvo-size-4 onvo-shrink-0"
      aria-hidden="true"
    />
  </DropdownMenuPrimitives.SubTrigger>
));
DropdownMenuSubMenuTrigger.displayName = "DropdownMenuSubMenuTrigger";

const DropdownMenuSubMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubContent>
>(({ className, collisionPadding = 8, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Portal>
    <DropdownMenuPrimitives.SubContent
      ref={forwardedRef}
      collisionPadding={collisionPadding}
      className={cx(
        // base
        "onvo-relative onvo-z-50 onvo-overflow-hidden onvo-rounded-md onvo-border onvo-p-1 onvo-shadow-xl onvo-shadow-black/[2.5%]",
        // widths
        "onvo-min-w-32",
        // heights
        "onvo-max-h-[var(--radix-popper-available-height)]",
        // background color
        "onvo-bg-white dark:onvo-bg-gray-950",
        // text color
        "onvo-text-gray-900 dark:onvo-text-gray-50",
        // border color
        "onvo-border-gray-200 dark:onvo-border-gray-800",
        // transition
        "onvo-will-change-[transform,opacity]",
        // "data-[state=open]:animate-slideDownAndFade",
        "data-[state=closed]:onvo-animate-hide",
        "data-[side=bottom]:onvo-animate-slideDownAndFade data-[side=left]:onvo-animate-slideLeftAndFade data-[side=right]:onvo-animate-slideRightAndFade data-[side=top]:onvo-animate-slideUpAndFade",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitives.Portal>
));
DropdownMenuSubMenuContent.displayName = "DropdownMenuSubMenuContent";

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Content>
>(
  (
    {
      className,
      sideOffset = 8,
      collisionPadding = 8,
      align = "center",
      loop = true,
      ...props
    },
    forwardedRef
  ) => (
    <DropdownMenuPrimitives.Portal>
      <DropdownMenuPrimitives.Content
        ref={forwardedRef}
        className={cx(
          // base
          "onvo-relative onvo-z-50 onvo-overflow-hidden onvo-rounded-md onvo-border onvo-p-1 onvo-shadow-xl onvo-shadow-black/[2.5%]",
          // widths
          "onvo-min-w-48",
          // heights
          "onvo-max-h-[var(--radix-popper-available-height)]",
          // background color
          "onvo-bg-white dark:onvo-bg-gray-950",
          // text color
          "onvo-text-gray-900 dark:onvo-text-gray-50",
          // border color
          "onvo-border-gray-200 dark:onvo-border-gray-800",
          // transition
          "onvo-will-change-[transform,opacity]",
          "data-[state=closed]:onvo-animate-hide",
          "data-[side=bottom]:onvo-animate-slideDownAndFade data-[side=left]:onvo-animate-slideLeftAndFade data-[side=right]:onvo-animate-slideRightAndFade data-[side=top]:onvo-animate-slideUpAndFade",
          className
        )}
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        loop={loop}
        {...props}
      />
    </DropdownMenuPrimitives.Portal>
  )
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Item> & {
    shortcut?: string;
    hint?: string;
  }
>(({ className, shortcut, hint, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Item
    ref={forwardedRef}
    className={cx(
      // base
      "group/DropdownMenuItem onvo-relative onvo-flex onvo-cursor-pointer onvo-select-none onvo-items-center onvo-rounded onvo-py-1.5 onvo-pl-2 onvo-pr-1 onvo-outline-none onvo-transition-colors data-[state=checked]:onvo-font-semibold sm:onvo-text-sm",
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
    {children}
    {hint && (
      <span
        className={cx(
          "onvo-ml-auto onvo-pl-2 onvo-text-sm onvo-text-gray-400 dark:onvo-text-gray-600"
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx(
          "onvo-ml-auto onvo-pl-2 onvo-text-sm onvo-text-gray-400 dark:onvo-text-gray-600"
        )}
      >
        {shortcut}
      </span>
    )}
  </DropdownMenuPrimitives.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.CheckboxItem> & {
    shortcut?: string;
    hint?: string;
  }
>(
  (
    { className, hint, shortcut, children, checked, ...props },
    forwardedRef
  ) => (
    <DropdownMenuPrimitives.CheckboxItem
      ref={forwardedRef}
      className={cx(
        // base
        "onvo-relative onvo-flex onvo-cursor-pointer onvo-select-none onvo-items-center onvo-gap-x-2 onvo-rounded onvo-py-1.5 onvo-pl-8 onvo-pr-1 onvo-outline-none onvo-transition-colors data-[state=checked]:onvo-font-semibold sm:onvo-text-sm",
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
      checked={checked}
      {...props}
    >
      <span className="onvo-absolute onvo-left-2 onvo-flex onvo-size-4 onvo-items-center onvo-justify-center">
        <DropdownMenuPrimitives.ItemIndicator>
          <CheckIcon
            aria-hidden="true"
            className="onvo-size-full onvo-shrink-0 onvo-text-gray-800 dark:onvo-text-gray-200"
          />
        </DropdownMenuPrimitives.ItemIndicator>
      </span>
      {children}
      {hint && (
        <span
          className={cx(
            "onvo-ml-auto onvo-text-sm onvo-font-normal onvo-text-gray-400 dark:onvo-text-gray-600"
          )}
        >
          {hint}
        </span>
      )}
      {shortcut && (
        <span
          className={cx(
            "onvo-ml-auto onvo-text-sm onvo-font-normal onvo-tracking-widest onvo-text-gray-400 dark:onvo-border-gray-800 dark:onvo-text-gray-600"
          )}
        >
          {shortcut}
        </span>
      )}
    </DropdownMenuPrimitives.CheckboxItem>
  )
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.RadioItem> & {
    shortcut?: string;
    hint?: string;
  }
>(({ className, hint, shortcut, children, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.RadioItem
    ref={forwardedRef}
    className={cx(
      // base
      "group/DropdownMenuRadioItem onvo-relative onvo-flex onvo-cursor-pointer onvo-select-none onvo-items-center onvo-gap-x-2 onvo-rounded onvo-py-1.5 onvo-pl-8 onvo-pr-1 onvo-outline-none onvo-transition-colors data-[state=checked]:onvo-font-semibold sm:onvo-text-sm",
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
    <span className="onvo-absolute onvo-left-2 onvo-flex onvo-size-4 onvo-items-center onvo-justify-center">
      <CheckCircleIcon
        aria-hidden="true"
        className="onvo-size-full onvo-shrink-0 onvo-text-blue-500 group-data-[state=checked]/DropdownMenuRadioItem:onvo-flex group-data-[state=unchecked]/DropdownMenuRadioItem:onvo-hidden dark:onvo-text-blue-500"
      />
      <MinusCircleIcon
        aria-hidden="true"
        className="onvo-size-full onvo-shrink-0 onvo-text-gray-300 group-data-[state=unchecked]/DropdownMenuRadioItem:onvo-flex group-data-[state=checked]/DropdownMenuRadioItem:onvo-hidden dark:onvo-text-gray-700"
      />
    </span>
    {children}
    {hint && (
      <span
        className={cx(
          "onvo-ml-auto onvo-text-sm onvo-font-normal onvo-text-gray-400 dark:onvo-text-gray-600"
        )}
      >
        {hint}
      </span>
    )}
    {shortcut && (
      <span
        className={cx(
          "onvo-ml-auto onvo-text-sm onvo-font-normal onvo-tracking-widest onvo-text-gray-400 dark:onvo-border-gray-800 dark:onvo-text-gray-600"
        )}
      >
        {shortcut}
      </span>
    )}
  </DropdownMenuPrimitives.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Label>
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Label
    ref={forwardedRef}
    className={cx(
      // base
      "onvo-px-2 onvo-py-2 onvo-text-xs onvo-font-medium onvo-tracking-wide",
      // text color
      "onvo-text-gray-500 dark:onvo-text-gray-500",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Separator>
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitives.Separator
    ref={forwardedRef}
    className={cx(
      "-onvo-mx-1 onvo-my-1 onvo-h-px onvo-border-t onvo-border-gray-200 dark:onvo-border-gray-800",
      className
    )}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuIconWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div
      className={cx(
        // text color
        "onvo-text-gray-600 dark:onvo-text-gray-400",
        // disabled
        "group-data-[disabled]/DropdownMenuItem:onvo-text-gray-400 group-data-[disabled]/DropdownMenuItem:dark:onvo-text-gray-700",
        className
      )}
      {...props}
    />
  );
};
DropdownMenuIconWrapper.displayName = "DropdownMenuIconWrapper";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSubMenuTrigger,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuIconWrapper,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
