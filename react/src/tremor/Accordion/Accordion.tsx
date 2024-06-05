// Tremor Raw Badge [v0.0.0]

import React from "react";
import * as AccordionPrimitives from "@radix-ui/react-accordion";
import { cx } from "../../lib/utils";
import { PlusIcon } from "@heroicons/react/24/outline";

const Accordion = AccordionPrimitives.Root;

Accordion.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Trigger>
>(({ className, children, ...props }, forwardedRef) => (
  <AccordionPrimitives.Header className="onvo-flex">
    <AccordionPrimitives.Trigger
      className={cx(
        // base
        "group onvo-flex onvo-flex-1 onvo-cursor-pointer onvo-items-center onvo-justify-between onvo-py-3 onvo-text-left onvo-text-sm onvo-font-medium onvo-leading-none",
        // text color
        "onvo-text-gray-900 dark:onvo-text-gray-50",
        // disabled
        "data-[disabled]:onvo-cursor-default data-[disabled]:onvo-text-gray-400 dark:data-[disabled]:onvo-text-gray-600",
        //focus
        "focus-visible:onvo-z-10 focus-visible:onvo-outline-none focus-visible:onvo-ring-2 focus-visible:onvo-ring-inset focus-visible:onvo-ring-blue-500",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <PlusIcon
        className={cx(
          // base
          "onvo-size-5 onvo-shrink-0 onvo-transition-transform onvo-duration-150 onvo-ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:-onvo-rotate-45",
          // text color
          "onvo-text-gray-400 dark:onvo-text-gray-600",
          // disabled
          "group-data-[disabled]:onvo-text-gray-300 group-data-[disabled]:dark:onvo-text-gray-700"
        )}
        aria-hidden="true"
        focusable="false"
      />
    </AccordionPrimitives.Trigger>
  </AccordionPrimitives.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Content>
>(({ className, children, ...props }, forwardedRef) => (
  <AccordionPrimitives.Content
    ref={forwardedRef}
    className={cx(
      "data-[state=closed]:onvo-animate-accordionClose data-[state=open]:onvo-animate-accordionOpen"
    )}
    {...props}
  >
    <div
      className={cx(
        // base
        "onvo-overflow-hidden onvo-pb-4 onvo-text-sm",
        // text color
        "onvo-text-gray-700 dark:onvo-text-gray-200",
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitives.Content>
));

AccordionContent.displayName = "AccordionContent";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Item>
>(({ className, ...props }, forwardedRef) => (
  <AccordionPrimitives.Item
    ref={forwardedRef}
    className={cx(
      // base
      "onvo-overflow-hidden onvo-border-b first:onvo-mt-0",
      // border color
      "onvo-border-gray-200 dark:onvo-border-gray-800",
      className
    )}
    {...props}
  />
));

AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
