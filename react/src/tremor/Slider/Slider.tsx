// Tremor Slider [v0.1.0]

"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cx, focusRing } from "../../lib/utils"
import { Text } from "../Text"

interface SliderProps
    extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    ariaLabelThumb?: string
}

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    SliderProps
>(({ className, ariaLabelThumb, ...props }, forwardedRef) => {
    const value = props.value || props.defaultValue;
    let first = value ? value[0] : 0;
    let second = value ? value[1] : 1;
    return (
        <div className="onvo-flex onvo-relative onvo-w-full onvo-flex-row onvo-items-center onvo-gap-2 onvo-bg-white dark:onvo-bg-gray-950 onvo-border onvo-border-gray-200 dark:onvo-border-gray-800 onvo-rounded-md onvo-px-3 onvo-py-1.5 onvo-shadow-sm">
            <Text className="onvo-text-sm">{first}</Text>
            <div className="onvo-relative onvo-flex-grow">
                <SliderPrimitive.Root
                    ref={forwardedRef}
                    className={cx(
                        // base
                        "onvo-relative onvo-flex onvo-cursor-pointer onvo-touch-none onvo-select-none",
                        // orientation
                        "data-[orientation='horizontal']:onvo-w-full data-[orientation='horizontal']:onvo-items-center",
                        "data-[orientation='vertical']:onvo-h-full data-[orientation='vertical']:onvo-w-fit data-[orientation='vertical']:onvo-justify-center",
                        // disabled
                        "data-[disabled]:onvo-pointer-events-none",
                        className,
                    )}
                    tremor-id="tremor-raw"
                    {...props}
                >
                    <SliderPrimitive.Track
                        className={cx(
                            // base
                            "onvo-relative onvo-grow onvo-overflow-hidden onvo-rounded-full onvo-bg-gray-200 dark:onvo-bg-gray-800",
                            // orientation
                            "data-[orientation='horizontal']:onvo-h-1.5 data-[orientation='horizontal']:onvo-w-full",
                            "data-[orientation='vertical']:onvo-h-full data-[orientation='vertical']:onvo-w-1.5",
                        )}
                    >
                        <SliderPrimitive.Range
                            className={cx(
                                // base
                                "onvo-absolute onvo-rounded-full onvo-bg-blue-500 dark:onvo-bg-blue-500",
                                // orientation
                                "data-[orientation='horizontal']:onvo-h-full",
                                "data-[orientation='vertical']:onvo-w-full",
                                // disabled
                                "data-[disabled]:onvo-bg-gray-300 dark:data-[disabled]:onvo-bg-gray-700",
                            )}
                        />
                    </SliderPrimitive.Track>
                    {value?.map((_, index) => (
                        <SliderPrimitive.Thumb
                            key={index}
                            className={cx(
                                // base
                                "onvo-block onvo-size-[17px] onvo-shrink-0 onvo-rounded-full onvo-border onvo-shadow onvo-transition-all",
                                // boder color
                                "onvo-border-gray-400 dark:onvo-border-gray-500",
                                // background color
                                "onvo-bg-white",
                                // disabled
                                "data-[disabled]:onvo-pointer-events-none data-[disabled]:onvo-bg-gray-200 dark:data-[disabled]:onvo-border-gray-800 dark:data-[disabled]:onvo-bg-gray-600",
                                focusRing,
                                "onvo-outline-offset-0",
                            )}
                            aria-label={ariaLabelThumb}
                        />
                    ))}
                </SliderPrimitive.Root></div>
            <Text className="onvo-text-sm">{second}</Text>
        </div>
    )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }