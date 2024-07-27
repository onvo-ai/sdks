// Tremor Raw Switch [v0.0.0]

import React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { tv, VariantProps } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";
const switchVariants = tv({
  slots: {
    root: [
      // base
      "onvo-group onvo-relative onvo-isolate onvo-inline-flex onvo-shrink-0 onvo-cursor-pointer onvo-items-center onvo-rounded-full onvo-p-0.5 onvo-shadow-inner onvo-outline-none onvo-ring-1 onvo-ring-inset onvo-transition-all",
      "onvo-bg-gray-200 dark:onvo-bg-gray-950",
      // ring color
      "onvo-ring-black/5 dark:onvo-ring-gray-800",
      // checked
      "data-[state=checked]:onvo-bg-blue-500 data-[state=checked]:dark:onvo-bg-blue-500",
      // disabled
      "data-[disabled]:onvo-cursor-default",
      // disabled checked
      "data-[disabled]:data-[state=checked]:onvo-bg-blue-200",
      "data-[disabled]:data-[state=checked]:onvo-ring-gray-300",
      // disabled checked dark
      "data-[disabled]:data-[state=checked]:dark:onvo-ring-gray-900",
      "data-[disabled]:data-[state=checked]:dark:onvo-bg-blue-900",
      // disabled unchecked
      "data-[disabled]:data-[state=unchecked]:onvo-ring-gray-300",
      "data-[disabled]:data-[state=unchecked]:onvo-bg-gray-100",
      // disabled unchecked dark
      "data-[disabled]:data-[state=unchecked]:dark:onvo-ring-gray-700",
      "data-[disabled]:data-[state=unchecked]:dark:onvo-bg-gray-800",
      focusRing,
    ],
    thumb: [
      // base
      "onvo-pointer-events-none onvo-relative onvo-inline-block onvo-transform onvo-appearance-none onvo-rounded-full onvo-border-none onvo-shadow-lg onvo-outline-none onvo-transition-all onvo-duration-150 onvo-ease-in-out focus:onvo-border-none focus:onvo-outline-none focus:onvo-outline-transparent",
      // background color
      "onvo-bg-white dark:onvo-bg-gray-50",
      // disabled
      "group-data-[disabled]:onvo-shadow-none",
      "group-data-[disabled]:onvo-bg-gray-50 group-data-[disabled]:dark:onvo-bg-gray-500",
    ],
  },
  variants: {
    size: {
      default: {
        root: "onvo-h-5 onvo-w-9",
        thumb:
          "onvo-h-4 onvo-w-4 data-[state=checked]:onvo-translate-x-4 data-[state=unchecked]:onvo-translate-x-0",
      },
      small: {
        root: "onvo-h-4 onvo-w-7",
        thumb:
          "onvo-h-3 onvo-w-3 data-[state=checked]:onvo-translate-x-3 data-[state=unchecked]:onvo-translate-x-0",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});
interface SwitchProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
      "asChild"
    >,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, ...props }: SwitchProps, forwardedRef) => {
  const { root, thumb } = switchVariants({ size });
  return (
    <SwitchPrimitives.Root
      ref={forwardedRef}
      className={cx(root(), className)}
      {...props}
    >
      <SwitchPrimitives.Thumb className={cx(thumb())} />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = "Switch";

export { Switch };
