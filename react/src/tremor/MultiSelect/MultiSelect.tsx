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
    if (value && value.length > 0) {
      setInternalValue(value);
      return;
    }
    if (defaultValue && defaultValue.length > 0) {
      setInternalValue(defaultValue);
      return;
    }
    setInternalValue([]);
  }, [defaultValue, value]);

  const texts = useMemo(() => {
    if (internalValue && internalValue.length > 0) {
      let options = items.filter((a) => internalValue.indexOf(a.value) >= 0);
      return options;
    }
    return [];
  }, [internalValue, placeholder]);

  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={ref as any}
          className={cx(
            // base
            "cursor-pointer group/trigger flex w-full select-none items-center justify-between truncate rounded-md border px-2 py-1.5 shadow-sm outline-none transition sm:text-sm",
            // border color
            "border-slate-200 dark:border-slate-800",
            // text color
            "text-slate-900 dark:text-slate-50",
            // placeholder
            "data-[placeholder]:text-slate-400 data-[placeholder]:dark:text-slate-500",
            // background color
            "bg-white dark:bg-slate-950",
            // hover
            "hover:bg-slate-50 hover:dark:bg-slate-950/50",
            // disabled
            "data-[disabled]:bg-slate-100 data-[disabled]:text-slate-400",
            "data-[disabled]:dark:border-slate-700 data-[disabled]:dark:bg-slate-800 data-[disabled]:dark:text-slate-500",
            ...(open ? focusRing : []),
            className
            // invalid (optional)
            // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
          )}
        >
          {texts.length === 0 ? (
            <Text>{placeholder || "Multi select"}</Text>
          ) : (
            <div className="flex-grow flex flex-row gap-2 overflow-x-hidden">
              {texts.map((a) => (
                <div className="flex-shrink-0 px-2 py-0.5 rounded-md bg-slate-100">
                  <Text className="text-xs">{a.label}</Text>
                </div>
              ))}
            </div>
          )}
          <ChevronUpDownIcon className=" flex-shrink-0 h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-1" style={{ width: width || 100 }}>
        <Input
          type="search"
          placeholder="Search"
          className="mb-1"
          onChange={(e) => {
            setQuery(e.target.value);
            e.preventDefault();
          }}
        />
        <div className="p-0">
          {data.map((item) => (
            <div
              onClick={() => {
                let exists = internalValue.find((a) => a === item.value);
                let newValues = internalValue.filter((a) => a !== item.value);
                if (!exists) {
                  newValues.push(item.value);
                }
                setInternalValue(newValues);
                onValueChange(newValues);
              }}
              key={item.value}
              className={cx(
                // base
                "grid cursor-pointer grid-cols-[20px_1fr] gap-x-2 rounded px-3 py-2 outline-none transition-colors data-[state=checked]:font-semibold sm:text-sm",
                // text color
                "text-slate-900 dark:text-slate-50",
                // disabled
                "data-[disabled]:pointer-events-none data-[disabled]:text-slate-400 data-[disabled]:hover:bg-none dark:data-[disabled]:text-slate-600",
                // focus
                "focus-visible:bg-slate-100 focus-visible:dark:bg-slate-900",
                // hover
                "hover:bg-slate-100 hover:dark:bg-slate-900"
              )}
            >
              <Checkbox
                checked={internalValue.indexOf(item.value) >= 0}
                className="mt-0.5"
              />
              <Text className="flex-1 truncate">{item.label}</Text>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
