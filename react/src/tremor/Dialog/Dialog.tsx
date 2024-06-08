// Tremor Raw Dialog [v0.0.0]

import React from "react";
import * as DialogPrimitives from "@radix-ui/react-dialog";

import { cx, focusRing } from "../../lib/utils";

const Dialog = (
  props: React.ComponentPropsWithoutRef<typeof DialogPrimitives.Root>
) => {
  return <DialogPrimitives.Root {...props} />;
};
Dialog.displayName = "Dialog";

const DialogTrigger = DialogPrimitives.Trigger;

DialogTrigger.displayName = "DialogTrigger";

const DialogClose = DialogPrimitives.Close;

DialogClose.displayName = "DialogClose";

const DialogPortal = DialogPrimitives.Portal;

DialogPortal.displayName = "DialogPortal";

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Overlay>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DialogPrimitives.Overlay
      ref={forwardedRef}
      className={cx(
        // base
        "onvo-fixed onvo-inset-0 onvo-z-50 onvo-overflow-y-auto",
        // background color
        "onvo-bg-black/70",
        // transition
        "data-[state=open]:onvo-animate-dialogOverlayShow",
        className
      )}
      {...props}
    />
  );
});

DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Content> & {
    container?: HTMLElement;
  }
>(({ className, container, ...props }, forwardedRef) => {
  return (
    <DialogPortal container={container}>
      <DialogOverlay>
        <DialogPrimitives.Content
          ref={forwardedRef}
          className={cx(
            // base
            "onvo-fixed onvo-left-1/2 onvo-top-1/2 onvo-z-50 onvo-w-[95vw] onvo-max-w-lg -onvo-translate-x-1/2 -onvo-translate-y-1/2 onvo-overflow-y-auto onvo-rounded-md onvo-border onvo-p-6 onvo-shadow-lg",
            // border color
            "onvo-border-gray-200 dark:onvo-border-gray-900 ",
            // background color
            "onvo-bg-white dark:onvo-bg-[#090E1A]",
            // transition
            "data-[state=open]:onvo-animate-dialogContentShow",
            focusRing,
            className
          )}
          {...props}
        />
      </DialogOverlay>
    </DialogPortal>
  );
});

DialogContent.displayName = "DialogContent";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cx("onvo-flex onvo-flex-col onvo-gap-y-1", className)}
      {...props}
    />
  );
};

DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
>(({ className, ...props }, forwardedRef) => (
  <DialogPrimitives.Title
    ref={forwardedRef}
    className={cx(
      // base
      "onvo-text-lg onvo-font-semibold",
      // text color
      "onvo-text-gray-900 dark:onvo-text-gray-50",
      className
    )}
    {...props}
  />
));

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Description>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DialogPrimitives.Description
      ref={forwardedRef}
      className={cx("onvo-text-gray-500 dark:onvo-text-gray-500", className)}
      {...props}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cx(
        "onvo-flex onvo-flex-col-reverse sm:onvo-flex-row sm:onvo-justify-end sm:onvo-space-x-2",
        className
      )}
      {...props}
    />
  );
};

DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
