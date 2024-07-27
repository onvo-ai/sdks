// Tremor Raw Input [v1.0.0]

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx, focusInput, focusRing, hasErrorInput } from "../../lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const inputStyles = tv({
  base: [
    // base
    "onvo-relative onvo-block onvo-w-full onvo-appearance-none onvo-rounded-md onvo-border onvo-px-2.5 onvo-py-1.5 onvo-shadow-sm onvo-outline-none onvo-transition sm:onvo-text-sm",
    // border color
    "onvo-border-slate-200 dark:onvo-border-slate-800",
    // text color
    "onvo-text-slate-900 dark:onvo-text-slate-50",
    // placeholder color
    "onvo-placeholder-slate-400 dark:onvo-placeholder-slate-500",
    // background color
    "onvo-bg-white dark:onvo-bg-slate-950",
    // disabled
    "disabled:onvo-border-slate-200 disabled:onvo-bg-slate-100 disabled:onvo-text-slate-400",
    "disabled:dark:onvo-border-slate-700 disabled:dark:onvo-bg-slate-800 disabled:dark:onvo-text-slate-500",
    // file
    [
      "file:-onvo-my-1.5 file:-onvo-ml-2.5 file:onvo-h-[36px] file:onvo-cursor-pointer file:onvo-rounded-l-md file:onvo-rounded-r-none file:onvo-border-0 file:onvo-px-3 file:py-1.5 file:onvo-outline-none focus:onvo-outline-none disabled:onvo-pointer-events-none file:disabled:onvo-pointer-events-none",
      "file:onvo-border-solid file:onvo-border-slate-200 file:onvo-bg-slate-50 file:onvo-text-slate-500 file:hover:onvo-bg-slate-100 file:dark:onvo-border-slate-800 file:dark:onvo-bg-slate-950 file:hover:dark:onvo-bg-slate-900/20 file:disabled:dark:onvo-border-slate-700",
      "file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]",
      "file:disabled:onvo-bg-slate-100 file:disabled:onvo-text-slate-500 file:disabled:dark:onvo-bg-slate-800",
    ],
    // focus
    focusInput,
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
    // remove search cancel button (optional)
    "[&::--webkit-search-cancel-button]:onvo-hidden [&::-webkit-search-cancel-button]:onvo-hidden [&::-webkit-search-decoration]:onvo-hidden",
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
    // number input
    enableStepper: {
      true: "[appearance:textfield] [&::-webkit-inner-spin-button]:onvo-appearance-none [&::-webkit-outer-spin-button]:onvo-appearance-none",
    },
  },
});

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      hasError,
      enableStepper,
      type,
      ...props
    }: InputProps,
    forwardedRef
  ) => {
    const [typeState, setTypeState] = React.useState(type);

    const isPassword = type === "password";
    const isSearch = type === "search";

    return (
      <div className={cx("onvo-relative onvo-w-full", className)}>
        <input
          ref={forwardedRef}
          type={isPassword ? typeState : type}
          className={cx(
            inputStyles({ hasError, enableStepper }),
            {
              "onvo-pl-8": isSearch,
              "onvo-pr-10": isPassword,
            },
            inputClassName
          )}
          {...props}
        />
        {isSearch && (
          <div
            className={cx(
              // base
              "onvo-pointer-events-none onvo-absolute onvo-bottom-0 onvo-left-2 onvo-flex onvo-h-full onvo-items-center onvo-justify-center",
              // text color
              "onvo-text-slate-400 dark:onvo-text-slate-600"
            )}
          >
            <MagnifyingGlassIcon
              className="onvo-size-[1.125rem] onvo-shrink-0"
              aria-hidden="true"
            />
          </div>
        )}
        {isPassword && (
          <div
            className={cx(
              "onvo-absolute onvo-bottom-0 onvo-right-0 onvo-flex onvo-h-full onvo-items-center onvo-justify-center onvo-px-3"
            )}
          >
            <button
              aria-label="Change password visibility"
              className={cx(
                // base
                "onvo-h-fit onvo-w-fit onvo-rounded-sm onvo-outline-none onvo-transition-all",
                // text
                "onvo-text-slate-400  dark:onvo-text-slate-600",
                // hover
                "hover:onvo-text-slate-500 hover:dark:onvo-text-slate-500",
                focusRing
              )}
              type="button"
              onClick={() => {
                setTypeState(typeState === "password" ? "text" : "password");
              }}
            >
              <span className="onvo-sr-only">
                {typeState === "password" ? "Show password" : "Hide password"}
              </span>
              {typeState === "password" ? (
                <EyeIcon
                  aria-hidden="true"
                  className="onvo-size-5 onvo-shrink-0"
                />
              ) : (
                <EyeSlashIcon
                  aria-hidden="true"
                  className="onvo-size-5 onvo-shrink-0"
                />
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputStyles, type InputProps };
