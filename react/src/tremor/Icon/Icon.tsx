import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cx } from "../../lib/utils";

const iconVariants = tv({
  base: cx("inline-flex shrink-0 items-center justify-center "),
  variants: {
    variant: {
      simple: ["text-blue-500", "dark:text-blue-500"],
      shadow: [
        "bg-white text-blue-500 border-slate-100 border shadow-md",
        "dark:bg-slate-800 dark:text-blue-500 dark:border-slate-700",
      ],
      outlined: [
        "bg-white text-blue-500 border-blue-500/60 ring-blue-500/20 border ring-2",
        "dark:bg-slate-800 dark:text-blue-500 dark:border-blue-500/60 dark:ring-blue-500/20",
      ],
      light: [
        "bg-blue-100 text-blue-500",
        "dark:bg-blue-800 dark:text-blue-500",
      ],
      solid: [
        "bg-blue-500 text-white border-white ring-slate-200 border-2 ring-1",
        "dark:bg-blue-500 dark:text-white dark:border-slate-800 dark:ring-slate-700",
      ],
    },
    size: {
      xs: "px-1.5 py-1.5 rounded-md",
      sm: "px-1.5 py-1.5 rounded-md",
      md: "px-2 py-2 rounded-lg",
      lg: "px-2 py-2 rounded-lg",
      xl: "px-2.5 py-2.5 rounded-xl",
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
      xs: "h-3 w-3",
      sm: "h-5 w-5",
      md: "h-5 w-5",
      lg: "h-7 w-7",
      xl: "h-9 w-9",
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
