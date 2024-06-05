// Tremor Raw Divider [v0.0.0]

import React from "react";

import { cx } from "../../lib/utils";

interface DividerProps extends React.ComponentPropsWithoutRef<"div"> {}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={cx(
        // base
        "onvo-mx-auto onvo-my-6 onvo-flex onvo-w-full onvo-items-center onvo-justify-between onvo-gap-3 onvo-text-sm",
        // text color
        "onvo-text-gray-500 dark:onvo-text-gray-500",
        className
      )}
      {...props}
    >
      {children ? (
        <>
          <div
            className={cx(
              // base
              "onvo-h-[1px] onvo-w-full",
              // background color
              "onvo-bg-gray-200 dark:onvo-bg-gray-800"
            )}
          />
          <div className="onvo-whitespace-nowrap onvo-text-inherit">
            {children}
          </div>
          <div
            className={cx(
              // base
              "onvo-h-[1px] onvo-w-full",
              // background color
              "onvo-bg-gray-200 dark:onvo-bg-gray-800"
            )}
          />
        </>
      ) : (
        <div
          className={cx(
            // base
            "onvo-h-[1px] onvo-w-full",
            // backround color
            "onvo-bg-gray-200 dark:onvo-bg-gray-700"
          )}
        />
      )}
    </div>
  )
);

Divider.displayName = "Divider";

export { Divider };
