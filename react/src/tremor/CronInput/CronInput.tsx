import { MultiSelect } from "../MultiSelect";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../Select";
import { Text } from "../Text";
import React, { useEffect, useState } from "react";
import cronstrue from "cronstrue";

const DEFAULT_VALUE = {
    type: "week",
    hours: ["0"],
    dayOfMonth: ["1"],
    month: ["1"],
    dayOfWeek: ["1"]
}
export const CronInput: React.FC<{
    onValueChange: (str: string) => void;
    value: string;
}> = ({ onValueChange, value }) => {

    const [internalValue, setInternalValue] = useState(DEFAULT_VALUE);


    const updateValue = (key: string) => (value: string | string[]) => {
        let str = "0 ";
        let val = { ...internalValue, [key]: value };
        str += val.hours.length === 0 ? "* " : val.hours.join(",") + " ";
        if (val.type === "month" || val.type === "year") {
            str += val.dayOfMonth.length === 0 ? "* " : val.dayOfMonth.join(",") + " ";
        } else {
            str += "* ";
        }
        if (val.type === "year") {
            str += val.month.length === 0 ? "* " : val.month.join(",") + " ";
        } else {
            str += "* ";
        }
        if (val.type === "week") {
            str += val.dayOfWeek.length === 0 ? "* " : val.dayOfWeek.join(",");
        } else {
            str += "* ";
        }
        if (str !== value) {
            console.log("NEW: ", str, " OLD: ", value);
            onValueChange(str);
        }
    };

    useEffect(() => {
        if (!value) return;
        let parts = value.split(" ");
        let internal = { ...DEFAULT_VALUE };
        if (parts[3] === "*") {
            if (parts[2] === "*") {
                if (parts[4] === "*") {
                    internal.type = "day";
                } else {
                    internal.type = "week";
                }
            } else {
                internal.type = "month";
            }
        } else {
            internal.type = "year";
        }

        if (parts[1] !== "*") {
            internal.hours = parts[1].split(",");
        }
        if (parts[2] !== "*") {
            internal.dayOfMonth = parts[2].split(",");
        }
        if (parts[3] !== "*") {
            internal.month = parts[3].split(",");
        }
        if (parts[4] !== "*") {
            internal.dayOfWeek = parts[4].split(",");
        }
        setInternalValue(internal);
    }, [value]);

    const monthsOptions = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    const daysOfMonthOptions = Array.from({ length: 31 }, (_, i) => i + 1).map(
        (a) => a + ""
    );

    const daysOfWeekOptions = [
        { value: "0", label: "Sunday" },
        { value: "1", label: "Monday" },
        { value: "2", label: "Tuesday" },
        { value: "3", label: "Wednesday" },
        { value: "4", label: "Thursday" },
        { value: "5", label: "Friday" },
        { value: "6", label: "Saturday" },
    ];

    const hoursOptions = Array.from(Array(23).keys()).map((a) => a + "");

    return (
        <div className="onvo-w-full onvo-relative onvo-z-50">
            <div className="onvo-flex onvo-flex-col onvo-gap-2">
                <div className="onvo-w-full onvo-flex onvo-flex-col md:onvo-flex-row md:onvo-items-center onvo-justify-start">
                    <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-font-semibold">Every</Text>
                    <Select value={internalValue.type} onValueChange={updateValue("type")}>
                        <SelectTrigger className="onvo-w-44 onvo-min-w-0">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="year">Year</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="day">Day</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {internalValue.type === "year" && (
                    <div className="onvo-w-full onvo-flex onvo-flex-col md:onvo-flex-row md:onvo-items-center onvo-justify-start">
                        <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-font-semibold">Month</Text>
                        <MultiSelect
                            value={internalValue.month}
                            onValueChange={updateValue("month")}
                            items={monthsOptions}
                        />
                    </div>
                )}

                {["year", "month"].indexOf(internalValue.type) >= 0 && (
                    <div className="onvo-w-full onvo-flex onvo-flex-col md:onvo-flex-row md:onvo-items-center onvo-justify-start">
                        <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-font-semibold">Day</Text>
                        <MultiSelect
                            value={internalValue.dayOfMonth}
                            onValueChange={updateValue("dayOfMonth")}
                            items={daysOfMonthOptions.map((a) => ({ label: a, value: a }))}
                        />
                    </div>
                )}

                {["week"].indexOf(internalValue.type) >= 0 && (
                    <div className="onvo-w-full onvo-flex onvo-flex-col md:onvo-flex-row md:onvo-items-center onvo-justify-start">
                        <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-font-semibold">Day</Text>
                        <MultiSelect
                            value={internalValue.dayOfWeek}
                            onValueChange={updateValue("dayOfWeek")}
                            items={daysOfWeekOptions}
                        />
                    </div>
                )}
            </div>
            <div className="onvo-w-full onvo-flex onvo-flex-col md:onvo-flex-row md:onvo-items-center onvo-justify-start onvo-mt-2">
                <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-font-semibold">Time</Text>

                <MultiSelect
                    value={internalValue.hours}
                    onValueChange={updateValue("hours")}
                    items={hoursOptions.map((a) => ({ value: a, label: a + ":00" }))}
                />
            </div>
            {value && (
                <div className="onvo-w-full onvo-flex onvo-flex-col md:onvo-flex-row md:onvo-items-center onvo-justify-start onvo-mt-2">
                    <div className="onvo-hidden md:onvo-block onvo-w-24 onvo-flex-shrink-0 onvo-font-semibold"></div>
                    <Text className="onvo-mt-1 onvo-font-semibold">
                        {cronstrue.toString(value, { verbose: true })}
                    </Text>
                </div>
            )}
        </div>
    );
};
