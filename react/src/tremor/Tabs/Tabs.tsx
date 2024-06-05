import * as TabsPrimitives from "@radix-ui/react-tabs";
import React from "react";

import { cx, focusRing } from "../../lib/utils";

const Tabs = (
  props: Omit<
    React.ComponentPropsWithoutRef<typeof TabsPrimitives.Root>,
    "orientation"
  >
) => {
  return <TabsPrimitives.Root {...props} />;
};

Tabs.displayName = "Tabs";

type TabsListVariant = "line" | "solid";

const TabsListVariantContext = React.createContext<TabsListVariant>("line");

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitives.List> {
  variant?: TabsListVariant;
}

const variantStyles: Record<TabsListVariant, string> = {
  line: cx(
    // base
    "onvo-flex onvo-items-center onvo-justify-start onvo-border-b",
    // border color
    "onvo-border-gray-200 dark:onvo-border-gray-800"
  ),
  solid: cx(
    // base
    "onvo-inline-flex onvo-items-center onvo-justify-center onvo-rounded-md onvo-p-1",
    // border color
    // "border-gray-200 dark:border-gray-800",
    // background color
    "onvo-bg-gray-100 dark:onvo-bg-gray-800"
  ),
};

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.List>,
  TabsListProps
>(({ className, variant = "line", children, ...props }, forwardedRef) => (
  <TabsPrimitives.List
    ref={forwardedRef}
    className={cx(variantStyles[variant], className)}
    {...props}
  >
    <TabsListVariantContext.Provider value={variant}>
      {children}
    </TabsListVariantContext.Provider>
  </TabsPrimitives.List>
));

TabsList.displayName = "TabsList";

function getVariantStyles(tabVariant: TabsListVariant) {
  switch (tabVariant) {
    case "line":
      return cx(
        // base
        "-onvo-mb-px onvo-items-center onvo-justify-center onvo-whitespace-nowrap onvo-border-b-2 onvo-border-transparent onvo-px-3 onvo-pb-3 onvo-text-sm onvo-font-medium onvo-transition-all",
        // text color
        "onvo-text-gray-500 dark:onvo-text-gray-500",
        // hover
        "hover:onvo-text-gray-700 hover:dark:onvo-text-gray-400",
        // border hover
        "hover:onvo-border-gray-300 hover:dark:onvo-border-gray-400",
        // selected
        "data-[state=active]:onvo-border-gray-900 data-[state=active]:onvo-text-gray-900",
        "data-[state=active]:dark:onvo-border-gray-50 data-[state=active]:dark:onvo-text-gray-50",
        // disabled
        "disabled:onvo-pointer-events-none",
        "disabled:onvo-text-gray-300 disabled:dark:onvo-text-gray-700"
      );
    case "solid":
      return cx(
        // base
        "onvo-inline-flex onvo-items-center onvo-justify-center onvo-whitespace-nowrap onvo-rounded onvo-px-3 onvo-py-1 onvo-transition-all onvo-text-sm onvo-font-medium",
        // text color
        "onvo-text-gray-500 dark:onvo-text-gray-400",
        // hover
        "hover:onvo-text-gray-700 hover:dark:onvo-text-gray-200",
        // selected
        " data-[state=active]:onvo-bg-white data-[state=active]:onvo-text-gray-900 data-[state=active]:onvo-shadow",
        "data-[state=active]:dark:onvo-bg-gray-900 data-[state=active]:dark:onvo-text-gray-50",
        // disabled
        "disabled:onvo-pointer-events-none disabled:onvo-text-gray-400 disabled:dark:onvo-text-gray-600 disabled:onvo-opacity-50"
      );
  }
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitives.Trigger>
>(({ className, children, ...props }, forwardedRef) => {
  const variant = React.useContext(TabsListVariantContext);
  return (
    <TabsPrimitives.Trigger
      ref={forwardedRef}
      className={cx(getVariantStyles(variant), focusRing, className)}
      {...props}
    >
      {children}
    </TabsPrimitives.Trigger>
  );
});

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitives.Content>
>(({ className, ...props }, forwardedRef) => (
  <TabsPrimitives.Content
    ref={forwardedRef}
    className={cx("onvo-outline-none", focusRing, className)}
    {...props}
  />
));

TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, TabsList, TabsTrigger };
