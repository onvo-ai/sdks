// Tremor Raw Button [v0.0.0]

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";

const buttonVariants = tv({
  base: [
    // base
    "onvo-relative onvo-inline-flex onvo-items-center onvo-justify-center onvo-rounded-md onvo-border onvo-px-3 onvo-py-1.5 onvo-text-center onvo-text-sm onvo-font-medium onvo-shadow-sm onvo-transition-all onvo-duration-100 onvo-ease-in-out",
    // disabled
    "disabled:onvo-pointer-events-none disabled:onvo-shadow-none",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        // border
        "onvo-border-transparent",
        // text color
        "onvo-text-white dark:onvo-text-slate-900",
        // background color
        "onvo-bg-slate-900 dark:onvo-bg-slate-50",
        // hover color
        "hover:onvo-bg-slate-800 dark:hover:onvo-bg-slate-200",
        // disabled
        "disabled:onvo-bg-slate-100 disabled:onvo-text-slate-400",
        "disabled:dark:onvo-bg-slate-800 disabled:dark:onvo-text-slate-600",
      ],
      secondary: [
        // border
        "onvo-border-slate-200 dark:onvo-border-slate-800",
        // text color
        "onvo-text-slate-900 dark:onvo-text-slate-50",
        // background color
        "onvo-bg-white dark:onvo-bg-slate-950",
        //hover color
        "hover:onvo-bg-slate-50 dark:hover:onvo-bg-slate-900/60",
        // disabled
        "disabled:onvo-text-slate-400",
        "disabled:dark:onvo-text-slate-600",
      ],
      light: [
        // base
        "onvo-shadow-none",
        // border
        "onvo-border-transparent",
        // text color
        "onvo-text-slate-900 dark:onvo-text-slate-50",
        // background color
        "onvo-bg-slate-200 dark:onvo-bg-slate-900",
        // hover color
        "hover:onvo-bg-slate-300/70 dark:hover:onvo-bg-slate-800/80",
        // disabled
        "disabled:onvo-bg-slate-100 disabled:onvo-text-slate-400",
        "disabled:dark:onvo-bg-slate-800 disabled:dark:onvo-text-slate-600",
      ],
      destructive: [
        // text color
        "onvo-text-white",
        // border
        "onvo-border-transparent",
        // background color
        "onvo-bg-red-600 dark:onvo-bg-red-700",
        // hover color
        "hover:onvo-bg-red-700 dark:hover:onvo-bg-red-600",
        // disabled
        "disabled:onvo-bg-red-300 disabled:onvo-text-white",
        "disabled:dark:onvo-bg-red-950 disabled:dark:onvo-text-red-400",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}
const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
    </svg>
  );
};
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      children,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="onvo-pointer-events-none onvo-flex shrink-0 onvo-items-center onvo-justify-center onvo-gap-1.5">
            <Loader
              className="onvo-size-4 onvo-shrink-0 onvo-animate-spin"
              aria-hidden="true"
            />
            <span className="onvo-sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
