// Tremor Date Picker [v1.0.4]

"use client"

import * as React from "react"
import { Time } from "@internationalized/date"
import * as PopoverPrimitives from "@radix-ui/react-popover"
import {
  AriaTimeFieldProps,
  TimeValue,
  useDateSegment,
  useTimeField,
} from "@react-aria/datepicker"
import {
  useTimeFieldState,
  type DateFieldState,
  type DateSegment,
} from "@react-stately/datepicker"
import { RiCalendar2Fill, RiSubtractFill } from "@remixicon/react"
import { format, type Locale } from "date-fns"
import { enUS } from "date-fns/locale"
import { tv, VariantProps } from "tailwind-variants"

import { cx, focusInput, focusRing, hasErrorInput } from "../../lib/utils"

import { Button } from "../Button"
import { Calendar as CalendarPrimitive, type Matcher } from "../Calendar"

//#region TimeInput
// ============================================================================

const isBrowserLocaleClockType24h = () => {
  const language =
    typeof window !== "undefined" ? window.navigator.language : "en-US"

  const hr = new Intl.DateTimeFormat(language, {
    hour: "numeric",
  }).format()

  return Number.isInteger(Number(hr))
}

type TimeSegmentProps = {
  segment: DateSegment
  state: DateFieldState
}

const TimeSegment = ({ segment, state }: TimeSegmentProps) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const { segmentProps } = useDateSegment(segment, state, ref)

  const isColon = segment.type === "literal" && segment.text === ":"
  const isSpace = segment.type === "literal" && segment.text === " "

  const isDecorator = isColon || isSpace

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cx(
        // base
        "onvo-relative onvo-block onvo-w-full onvo-appearance-none onvo-rounded-md onvo-border onvo-px-2.5 onvo-py-1.5 onvo-text-left onvo-uppercase onvo-tabular-nums onvo-shadow-sm onvo-outline-none onvo-transition sm:onvo-text-sm",
        // border color
        "onvo-border-gray-300 dark:onvo-border-gray-800",
        // text color
        "onvo-text-gray-900 dark:onvo-text-gray-50",
        // background color
        "onvo-bg-white dark:onvo-bg-gray-950",
        // focus
        focusInput,
        // invalid (optional)
        "invalid:onvo-border-red-500 invalid:onvo-ring-2 invalid:onvo-ring-red-200 group-aria-[invalid=true]/time-input:onvo-border-red-500 group-aria-[invalid=true]/time-input:onvo-ring-2 group-aria-[invalid=true]/time-input:onvo-ring-red-200 group-aria-[invalid=true]/time-input:dark:onvo-ring-red-400/20",
        {
          "!onvo-w-fit onvo-border-none onvo-bg-transparent onvo-px-0 onvo-text-gray-400 onvo-shadow-none":
            isDecorator,
          hidden: isSpace,
          "onvo-border-gray-300 onvo-bg-gray-100 onvo-text-gray-400 dark:onvo-border-gray-700 dark:onvo-bg-gray-800 dark:onvo-text-gray-500":
            state.isDisabled,
          "!onvo-bg-transparent !onvo-text-gray-400": !segment.isEditable,
        },
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          "onvo-pointer-events-none onvo-block w-full onvo-text-left onvo-text-gray-700 sm:onvo-text-sm",
          {
            hidden: !segment.isPlaceholder,
            "onvo-h-0": !segment.isPlaceholder,
          },
        )}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  )
}

type TimeInputProps = Omit<
  AriaTimeFieldProps<TimeValue>,
  "label" | "shouldForceLeadingZeros" | "description" | "errorMessage"
>

