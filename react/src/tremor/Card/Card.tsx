// Tremor Raw Card [v0.0.0]

import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cx } from "../../lib/utils";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          "onvo-relative onvo-w-full onvo-rounded-md onvo-border-solid onvo-border onvo-p-6 onvo-text-left onvo-shadow-sm",
          // background color
          " onvo-bg-white dark:onvo-bg-[#090E1A]",
          // border color
          "onvo-border-black/10 dark:onvo-border-white/10",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, type CardProps };
