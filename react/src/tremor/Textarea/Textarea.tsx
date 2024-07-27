import React from "react";

import { cx, focusInput, hasErrorInput } from "../../lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }: TextareaProps, forwardedRef) => {
    return (
      <textarea
        ref={forwardedRef}
        className={cx(
          // base
          "onvo-flex onvo-min-h-[4rem] onvo-w-full onvo-rounded-md onvo-border onvo-px-3 onvo-py-1.5 onvo-shadow-sm onvo-outline-none onvo-transition-all sm:onvo-text-sm",
          // text color
          "onvo-text-slate-900 dark:onvo-text-slate-50",
          // border color
          "onvo-border-slate-200 dark:onvo-border-slate-800",
          // background color
          "onvo-bg-white dark:onvo-bg-slate-950",
          // placeholder color
          "onvo-placeholder-slate-400 dark:onvo-placeholder-slate-500",
          // disabled
          "disabled:onvo-border-slate-300 disabled:onvo-bg-slate-100 disabled:onvo-text-slate-300",
          "disabled:dark:onvo-border-slate-700 disabled:dark:onvo-bg-slate-800 disabled:dark:onvo-text-slate-500",
          // focus
          focusInput,
          // error
          hasError ? hasErrorInput : "",
          // invalid (optional)
          // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
