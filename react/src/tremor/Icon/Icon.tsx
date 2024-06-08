import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cx } from "../../lib/utils";

const iconVariants = tv({
  base: cx(
    "onvo-inline-flex onvo-shrink-0 onvo-items-center onvo-justify-center "
  ),
  variants: {
    variant: {
      simple: ["onvo-text-blue-500", "dark:onvo-text-blue-500"],
      shadow: [
        "onvo-bg-white onvo-text-blue-500 onvo-border-slate-100 onvo-border onvo-shadow-md",
        "dark:onvo-bg-slate-800 dark:onvo-text-blue-500 dark:onvo-border-slate-700",
      ],
      outlined: [
        "onvobg-white onvotext-blue-500 onvoborder-blue-500/60 onvoring-blue-500/20 onvoborder onvoring-2",
        "dark:onvobg-slate-800 dark:onvotext-blue-500 dark:onvoborder-blue-500/60 dark:onvoring-blue-500/20",
      ],
      light: [
        "onvo-bg-blue-100 onvo-text-blue-500",
        "dark:onvo-bg-blue-800 dark:onvo-text-blue-500",
      ],
      solid: [
        "onvo-bg-blue-500 onvo-text-white onvo-border-white onvo-ring-slate-200 onvo-border-2 onvo-ring-1",
        "dark:onvo-bg-blue-500 dark:onvo-text-white dark:onvo-border-slate-800 dark:onvo-ring-slate-700",
      ],
    },
    size: {
      xs: "onvo-px-1.5 onvo-py-1.5 onvo-rounded-md",
      sm: "onvo-px-1.5 onvo-py-1.5 onvo-rounded-md",
      md: "onvo-px-2 onvo-py-2 onvo-rounded-lg",
      lg: "onvo-px-2 onvo-py-2 onvo-rounded-lg",
      xl: "onvo-px-2.5 onvo-py-2.5 onvo-rounded-xl",
    },
  },
  defaultVariants: {
    variant: "simple",
    size: "sm",
  },
});

const iconInnerVariants = tv({
  base: cx("shrink-0"),
  variants: {
    size: {
      xs: "onvo-h-3 onvo-w-3",
      sm: "onvo-h-5 onvo-w-5",
      md: "onvo-h-5 onvo-w-5",
      lg: "onvo-h-7 onvo-w-7",
      xl: "onvo-h-9 onvo-w-9",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface IconProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof iconVariants> {
  icon: React.ElementType;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    { className, variant, size, icon: IconElement, ...props }: IconProps,
    forwardedRef
  ) => {
    return (
      <span
        ref={forwardedRef}
        className={cx(iconVariants({ variant, size }), className)}
        {...props}
      >
        <IconElement className={iconInnerVariants({ size })} />
      </span>
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconVariants, type IconProps };
