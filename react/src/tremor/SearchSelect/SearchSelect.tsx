import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text } from "../Text";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Input } from "../Input";
import { cx, focusRing } from "../../lib/utils";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const SearchSelect: React.FC<{
  items: { value: string; label: string }[];
  className?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  onValueChange: (val: string) => void;
}> = ({
  items,
  className,
  defaultValue,
  value,
  onValueChange,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
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

  let data = useMemo(
    () =>
      items.filter((a) => {
        return (
          a.label.toLowerCase().search(query.toLowerCase()) >= 0 ||
          a.value.toLowerCase().search(query.toLowerCase()) >= 0
        );
      }),
    [query, items]
  );

  useEffect(() => {
    if (value && value.trim() !== "") {
      setInternalValue(value);
      return;
    }
    if (defaultValue && defaultValue.trim() !== "") {
      setInternalValue(defaultValue);
      return;
    }
    setInternalValue("");
  }, [defaultValue, value]);

  const text = useMemo(() => {
    if (internalValue && internalValue.trim() !== "") {
      let item = items.find((a) => a.value === internalValue);
      return item?.label || placeholder || "Select";
    }
    return placeholder || "Select";
  }, [internalValue, placeholder]);

  return (
    <Popover
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) onValueChange(internalValue);
      }}
    >
      <PopoverTrigger asChild>
        <div
          ref={ref as any}
          className={cx(
            // base
            "onvo-cursor-pointer group/trigger onvo-flex onvo-flex-row onvo-w-full onvo-select-none onvo-items-center onvo-justify-between onvo-truncate onvo-rounded-md onvo-border onvo-px-2 onvo-py-1.5 onvo-shadow-sm onvo-outline-none onvo-transition sm:onvo-text-sm",
            // border color
            "onvo-border-gray-200 dark:onvo-border-gray-800",
            // text color
            "onvo-text-gray-900 dark:onvo-text-gray-50",
            // placeholder
            "data-[placeholder]:onvo-text-gray-400 data-[placeholder]:dark:onvo-text-gray-500",
            // background color
            "onvo-bg-white dark:onvo-bg-gray-950",
            // hover
            "hover:onvo-bg-gray-50 hover:dark:onvo-bg-gray-950/50",
            // disabled
            "data-[disabled]:onvo-bg-gray-100 data-[disabled]:onvo-text-gray-400",
            "data-[disabled]:dark:onvo-border-gray-700 data-[disabled]:dark:onvo-bg-gray-800 data-[disabled]:dark:onvo-text-gray-500",
            ...(open ? focusRing : []),
            className
            // invalid (optional)
            // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
          )}
        >
          <Text className="onvo-flex-grow onvo-text-ellipsis onvo-min-w-0 onvo-overflow-x-hidden">
            {text}
          </Text>
          <ChevronUpDownIcon className="onvo-h-4 onvo-w-4 onvo-flex-shrink-0" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="onvo-p-1" style={{ width: width || 100 }}>
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
              onClick={() => {
                setInternalValue(item.value);
              }}
              key={item.value}
              className={cx(
                // base
                "onvo-grid onvo-cursor-pointer onvo-grid-cols-[1fr_20px] onvo-gap-x-2 onvo-rounded onvo-px-3 onvo-py-2 onvo-outline-none onvo-transition-colors data-[state=checked]:onvo-font-semibold sm:onvo-text-sm",
                // text color
                "onvo-text-gray-900 dark:onvo-text-gray-50",
                // disabled
                "data-[disabled]:onvo-pointer-events-none data-[disabled]:onvo-text-gray-400 data-[disabled]:hover:onvo-bg-none dark:data-[disabled]:onvo-text-gray-600",
                // focus
                "focus-visible:onvo-bg-gray-100 focus-visible:dark:onvo-bg-gray-900",
                // hover
                "hover:onvo-bg-gray-100 hover:dark:onvo-bg-gray-900"
              )}
            >
              <Text className="onvo-flex-1 onvo-truncate">{item.label}</Text>
              {item.value === internalValue && (
                <CheckIcon
                  className="onvo-size-5 onvo-shrink-0 onvo-text-gray-800 dark:onvo-text-gray-200"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