const TimeInput = React.forwardRef<HTMLDivElement, TimeInputProps>(
  ({ hourCycle, ...props }: TimeInputProps, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => innerRef?.current,
    )

    const locale = window !== undefined ? window.navigator.language : "en-US"

    const state = useTimeFieldState({
      hourCycle: hourCycle,
      locale: locale,
      shouldForceLeadingZeros: true,
      autoFocus: true,
      ...props,
    })

    const { fieldProps } = useTimeField(
      {
        ...props,
        hourCycle: hourCycle,
        shouldForceLeadingZeros: true,
      },
      state,
      innerRef,
    )

    return (
      <div
        {...fieldProps}
        ref={innerRef}
        className="onvo-group/time-input onvo-inline-flex onvo-w-full onvo-gap-x-2"
      >
        {state.segments.map((segment, i) => (
          <TimeSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    )
  },
)
TimeInput.displayName = "TimeInput"

//#region Trigger
// ============================================================================

const triggerStyles = tv({
  base: [
    // base
    "onvo-peer onvo-flex onvo-w-full onvo-cursor-pointer onvo-appearance-none onvo-items-center onvo-gap-x-2 onvo-truncate onvo-rounded-md onvo-border onvo-px-3 onvo-py-1.5 onvo-shadow-sm onvo-outline-none onvo-transition-all sm:onvo-text-sm",
    // background color
    "onvo-bg-white dark:onvo-bg-gray-950",
    // border color
    "onvo-border-gray-200 dark:onvo-border-gray-800",
    // text color
    "onvo-text-gray-900 dark:onvo-text-gray-50",
    // placeholder color
    "onvo-placeholder-gray-400 dark:onvo-placeholder-gray-500",
    // hover
    "hover:onvo-bg-gray-50 hover:dark:onvo-bg-gray-950/50",
    // disabled
    "disabled:onvo-pointer-events-none",
    "disabled:onvo-bg-gray-100 disabled:onvo-text-gray-400",
    "disabled:dark:onvo-border-gray-800 disabled:dark:onvo-bg-gray-800 disabled:dark:onvo-text-gray-500",
    // focus
    focusInput,
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
  },
})

interface TriggerProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof triggerStyles> {
  placeholder?: string
}

const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  (
    { className, children, placeholder, hasError, ...props }: TriggerProps,
    forwardedRef,
  ) => {
    return (
      <PopoverPrimitives.Trigger asChild>
        <button
          ref={forwardedRef}
          className={cx(triggerStyles({ hasError }), className)}
          {...props}
        >
          <RiCalendar2Fill className="onvo-size-4 onvo-shrink-0 onvo-text-gray-400 dark:onvo-text-gray-600" />
          <span className="onvo-flex-1 onvo-overflow-hidden onvo-text-ellipsis onvo-whitespace-nowrap onvo-text-left onvo-text-gray-900 dark:onvo-text-gray-50">
            {children ? (
              children
            ) : placeholder ? (
              <span className="onvo-text-gray-400 dark:onvo-text-gray-600">
                {placeholder}
              </span>
            ) : null}
          </span>
        </button>
      </PopoverPrimitives.Trigger>
    )
  },
)

Trigger.displayName = "DatePicker.Trigger"

//#region Popover
// ============================================================================

const CalendarPopover = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Content>,
  React.ComponentProps<typeof PopoverPrimitives.Content>
>(({ align, className, children, ...props }, forwardedRef) => {
  return (
    <PopoverPrimitives.Portal>
      <PopoverPrimitives.Content
        ref={forwardedRef}
        sideOffset={10}
        side="bottom"
        align={align}
        avoidCollisions
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cx(
          // base
          "onvo-relative onvo-z-50 onvo-w-fit onvo-rounded-md onvo-border onvo-text-sm onvo-shadow-xl onvo-shadow-black/[2.5%]",
          // widths
          "onvo-min-w-[calc(var(--radix-select-trigger-width)-2px)] onvo-max-w-[95vw]",
          // border color
          "onvo-border-gray-200 dark:onvo-border-gray-800",
          // background color
          "onvo-bg-white dark:onvo-bg-gray-950",
          // transition
          "onvo-will-change-[transform,opacity]",
          "data-[state=closed]:onvo-animate-hide",
          "data-[state=open]:data-[side=bottom]:onvo-animate-slideDownAndFade data-[state=open]:data-[side=left]:onvo-animate-slideLeftAndFade data-[state=open]:data-[side=right]:onvo-animate-slideRightAndFade data-[state=open]:data-[side=top]:onvo-animate-slideUpAndFade",
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitives.Content>
    </PopoverPrimitives.Portal>
  )
})

CalendarPopover.displayName = "DatePicker.CalendarPopover"

//#region Preset
// ============================================================================

type DateRange = {
  from: Date | undefined
  to?: Date | undefined
}

interface Preset {
  label: string
}

interface DatePreset extends Preset {
  date: Date
}

interface DateRangePreset extends Preset {
  dateRange: DateRange
}

type PresetContainerProps<TPreset extends Preset, TValue> = {
  presets: TPreset[]
  onSelect: (value: TValue) => void
  currentValue?: TValue
}

const PresetContainer = <TPreset extends Preset, TValue>({
  // Available preset configurations
  presets,
  // Event handler when a preset is selected
  onSelect,
  // Currently selected preset
  currentValue,
}: PresetContainerProps<TPreset, TValue>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDateRangePresets = (preset: any): preset is DateRangePreset => {
    return "dateRange" in preset
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDatePresets = (preset: any): preset is DatePreset => {
    return "date" in preset
  }

  const handleClick = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      onSelect(preset.dateRange as TValue)
    } else if (isDatePresets(preset)) {
      onSelect(preset.date as TValue)
    }
  }

  const compareDates = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const compareRanges = (range1: DateRange, range2: DateRange) => {
    const from1 = range1.from
    const from2 = range2.from

    let equalFrom = false

    if (from1 && from2) {
      const sameFrom = compareDates(from1, from2)

      if (sameFrom) {
        equalFrom = true
      }
    }

    const to1 = range1.to
    const to2 = range2.to

    let equalTo = false

    if (to1 && to2) {
      const sameTo = compareDates(to1, to2)

      if (sameTo) {
        equalTo = true
      }
    }

    return equalFrom && equalTo
  }

  const matchesCurrent = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      const value = currentValue as DateRange | undefined

      return value && compareRanges(value, preset.dateRange)
    } else if (isDatePresets(preset)) {
      const value = currentValue as Date | undefined

      return value && compareDates(value, preset.date)
    }

    return false
  }

  return (
    <ul className="onvo-flex onvo-items-start onvo-gap-x-2 sm:onvo-flex-col">
      {presets.map((preset, index) => {
        return (
          <li key={index} className="sm:onvo-w-full sm:onvo-py-px">
            <button
              title={preset.label}
              className={cx(
                // base
                "onvo-relative onvo-w-full onvo-overflow-hidden onvo-text-ellipsis onvo-whitespace-nowrap onvo-rounded onvo-border onvo-px-2.5 onvo-py-1.5 onvo-text-left onvo-text-base onvo-shadow-sm onvo-outline-none onvo-transition-all sm:onvo-border-none sm:onvo-py-2 sm:onvo-text-sm sm:onvo-shadow-none",
                // text color
                "onvo-text-gray-700 dark:onvo-text-gray-300",
                // border color
                "onvo-border-gray-200 dark:onvo-border-gray-800",
                // focus
                focusRing,
                // background color
                "focus-visible:onvo-bg-gray-100 focus-visible:dark:onvo-bg-gray-900",
                "hover:onvo-bg-gray-100 hover:dark:onvo-bg-gray-900",
                {
                  "onvo-bg-gray-100 dark:onvo-bg-gray-900": matchesCurrent(preset),
                },
              )}
              onClick={() => handleClick(preset)}
              aria-label={`Select ${preset.label}`}
            >
              <span>{preset.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

PresetContainer.displayName = "DatePicker.PresetContainer"

//#region Date Picker Shared
// ============================================================================

const formatDate = (
  date: Date,
  locale: Locale,
  includeTime?: boolean,
): string => {
  const usesAmPm = !isBrowserLocaleClockType24h()
  let dateString: string

  if (includeTime) {
    dateString = usesAmPm
      ? format(date, "dd MMM, yyyy h:mm a", { locale })
      : format(date, "dd MMM, yyyy HH:mm", { locale })
  } else {
    dateString = format(date, "dd MMM, yyyy", { locale })
  }

  return dateString
}

type CalendarProps = {
  fromYear?: number
  toYear?: number
  fromMonth?: Date
  toMonth?: Date
  fromDay?: Date
  toDay?: Date
  fromDate?: Date
  toDate?: Date
  locale?: Locale
}

type Translations = {
  cancel?: string
  apply?: string
  start?: string
  end?: string
  range?: string
}

interface PickerProps extends CalendarProps {
  className?: string
  disabled?: boolean
  disabledDays?: Matcher | Matcher[] | undefined
  required?: boolean
  showTimePicker?: boolean
  placeholder?: string
  enableYearNavigation?: boolean
  disableNavigation?: boolean
  hasError?: boolean
  id?: string
  // Customize the date picker for different languages.
  translations?: Translations
  align?: "center" | "end" | "start"
  "aria-invalid"?: boolean
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-required"?: boolean
}

//#region Single Date Picker
// ============================================================================

interface SingleProps extends Omit<PickerProps, "translations"> {
  presets?: DatePreset[]
  defaultValue?: Date
  value?: Date
  onChange?: (date: Date | undefined) => void
  translations?: Omit<Translations, "range">
}

const SingleDatePicker = ({
  defaultValue,
  value,
  onChange,
  presets,
  disabled,
  disabledDays,
  disableNavigation,
  className,
  showTimePicker,
  placeholder = "Select date",
  hasError,
  translations,
  enableYearNavigation = false,
  locale = enUS,
  align = "center",
  ...props
}: SingleProps) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    value ?? defaultValue ?? undefined,
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)

  const [time, setTime] = React.useState<TimeValue>(
    value
      ? new Time(value.getHours(), value.getMinutes())
      : defaultValue
        ? new Time(defaultValue.getHours(), defaultValue.getMinutes())
        : new Time(0, 0),
  )

  const initialDate = React.useMemo(() => {
    return date
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  React.useEffect(() => {
    setDate(value ?? defaultValue ?? undefined)
  }, [value, defaultValue])

  React.useEffect(() => {
    if (date) {
      setMonth(date)
    }
  }, [date])

  React.useEffect(() => {
    if (!open) {
      setMonth(date)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onCancel = () => {
    setDate(initialDate)
    setTime(
      initialDate
        ? new Time(initialDate.getHours(), initialDate.getMinutes())
        : new Time(0, 0),
    )
    setOpen(false)
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onCancel()
    }

    setOpen(open)
  }

  const onDateChange = (date: Date | undefined) => {
    const newDate = date
    if (showTimePicker) {
      if (newDate && !time) {
        setTime(new Time(0, 0))
      }
      if (newDate && time) {
        newDate.setHours(time.hour)
        newDate.setMinutes(time.minute)
      }
    }
    setDate(newDate)
  }

  const onTimeChange = (time: TimeValue) => {
    setTime(time)

    if (!date) {
      return
    }

    const newDate = new Date(date.getTime())

    if (!time) {
      newDate.setHours(0)
      newDate.setMinutes(0)
    } else {
      newDate.setHours(time.hour)
      newDate.setMinutes(time.minute)
    }

    setDate(newDate)
  }

  const formattedDate = React.useMemo(() => {
    if (!date) {
      return null
    }

    return formatDate(date, locale, showTimePicker)
  }, [date, locale, showTimePicker])

  const onApply = () => {
    setOpen(false)
    onChange?.(date)
  }

  React.useEffect(() => {
    setDate(value ?? defaultValue ?? undefined)
    setTime(
      value
        ? new Time(value.getHours(), value.getMinutes())
        : defaultValue
          ? new Time(defaultValue.getHours(), defaultValue.getMinutes())
          : new Time(0, 0),
    )
  }, [value, defaultValue])

  return (
    <PopoverPrimitives.Root
      tremor-id="tremor-raw"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        hasError={hasError}
        aria-required={props.required || props["aria-required"]}
        aria-invalid={props["aria-invalid"]}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
      >
        {formattedDate}
      </Trigger>
      <CalendarPopover align={align}>
        <div className="onvo-flex onvo-flex-col sm:onvo-flex-row sm:onvo-items-start">
          {presets && presets.length > 0 && (
            <div
              className={cx(
                "onvo-relative onvo-flex onvo-h-14 onvo-w-full onvo-items-center sm:onvo-h-auto sm:onvo-w-40",
                "onvo-border-b onvo-border-gray-200 sm:onvo-border-b-0 sm:onvo-border-r dark:onvo-border-gray-800",
                "onvo-overflow-auto",
              )}
            >
              <div className="onvo-px-2 onvo-pr-2 sm:onvo-inset-0 sm:onvo-left-0 sm:onvo-py-2">
                <PresetContainer
                  currentValue={date}
                  presets={presets}
                  onSelect={onDateChange}
                />
              </div>
            </div>
          )}
          <div>
            <CalendarPrimitive
              mode="single"
              month={month}
              onMonthChange={setMonth}
              selected={date}
              onSelect={onDateChange}
              disabled={disabledDays}
              locale={locale}
              enableYearNavigation={enableYearNavigation}
              disableNavigation={disableNavigation}
              initialFocus
              {...props}
            />
            {showTimePicker && (
              <div className="onvo-border-t onvo-border-gray-200 onvo-p-3 dark:onvo-border-gray-800">
                <TimeInput
                  aria-label="Time"
                  onChange={onTimeChange}
                  isDisabled={!date}
                  value={time}
                  isRequired={props.required}
                />
              </div>
            )}
            <div className="onvo-flex onvo-items-center onvo-gap-x-2 onvo-border-t onvo-border-gray-200 onvo-p-3 dark:onvo-border-gray-800">
              <Button
                variant="secondary"
                className="onvo-h-8 onvo-w-full"
                type="button"
                onClick={onCancel}
              >
                {translations?.cancel ?? "Cancel"}
              </Button>
              <Button
                variant="primary"
                className="onvo-h-8 onvo-w-full"
                type="button"
                onClick={onApply}
              >
                {translations?.apply ?? "Apply"}
              </Button>
            </div>
          </div>
        </div>
      </CalendarPopover>
    </PopoverPrimitives.Root>
  )
}

//#region Range Date Picker
// ============================================================================

interface RangeProps extends PickerProps {
  presets?: DateRangePreset[]
  defaultValue?: DateRange
  value?: DateRange
  onChange?: (dateRange: DateRange | undefined) => void
}

const RangeDatePicker = ({
  defaultValue,
  value,
  onChange,
  presets,
  disabled,
  disableNavigation,
  disabledDays,
  enableYearNavigation = false,
  locale = enUS,
  showTimePicker,
  placeholder = "Select date range",
  hasError,
  translations,
  align = "center",
  className,
  ...props
}: RangeProps) => {
  const [open, setOpen] = React.useState(false)
  const [range, setRange] = React.useState<DateRange | undefined>(
    value ?? defaultValue ?? undefined,
  )
  const [month, setMonth] = React.useState<Date | undefined>(range?.from)

  const [startTime, setStartTime] = React.useState<TimeValue>(
    value?.from
      ? new Time(value.from.getHours(), value.from.getMinutes())
      : defaultValue?.from
        ? new Time(defaultValue.from.getHours(), defaultValue.from.getMinutes())
        : new Time(0, 0),
  )
  const [endTime, setEndTime] = React.useState<TimeValue>(
    value?.to
      ? new Time(value.to.getHours(), value.to.getMinutes())
      : defaultValue?.to
        ? new Time(defaultValue.to.getHours(), defaultValue.to.getMinutes())
        : new Time(0, 0),
  )

  const initialRange = React.useMemo(() => {
    return range
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  React.useEffect(() => {
    setRange(value ?? defaultValue ?? undefined)
  }, [value, defaultValue])

  React.useEffect(() => {
    if (range) {
      setMonth(range.from)
    }
  }, [range])

  React.useEffect(() => {
    if (!open) {
      setMonth(range?.from)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onRangeChange = (range: DateRange | undefined) => {
    const newRange = range;

    console.log("CHANGED: ", range);

    if (showTimePicker) {
      if (newRange?.from && !startTime) {
        setStartTime(new Time(0, 0))
      }

      if (newRange?.to && !endTime) {
        setEndTime(new Time(0, 0))
      }

      if (newRange?.from && startTime) {
        newRange.from.setHours(startTime.hour)
        newRange.from.setMinutes(startTime.minute)
      }

      if (newRange?.to && endTime) {
        newRange.to.setHours(endTime.hour)
        newRange.to.setMinutes(endTime.minute)
      }
    }

    setRange(newRange)
  }

  const onCancel = () => {
    setRange(initialRange)
    setStartTime(
      initialRange?.from
        ? new Time(initialRange.from.getHours(), initialRange.from.getMinutes())
        : new Time(0, 0),
    )
    setEndTime(
      initialRange?.to
        ? new Time(initialRange.to.getHours(), initialRange.to.getMinutes())
        : new Time(0, 0),
    )
    setOpen(false)
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onCancel()
    }

    setOpen(open)
  }

  const onTimeChange = (time: TimeValue, pos: "start" | "end") => {
    switch (pos) {
      case "start":
        setStartTime(time)
        break
      case "end":
        setEndTime(time)
        break
    }

    if (!range) {
      return
    }

    if (pos === "start") {
      if (!range.from) {
        return
      }

      const newDate = new Date(range.from.getTime())

      if (!time) {
        newDate.setHours(0)
        newDate.setMinutes(0)
      } else {
        newDate.setHours(time.hour)
        newDate.setMinutes(time.minute)
      }

      setRange({
        ...range,
        from: newDate,
      })
    }

    if (pos === "end") {
      if (!range.to) {
        return
      }

      const newDate = new Date(range.to.getTime())

      if (!time) {
        newDate.setHours(0)
        newDate.setMinutes(0)
      } else {
        newDate.setHours(time.hour)
        newDate.setMinutes(time.minute)
      }

      setRange({
        ...range,
        to: newDate,
      })
    }
  }

  React.useEffect(() => {
    setRange(value ?? defaultValue ?? undefined)

    setStartTime(
      value?.from
        ? new Time(value.from.getHours(), value.from.getMinutes())
        : defaultValue?.from
          ? new Time(
            defaultValue.from.getHours(),
            defaultValue.from.getMinutes(),
          )
          : new Time(0, 0),
    )
    setEndTime(
      value?.to
        ? new Time(value.to.getHours(), value.to.getMinutes())
        : defaultValue?.to
          ? new Time(defaultValue.to.getHours(), defaultValue.to.getMinutes())
          : new Time(0, 0),
    )
  }, [value, defaultValue])

  const displayRange = React.useMemo(() => {
    if (!range) {
      return null
    }

    return `${range.from ? formatDate(range.from, locale, showTimePicker) : ""} - ${range.to ? formatDate(range.to, locale, showTimePicker) : ""
      }`
  }, [range, locale, showTimePicker])

  const onApply = () => {
    setOpen(false)
    onChange?.(range)
  }


  return (
    <PopoverPrimitives.Root
      tremor-id="tremor-raw"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Trigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        hasError={hasError}
        aria-required={props.required || props["aria-required"]}
        aria-invalid={props["aria-invalid"]}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
      >
        {displayRange}
      </Trigger>
      <CalendarPopover align={align}>
        <div className="onvo-flex">
          <div className="onvo-flex onvo-flex-col onvo-overflow-x-auto sm:onvo-flex-row sm:onvo-items-stretch">
            {presets && presets.length > 0 && (
              <div
                className={cx(
                  "onvo-relative onvo-flex onvo-h-16 onvo-w-full onvo-items-center sm:onvo-h-auto sm:onvo-w-40",
                  "onvo-border-b onvo-border-gray-200 sm:onvo-border-b-0 sm:onvo-border-r dark:onvo-border-gray-800",
                  "onvo-overflow-x-auto sm:onvo-overflow-y-auto",
                )}
              >
                <div className="onvo-absolute onvo-px-3 sm:onvo-inset-0 sm:onvo-left-0 sm:onvo-p-2">
                  <PresetContainer
                    currentValue={range}
                    presets={presets}
                    onSelect={onRangeChange}
                  />
                </div>
              </div>
            )}
            <div className="onvo-overflow-x-auto">
              <CalendarPrimitive
                mode="range"
                selected={range}
                onSelect={onRangeChange}
                month={month}
                onMonthChange={setMonth}
                numberOfMonths={2}
                disabled={disabledDays}
                disableNavigation={disableNavigation}
                enableYearNavigation={enableYearNavigation}
                locale={locale}
                initialFocus
                classNames={{
                  months:
                    "onvo-flex onvo-flex-row onvo-divide-x onvo-divide-gray-200 dark:onvo-divide-gray-800 onvo-overflow-x-auto",
                }}
                {...props}
              />
              {showTimePicker && (
                <div className="onvo-flex onvo-items-center onvo-justify-evenly onvo-gap-x-3 onvo-border-t onvo-border-gray-200 onvo-p-3 dark:onvo-border-gray-800">
                  <div className="onvo-flex onvo-flex-1 onvo-items-center onvo-gap-x-2">
                    <span className="dark:onvo-text-gray-30 onvo-text-gray-700">
                      {translations?.start ?? "Start"}:
                    </span>
                    <TimeInput
                      value={startTime}
                      onChange={(v) => onTimeChange(v, "start")}
                      aria-label="Start date time"
                      isDisabled={!range?.from}
                      isRequired={props.required}
                    />
                  </div>
                  <RiSubtractFill className="onvo-size-4 onvo-shrink-0 onvo-text-gray-400" />
                  <div className="onvo-flex onvo-flex-1 onvo-items-center onvo-gap-x-2">
                    <span className="dark:onvo-text-gray-30 onvo-text-gray-700">
                      {translations?.end ?? "End"}:
                    </span>
                    <TimeInput
                      value={endTime}
                      onChange={(v) => onTimeChange(v, "end")}
                      aria-label="End date time"
                      isDisabled={!range?.to}
                      isRequired={props.required}
                    />
                  </div>
                </div>
              )}
              <div className="onvo-border-t onvo-border-gray-200 onvo-p-3 sm:onvo-flex sm:onvo-items-center sm:onvo-justify-between dark:onvo-border-gray-800">
                <p className="onvo-tabular-nums onvo-text-gray-900 dark:onvo-text-gray-50">
                  <span className="onvo-text-gray-700 dark:onvo-text-gray-300">
                    {translations?.range ?? "Range"}:
                  </span>{" "}
                  <span className="onvo-font-medium">{displayRange}</span>
                </p>
                <div className="onvo-mt-2 onvo-flex onvo-items-center onvo-gap-x-2 sm:onvo-mt-0">
                  <Button
                    variant="secondary"
                    className="onvo-h-8 onvo-w-full sm:onvo-w-fit"
                    type="button"
                    onClick={onCancel}
                  >
                    {translations?.cancel ?? "Cancel"}
                  </Button>
                  <Button
                    variant="primary"
                    className="onvo-h-8 onvo-w-full sm:onvo-w-fit"
                    type="button"
                    onClick={onApply}
                  >
                    {translations?.apply ?? "Apply"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalendarPopover>
    </PopoverPrimitives.Root>
  )
}

//#region Preset Validation
// ============================================================================

const validatePresets = (
  presets: DateRangePreset[] | DatePreset[],
  rules: PickerProps,
) => {
  const { toYear, fromYear, fromMonth, toMonth, fromDay, toDay } = rules

  if (presets && presets.length > 0) {
    const fromYearToUse = fromYear
    const toYearToUse = toYear

    presets.forEach((preset) => {
      if ("date" in preset) {
        const presetYear = preset.date.getFullYear()

        if (fromYear && presetYear < fromYear) {
          throw new Error(
            `Preset ${preset.label} is before fromYear ${fromYearToUse}.`,
          )
        }

        if (toYear && presetYear > toYear) {
          throw new Error(
            `Preset ${preset.label} is after toYear ${toYearToUse}.`,
          )
        }

        if (fromMonth) {
          const presetMonth = preset.date.getMonth()

          if (presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label} is before fromMonth ${fromMonth}.`,
            )
          }
        }

        if (toMonth) {
          const presetMonth = preset.date.getMonth()

          if (presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label} is after toMonth ${toMonth}.`,
            )
          }
        }

        if (fromDay) {
          const presetDay = preset.date.getDate()

          if (presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset ${preset.label} is before fromDay ${fromDay}.`,
            )
          }
        }

        if (toDay) {
          const presetDay = preset.date.getDate()

          if (presetDay > toDay.getDate()) {
            throw new Error(
              `Preset ${preset.label} is after toDay ${format(
                toDay,
                "MMM dd, yyyy",
              )}.`,
            )
          }
        }
      }

      if ("dateRange" in preset) {
        const presetFromYear = preset.dateRange.from?.getFullYear()
        const presetToYear = preset.dateRange.to?.getFullYear()

        if (presetFromYear && fromYear && presetFromYear < fromYear) {
          throw new Error(
            `Preset ${preset.label}'s 'from' is before fromYear ${fromYearToUse}.`,
          )
        }

        if (presetToYear && toYear && presetToYear > toYear) {
          throw new Error(
            `Preset ${preset.label}'s 'to' is after toYear ${toYearToUse}.`,
          )
        }

        if (fromMonth) {
          const presetMonth = preset.dateRange.from?.getMonth()

          if (presetMonth && presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label}'s 'from' is before fromMonth ${format(
                fromMonth,
                "MMM, yyyy",
              )}.`,
            )
          }
        }

        if (toMonth) {
          const presetMonth = preset.dateRange.to?.getMonth()

          if (presetMonth && presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label}'s 'to' is after toMonth ${format(
                toMonth,
                "MMM, yyyy",
              )}.`,
            )
          }
        }

        if (fromDay) {
          const presetDay = preset.dateRange.from?.getDate()

          if (presetDay && presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset ${preset.dateRange.from
              }'s 'from' is before fromDay ${format(fromDay, "MMM dd, yyyy")}.`,
            )
          }
        }

        if (toDay) {
          const presetDay = preset.dateRange.to?.getDate()

          if (presetDay && presetDay > toDay.getDate()) {
            throw new Error(
              `Preset ${preset.label}'s 'to' is after toDay ${format(
                toDay,
                "MMM dd, yyyy",
              )}.`,
            )
          }
        }
      }
    })
  }
}

//#region Types & Exports
// ============================================================================

type SingleDatePickerProps = {
  presets?: DatePreset[]
  defaultValue?: Date
  value?: Date
  onChange?: (date: Date | undefined) => void
} & PickerProps

const DatePicker = ({ presets, ...props }: SingleDatePickerProps) => {
  if (presets) {
    validatePresets(presets, props)
  }

  return <SingleDatePicker presets={presets} {...(props as SingleProps)} />
}

DatePicker.displayName = "DatePicker"

type RangeDatePickerProps = {
  presets?: DateRangePreset[]
  defaultValue?: DateRange
  value?: DateRange
  onChange?: (dateRange: DateRange | undefined) => void
} & PickerProps

const DateRangePicker = ({ presets, ...props }: RangeDatePickerProps) => {
  if (presets) {
    validatePresets(presets, props)
  }

  return <RangeDatePicker presets={presets} {...(props as RangeProps)} />
}

DateRangePicker.displayName = "DateRangePicker"

export {
  DatePicker,
  DateRangePicker,
  type DatePreset,
  type DateRangePreset,
  type DateRange,
}