import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cx } from "../../lib/utils";

const iconVariants = tv({
  base: cx(
    "onvo-inline-flex onvo-shrink-0 onvo-items-center onvo-justify-center "
  ),
  variants: {
    variant: {
      simple: ["onvo-text-slate-900", "dark:onvo-text-slate-50"],
      shadow: [
        "onvo-bg-white onvo-text-slate-900 onvo-border-slate-100 onvo-border-solid onvo-border onvo-shadow-md",
        "dark:onvo-bg-slate-700 dark:onvo-text-slate-50 dark:onvo-border-slate-700",
      ],
      outlined: [
        "onvo-bg-white onvo-text-slate-900 onvo-border-slate-900/60 onvo-ring-slate-900/20 onvo-border-solid onvo-border onvo-ring-2",
        "dark:onvo-bg-slate-700 dark:onvo-text-slate-50 dark:onvo-border-slate-50/60 dark:onvo-ring-slate-50/20",
      ],
      light: [
        "onvo-bg-slate-100 onvo-text-slate-900",
        "dark:onvo-bg-slate-900 dark:onvo-text-slate-50",
      ],
      solid: [
        "onvo-bg-slate-900 onvo-text-white onvo-border-white onvo-ring-slate-200 onvo-border-solid onvo-border-2 onvo-ring-1",
        "dark:onvo-bg-slate-50 dark:onvo-text-slate-900 dark:onvo-border-slate-800 dark:onvo-ring-slate-700",
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
        {IconElement ? (
          <IconElement className={iconInnerVariants({ size })} />
        ) : (
          <></>
        )}
      </span>
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconVariants, type IconProps };
