// Tremor Raw Calendar [v0.0.2]

"use client";

import * as React from "react";
import { addYears, format, isSameMonth } from "date-fns";
import {
  DayPicker,
  useDayPicker,
  useDayRender,
  useNavigation,
  type DayPickerRangeProps,
  type DayPickerSingleProps,
  type DayProps,
  type Matcher,
} from "react-day-picker";

import { cx, focusRing } from "../../lib/utils";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

interface NavigationButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon: React.ElementType;
  disabled?: boolean;
}

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(
  (
    { onClick, icon, disabled, ...props }: NavigationButtonProps,
    forwardedRef
  ) => {
    const Icon = icon;
    return (
      <button
        ref={forwardedRef}
        type="button"
        disabled={disabled}
        className={cx(
          "onvo-flex onvo-size-8 onvo-shrink-0 onvo-select-none onvo-items-center onvo-justify-center onvo-rounded onvo-border onvo-p-1 onvo-outline-none onvo-transition sm:onvo-size-[30px]",
          // text color
          "onvo-text-gray-600 hover:onvo-text-gray-800",
          "dark:onvo-text-gray-400 hover:onvo-dark:text-gray-200",
          // border color
          "onvo-border-gray-300 dark:onvo-border-gray-700",
          // background color
          "hover:onvo-bg-gray-50 active:onvo-bg-gray-100",
          "hover:dark:onvo-bg-gray-900 active:dark:onvo-bg-gray-800",
          // disabled
          "disabled:onvo-pointer-events-none",
          "disabled:onvo-border-gray-200 disabled:dark:onvo-border-gray-800",
          "disabled:onvo-text-gray-400 disabled:dark:onvo-text-gray-600",
          focusRing
        )}
        onClick={onClick}
        {...props}
      >
        <Icon className="onvo-size-full onvo-shrink-0" />
      </button>
    );
  }
);

NavigationButton.displayName = "NavigationButton";

type OmitKeys<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type KeysToOmit = "showWeekNumber" | "captionLayout" | "mode";

type SingleProps = OmitKeys<DayPickerSingleProps, KeysToOmit>;
type RangeProps = OmitKeys<DayPickerRangeProps, KeysToOmit>;

type CalendarProps =
  | ({
      mode: "single";
    } & SingleProps)
  | ({
      mode?: undefined;
    } & SingleProps)
  | ({
      mode: "range";
    } & RangeProps);

