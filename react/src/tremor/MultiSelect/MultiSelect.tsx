import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text } from "../Text";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Input } from "../Input";
import { cx, focusRing } from "../../lib/utils";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { Checkbox } from "../Checkbox";

export const MultiSelect: React.FC<{
  items: { value: string; label: string }[];
  className?: string;
  defaultValue?: string[];
  value?: string[];
  placeholder?: string;
  onValueChange: (val: string[]) => void;
}> = ({
  items,
  className,
  defaultValue,
  value,
  onValueChange,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const ref = useRef<HTMLDivElement>();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      // Do what you want to do when the size of the element changes
      setWidth(ref.current?.offsetWidth || 0);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  let data = useMemo(() => {
    if (items.length === 0) return [];
    return items.filter((a) => {
      return (
        a &&
        ((a.label + "").toLowerCase().search(query.toLowerCase()) >= 0 ||
          (a.value + "").toLowerCase().search(query.toLowerCase()) >= 0)
      );
    });
  }, [query, items]);

  useEffect(() => {
    if (value) {
      setInternalValue(value);
      return;
    }
    if (defaultValue) {
      setInternalValue(defaultValue);
      return;
    }
    setInternalValue([]);
  }, [defaultValue, value]);

  const texts = useMemo(() => {
    if (internalValue) {
      let options = items.filter((a) => internalValue.indexOf(a.value) >= 0);
      return options;
    }
    return [];
  }, [internalValue, placeholder]);

  return (
    <Popover
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          onValueChange(internalValue);
        }
      }}
    >
      <PopoverTrigger asChild>
        <div
          ref={ref as any}
          className={cx(
            // base
            "onvo-cursor-pointer onvo-group/trigger onvo-flex onvo-w-full onvo-select-none onvo-items-center onvo-justify-between onvo-truncate onvo-rounded-md onvo-border onvo-px-2 onvo-py-1.5 onvo-shadow-sm onvo-outline-none onvo-transition sm:onvo-text-sm",
            // border color
            "onvo-border-slate-200 dark:onvo-border-slate-800",
            // text color
            "onvo-text-slate-900 dark:onvo-text-slate-50",
            // placeholder
            "data-[placeholder]:onvo-text-slate-400 data-[placeholder]:dark:onvo-text-slate-500",
            // background color
            "onvo-bg-white dark:onvo-bg-slate-950",
            // hover
            "hover:onvo-bg-slate-50 hover:dark:onvo-bg-slate-950/50",
            // disabled
            "data-[disabled]:onvo-bg-slate-100 data-[disabled]:onvo-text-slate-400",
            "data-[disabled]:dark:onvo-border-slate-700 data-[disabled]:dark:onvo-bg-slate-800 data-[disabled]:dark:onvo-text-slate-500",
            ...(open ? focusRing : []),
            className
            // invalid (optional)
            // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
          )}
        >
          {texts.length === 0 ? (
            <Text>{placeholder || "Multi select"}</Text>
          ) : (
            <div className="onvo-flex-grow onvo-flex onvo-flex-row onvo-gap-2 onvo-overflow-x-hidden">
              {texts.map((a) => (
                <div
                  key={a.label}
                  className="onvo-flex-shrink-0 onvo-px-2 onvo-py-0.5 onvo-rounded-md onvo-bg-slate-100 dark:onvo-bg-slate-700"
                >
                  <Text className="onvo-text-xs">{a.label}</Text>
                </div>
              ))}
            </div>
          )}
          <ChevronUpDownIcon className="onvo-flex-shrink-0 onvo-h-4 onvo-w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="onvo-p-1 !onvo-foreground-color"
        style={{ width: width || 100 }}
      >
        <Input
          type="search"
          placeholder="Search"
          className="onvo-mb-1"
          onChange={(e) => {
            setQuery(e.target.value);
            e.preventDefault();
          }}
        />
        <div className="onvo-p-0">
          {data.map((item) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                let exists = internalValue.find((a) => a === item.value);
                let newValues = internalValue.filter((a) => a !== item.value);
                if (!exists) {
                  newValues.push(item.value);
                }
                setInternalValue(newValues);
              }}
              key={item.label}
              className={cx(
                // base
                "onvo-grid onvo-cursor-pointer onvo-grid-cols-[20px_1fr] onvo-gap-x-2 onvo-rounded onvo-px-3 onvo-py-2 onvo-outline-none onvo-transition-colors data-[state=checked]:onvo-font-semibold sm:onvo-text-sm",
                // text color
                "onvo-text-slate-900 dark:onvo-text-slate-50",
                // disabled
                "data-[disabled]:onvo-pointer-events-none data-[disabled]:onvo-text-slate-400 data-[disabled]:hover:onvo-bg-none dark:data-[disabled]:onvo-text-slate-600",
                // focus
                "focus-visible:onvo-bg-slate-100 focus-visible:dark:onvo-bg-slate-900",
                // hover
                "hover:onvo-bg-slate-100 hover:dark:onvo-bg-slate-900"
              )}
            >
              <Checkbox
                checked={internalValue.indexOf(item.value) >= 0}
                className="onvo-mt-0.5"
              />
              <Text className="onvo-flex-1 onvo-truncate">{item.label}</Text>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
