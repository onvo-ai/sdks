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
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={ref as any}
          className={cx(
            // base
            "cursor-pointer group/trigger flex flex-row w-full select-none items-center justify-between truncate rounded-md border px-2 py-1.5 shadow-sm outline-none transition sm:text-sm",
            // border color
            "border-gray-200 dark:border-gray-800",
            // text color
            "text-gray-900 dark:text-gray-50",
            // placeholder
            "data-[placeholder]:text-gray-400 data-[placeholder]:dark:text-gray-500",
            // background color
            "bg-white dark:bg-gray-950",
            // hover
            "hover:bg-gray-50 hover:dark:bg-gray-950/50",
            // disabled
            "data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400",
            "data-[disabled]:dark:border-gray-700 data-[disabled]:dark:bg-gray-800 data-[disabled]:dark:text-gray-500",
            ...(open ? focusRing : []),
            className
            // invalid (optional)
            // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
          )}
        >
          <Text className="flex-grow text-ellipsis min-w-0 overflow-x-hidden">
            {text}
          </Text>
          <ChevronUpDownIcon className="h-4 w-4 flex-shrink-0" />
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
                setInternalValue(item.value);
                onValueChange(item.value);
              }}
              key={item.value}
              className={cx(
                // base
                "grid cursor-pointer grid-cols-[1fr_20px] gap-x-2 rounded px-3 py-2 outline-none transition-colors data-[state=checked]:font-semibold sm:text-sm",
                // text color
                "text-gray-900 dark:text-gray-50",
                // disabled
                "data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[disabled]:hover:bg-none dark:data-[disabled]:text-gray-600",
                // focus
                "focus-visible:bg-gray-100 focus-visible:dark:bg-gray-900",
                // hover
                "hover:bg-gray-100 hover:dark:bg-gray-900"
              )}
            >
              <Text className="flex-1 truncate">{item.label}</Text>
              {item.value === internalValue && (
                <CheckIcon
                  className="size-5 shrink-0 text-gray-800 dark:text-gray-200"
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
