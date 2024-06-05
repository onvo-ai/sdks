// Tremor Raw Badge [v0.0.0]

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "../../lib/utils";

const badgeVariants = tv({
  base: cx(
    "onvo-inline-flex onvo-items-center onvo-gap-x-1 onvo-whitespace-nowrap onvo-rounded-md onvo-px-2 onvo-py-1 onvo-text-xs onvo-font-medium onvo-ring-1 onvo-ring-inset"
  ),
  variants: {
    variant: {
      default: [
        "onvo-bg-blue-50 onvo-text-blue-900 onvo-ring-blue-500/30",
        "dark:onvo-bg-blue-400/10 dark:onvo-text-blue-400 dark:onvo-ring-blue-400/30",
      ],
      neutral: [
        "onvo-bg-gray-50 onvo-text-gray-900 onvo-ring-gray-500/30",
        "dark:onvo-bg-gray-400/10 dark:onvo-text-gray-400 dark:onvo-ring-gray-400/20",
      ],
      success: [
        "onvo-bg-emerald-50 onvo-text-emerald-900 onvo-ring-emerald-600/30",
        "dark:onvo-bg-emerald-400/10 dark:onvo-text-emerald-400 dark:onvo-ring-emerald-400/20",
      ],
      error: [
        "onvo-bg-red-50 onvo-text-red-900 onvo-ring-red-600/20",
        "dark:onvo-bg-red-400/10 dark:onvo-text-red-400 dark:onvo-ring-red-400/20",
      ],
      warning: [
        "onvo-bg-yellow-50 onvo-text-yellow-900 onvo-ring-yellow-600/30",
        "dark:onvo-bg-yellow-400/10 dark:onvo-text-yellow-500 dark:onvo-ring-yellow-400/20",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cx(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeProps };
