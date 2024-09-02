// Tremor Raw Checkbox [v0.0.0]

import React from "react";
import * as CheckboxPrimitives from "@radix-ui/react-checkbox";

import { cx, focusRing } from "../../lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitives.Root>
>(({ className, checked, ...props }, forwardedRef) => {
  return (
    <CheckboxPrimitives.Root
      ref={forwardedRef}
      {...props}
      checked={checked}
      className={cx(
        // base
        "onvo-relative onvo-inline-flex onvo-size-4 onvo-shrink-0 onvo-appearance-none onvo-items-center onvo-justify-center onvo-rounded onvo-border-solid onvo-border onvo-shadow-sm onvo-outline-none onvo-transition onvo-duration-100 enabled:onvo-cursor-pointer",
        // text color
        "onvo-text-white dark:onvo-text-gray-50",
        // background color
        "onvo-bg-white dark:onvo-bg-gray-950",
        // border color
        "onvo-border-gray-300 dark:onvo-border-gray-800",
        // disabled
        "data-[disabled]:onvo-border-gray-300 data-[disabled]:onvo-bg-gray-100 data-[disabled]:onvo-text-gray-400",
        "data-[disabled]:dark:onvo-border-gray-700 data-[disabled]:dark:onvo-bg-gray-800 data-[disabled]:dark:onvo-text-gray-500",
        // "disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-500",
        // checked and enabled
        "enabled:data-[state=checked]:onvo-border-0 enabled:data-[state=checked]:onvo-border-transparent enabled:data-[state=checked]:onvo-bg-blue-500",
        // indeterminate
        "enabled:data-[state=indeterminate]:onvo-border-0 enabled:data-[state=indeterminate]:onvo-border-transparent enabled:data-[state=indeterminate]:onvo-bg-blue-500",
        // focus
        focusRing,
        className
      )}
    >
      <CheckboxPrimitives.Indicator className="onvo-flex onvo-size-full onvo-items-center onvo-justify-center">
        {checked === "indeterminate" ? (
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              x1="4"
              x2="12"
              y1="8"
              y2="8"
            ></line>
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2 5.59998L6.79999 9.99998L4.79999 7.99998"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        )}
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