const Calendar = ({
  mode = "single",
  weekStartsOn = 1,
  numberOfMonths = 1,
  enableYearNavigation = false,
  disableNavigation,
  locale,
  className,
  classNames,
  ...props
}: CalendarProps & { enableYearNavigation?: boolean }) => {
  return (
    <DayPicker
      mode={mode}
      weekStartsOn={weekStartsOn}
      numberOfMonths={numberOfMonths}
      locale={locale}
      showOutsideDays={numberOfMonths === 1 ? true : false}
      className={cx(className)}
      classNames={{
        months: "onvo-flex onvo-space-y-0",
        month: "onvo-space-y-4 onvo-p-3",
        nav: "onvo-gap-1 onvo-flex onvo-items-center onvo-rounded-full onvo-size-full onvo-justify-between onvo-p-4",
        table: "onvo-w-full onvo-border-collapse onvo-space-y-1",
        head_cell:
          "onvo-w-9 onvo-font-medium onvo-text-sm sm:onvo-text-xs onvo-text-center onvo-text-gray-400 dark:onvo-text-gray-600 onvo-pb-2",
        row: "onvo-w-full onvo-mt-0.5",
        cell: cx(
          "relative p-0 text-center focus-within:relative",
          "text-gray-900 dark:text-gray-50"
        ),
        day: cx(
          "onvo-size-9 onvo-rounded onvo-text-sm onvo-text-gray-900 dark:onvo-text-gray-50",
          "hover:onvo-bg-gray-200 hover:dark:onvo-bg-gray-700",
          focusRing
        ),
        day_today: "onvo-font-semibold",
        day_selected: cx(
          "onvo-rounded",
          "aria-selected:onvo-bg-gray-900 aria-selected:onvo-text-gray-50",
          "dark:aria-selected:onvo-bg-gray-50 dark:aria-selected:onvo-text-gray-900"
        ),
        day_disabled:
          "!onvo-text-gray-300 dark:!onvo-text-gray-700 onvo-line-through disabled:hover:onvo-bg-transparent",
        day_outside: "onvo-text-gray-400 dark:onvo-text-gray-600",
        day_range_middle: cx(
          "!onvo-rounded-none",
          "aria-selected:!onvo-bg-gray-100 aria-selected:!onvo-text-gray-900",
          "dark:aria-selected:!onvo-bg-gray-900 dark:aria-selected:!onvo-text-gray-50"
        ),
        day_range_start: "onvo-rounded-r-none !onvo-rounded-l",
        day_range_end: "onvo-rounded-l-none !onvo-rounded-r",
        day_hidden: "onvo-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <ChevronLeftIcon aria-hidden="true" className="onvo-size-4" />
        ),
        IconRight: () => (
          <ChevronRightIcon aria-hidden="true" className="onvo-size-4" />
        ),
        Caption: ({ ...props }) => {
          const {
            goToMonth,
            nextMonth,
            previousMonth,
            currentMonth,
            displayMonths,
          } = useNavigation();
          const { numberOfMonths, fromDate, toDate } = useDayPicker();

          const displayIndex = displayMonths.findIndex((month) =>
            isSameMonth(props.displayMonth, month)
          );
          const isFirst = displayIndex === 0;
          const isLast = displayIndex === displayMonths.length - 1;

          const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast);
          const hidePreviousButton = numberOfMonths > 1 && (isLast || !isFirst);

          const goToPreviousYear = () => {
            const targetMonth = addYears(currentMonth, -1);
            if (
              previousMonth &&
              (!fromDate || targetMonth.getTime() >= fromDate.getTime())
            ) {
              goToMonth(targetMonth);
            }
          };

          const goToNextYear = () => {
            const targetMonth = addYears(currentMonth, 1);
            if (
              nextMonth &&
              (!toDate || targetMonth.getTime() <= toDate.getTime())
            ) {
              goToMonth(targetMonth);
            }
          };

          return (
            <div className="onvo-flex onvo-items-center onvo-justify-between">
              <div className="onvo-flex onvo-items-center onvo-gap-1">
                {enableYearNavigation && !hidePreviousButton && (
                  <NavigationButton
                    disabled={
                      disableNavigation ||
                      !previousMonth ||
                      (fromDate &&
                        addYears(currentMonth, -1).getTime() <
                          fromDate.getTime())
                    }
                    aria-label="Go to previous year"
                    onClick={goToPreviousYear}
                    icon={ChevronDoubleLeftIcon}
                  />
                )}
                {!hidePreviousButton && (
                  <NavigationButton
                    disabled={disableNavigation || !previousMonth}
                    aria-label="Go to previous month"
                    onClick={() => previousMonth && goToMonth(previousMonth)}
                    icon={ChevronLeftIcon}
                  />
                )}
              </div>

              <div
                role="presentation"
                aria-live="polite"
                className="onvo-text-sm onvo-font-medium onvo-capitalize onvo-tabular-nums onvo-text-gray-900 dark:onvo-text-gray-50"
              >
                {format(props.displayMonth, "LLLL yyy", { locale })}
              </div>

              <div className="onvo-flex onvo-items-center onvo-gap-1">
                {!hideNextButton && (
                  <NavigationButton
                    disabled={disableNavigation || !nextMonth}
                    aria-label="Go to next month"
                    onClick={() => nextMonth && goToMonth(nextMonth)}
                    icon={ChevronRightIcon}
                  />
                )}
                {enableYearNavigation && !hideNextButton && (
                  <NavigationButton
                    disabled={
                      disableNavigation ||
                      !nextMonth ||
                      (toDate &&
                        addYears(currentMonth, 1).getTime() > toDate.getTime())
                    }
                    aria-label="Go to next year"
                    onClick={goToNextYear}
                    icon={ChevronDoubleRightIcon}
                  />
                )}
              </div>
            </div>
          );
        },
        Day: ({ date, displayMonth }: DayProps) => {
          const buttonRef = React.useRef<HTMLButtonElement>(null);
          const { activeModifiers, buttonProps, divProps, isButton, isHidden } =
            useDayRender(date, displayMonth, buttonRef);

          const { selected, today, disabled, range_middle } = activeModifiers;

          if (isHidden) {
            return <></>;
          }

          if (!isButton) {
            return (
              <div
                {...divProps}
                className={cx(
                  "onvo-flex onvo-items-center onvo-justify-center",
                  divProps.className
                )}
              />
            );
          }

          const {
            children: buttonChildren,
            className: buttonClassName,
            ...buttonPropsRest
          } = buttonProps;

          return (
            <button
              ref={buttonRef}
              {...buttonPropsRest}
              type="button"
              className={cx("onvo-relative", buttonClassName)}
            >
              {buttonChildren}
              {today && (
                <span
                  className={cx(
                    "onvo-absolute onvo-inset-x-1/2 onvo-bottom-1.5 onvo-h-0.5 onvo-w-4 -onvo-translate-x-1/2 onvo-rounded-[2px]",
                    {
                      "onvo-bg-blue-500 dark:onvo-bg-blue-500": !selected,
                      "!onvo-bg-white dark:!onvo-bg-gray-950": selected,
                      "!onvo-bg-gray-400 dark:!onvo-bg-gray-600":
                        selected && range_middle,
                      "onvo-bg-gray-400 onvo-text-gray-400 dark:onvo-bg-gray-400 dark:onvo-text-gray-600":
                        disabled,
                    }
                  )}
                />
              )}
            </button>
          );
        },
      }}
      {...(props as SingleProps & RangeProps)}
    />
  );
};

Calendar.displayName = "Calendar";

export { Calendar, type Matcher };
