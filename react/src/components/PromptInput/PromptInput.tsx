import React, { useRef, useState } from "react";
import { Textarea } from "../../tremor/Textarea";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { ArrowTrendingUpIcon, ArrowUpRightIcon, Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3CenterLeftIcon, Bars3Icon, ChartBarIcon, EyeDropperIcon, EyeIcon, EyeSlashIcon, GlobeAltIcon, H1Icon, H2Icon, SparklesIcon, TagIcon } from "@heroicons/react/24/outline";
import { Text } from "../../tremor/Text";
import {
    DropdownMenu, DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuIconWrapper,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSubMenu,
    DropdownMenuSubMenuContent,
    DropdownMenuSubMenuTrigger,
} from "../../tremor/DropdownMenu";

const SuggestionsDropdown: React.FC<{ children: React.ReactNode; url?: string; onSelect: (text: string) => void }> = ({ children, url, onSelect }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="onvo-min-w-56 onvo-z-[9999]">
                <DropdownMenuLabel>Prompt suggestions</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuSubMenu>
                        <DropdownMenuSubMenuTrigger>
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                <ChartBarIcon className="onvo-size-4" />
                                <span>Change chart type</span>
                            </span>
                        </DropdownMenuSubMenuTrigger>
                        <DropdownMenuSubMenuContent>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart type to be a bar chart")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    Bar chart
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart type to be a line chart")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    Line chart
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart type to be a area chart")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    Area chart
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuSubMenuContent>
                    </DropdownMenuSubMenu>
                    <DropdownMenuSubMenu>
                        <DropdownMenuSubMenuTrigger>
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                <EyeDropperIcon className="onvo-size-4" />
                                <span>Change chart color</span>
                            </span>
                        </DropdownMenuSubMenuTrigger>
                        <DropdownMenuSubMenuContent>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart colors to be shades of red")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <div className="onvo-size-3 onvo-rounded-full onvo-bg-red-500" />
                                    <span>Shades of red</span>
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart colors to be shades of green")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <div className="onvo-size-3 onvo-rounded-full onvo-bg-green-500" />
                                    <span>Shades of green</span>
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart colors to be shades of blue")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <div className="onvo-size-3 onvo-rounded-full onvo-bg-blue-500" />
                                    <span>Shades of blue</span>
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart colors to be shades of yellow")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <div className="onvo-size-3 onvo-rounded-full onvo-bg-orange-500" />
                                    <span>Shades of orange</span>
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart colors to be shades of purple")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <div className="onvo-size-3 onvo-rounded-full onvo-bg-purple-500" />
                                    <span>Shades of purple</span>
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Change the chart colors to be shades of pink")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <div className="onvo-size-3 onvo-rounded-full onvo-bg-slate-500" />
                                    <span>Shades of gray</span>
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuSubMenuContent>
                    </DropdownMenuSubMenu>

                    <DropdownMenuSubMenu>
                        <DropdownMenuSubMenuTrigger>
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                <ArrowTrendingUpIcon className="onvo-size-4" />
                                <span>Add a trend line</span>
                            </span>
                        </DropdownMenuSubMenuTrigger>
                        <DropdownMenuSubMenuContent>
                            <DropdownMenuItem onClick={() => onSelect("Add a linear trend line to the chart")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <ArrowUpRightIcon className="onvo-size-4" />
                                    <span>Linear trend line</span>
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Add a moving average trend line to the chart")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <ArrowTrendingUpIcon className="onvo-size-4" />
                                    <span>Moving average trend line</span>
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuSubMenuContent>
                    </DropdownMenuSubMenu>

                    <DropdownMenuSubMenu>
                        <DropdownMenuSubMenuTrigger>
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                <TagIcon className="onvo-size-4" />
                                <span>Data labels</span>
                            </span>
                        </DropdownMenuSubMenuTrigger>
                        <DropdownMenuSubMenuContent>
                            <DropdownMenuItem onClick={() => onSelect("Show data labels on the chart")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <EyeIcon className="onvo-size-4" />
                                    <span>Show data labels</span>
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSelect("Hide data labels on the chart")}>
                                <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                    <EyeSlashIcon className="onvo-size-4" />
                                    <span>Hide data labels</span>
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuSubMenuContent>
                    </DropdownMenuSubMenu>
                    <DropdownMenuSubMenu>
                        <DropdownMenuSubMenuTrigger>
                            <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                <Bars3BottomLeftIcon className="onvo-size-4" />
                                <span>Text alignment</span>
                            </span>
                        </DropdownMenuSubMenuTrigger>
                        <DropdownMenuSubMenuContent>
                            <DropdownMenuSubMenu>
                                <DropdownMenuSubMenuTrigger>
                                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                        <H1Icon className="onvo-size-4" />
                                        <span>Title alignment</span>
                                    </span>
                                </DropdownMenuSubMenuTrigger>
                                <DropdownMenuSubMenuContent>
                                    <DropdownMenuItem onClick={() => onSelect("Align the title to the left")}>
                                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                            <Bars3BottomLeftIcon className="onvo-size-4" />
                                            <span>Align title left</span>
                                        </span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelect("Align the title to the center")}>
                                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                            <Bars3Icon className="onvo-size-4" />
                                            <span>Align title center</span>
                                        </span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelect("Align the title to the right")}>
                                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                            <Bars3BottomRightIcon className="onvo-size-4" />
                                            <span>Align title right</span>
                                        </span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubMenuContent>
                            </DropdownMenuSubMenu>
                            <DropdownMenuSubMenu>
                                <DropdownMenuSubMenuTrigger>
                                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                        <H2Icon className="onvo-size-4" />
                                        <span>Subtitle alignment</span>
                                    </span>
                                </DropdownMenuSubMenuTrigger>
                                <DropdownMenuSubMenuContent>
                                    <DropdownMenuItem onClick={() => onSelect("Align the subtitle to the left")}>
                                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                            <Bars3BottomLeftIcon className="onvo-size-4" />
                                            <span>Align subtitle left</span>
                                        </span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelect("Align the subtitle to the center")}>
                                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                            <Bars3Icon className="onvo-size-4" />
                                            <span>Align subtitle center</span>
                                        </span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelect("Align the subtitle to the right")}>
                                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                                            <Bars3BottomRightIcon className="onvo-size-4" />
                                            <span>Align subtitle right</span>
                                        </span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubMenuContent>
                            </DropdownMenuSubMenu>

                        </DropdownMenuSubMenuContent>
                    </DropdownMenuSubMenu>

                    <DropdownMenuItem onClick={() => onSelect("Add a subtitle to the chart")}>
                        <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                            <Bars3CenterLeftIcon className="onvo-size-4" />
                            <span>Add a subtitle</span>
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => window.open(url && url.trim() !== "" ? url : "https://www.onvo.ai/blogs/writing-better-ai-prompts-for-dashboard-generation", "_blank")}>
                    <span className="onvo-flex onvo-items-center onvo-gap-x-2">
                        <GlobeAltIcon className="onvo-size-4" />
                        <span>Support</span>
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>);

}


export const PromptInput: React.FC<{
    className?: string;
    url?: string;
    onSubmit: (text: string) => void;
    hideSuggestions?: boolean;
}> = ({ className, onSubmit, url, hideSuggestions }) => {
    const [query, setQuery] = useState("");
    const ref = useRef<HTMLTextAreaElement>(null);
    return (
        <div onClick={() => {
            ref.current?.focus();
        }} className={"onvo-relative onvo-background-color onvo-border onvo-border-black/10 dark:onvo-border-white/10 onvo-shadow-xl onvo-z-10 onvo-p-3 onvo-cursor-text !onvo-rounded-2xl onvo-mx-auto onvo-max-w-screen-md onvo-flex onvo-w-full onvo-flex-col onvo-items-center onvo-justify-center " + (className || "")}>
            <Textarea
                className="!onvo-p-0 !onvo-outline-none focus:!onvo-outline-none focus:!onvo-border-transparent focus:!onvo-ring-0 !onvo-bg-transparent onvo-min-h-[48px] !onvo-shadow-none onvo-border-none"
                value={query}
                ref={ref}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Describe the widget you want to create...`}
                autoFocus
                onKeyUp={(evt) => {
                    if (evt.key === "Enter" && !evt.shiftKey) {
                        onSubmit(query);
                    }
                }}
            />

            <div className="onvo-mt-2 onvo-w-full onvo-flex onvo-flex-row onvo-items-center onvo-justify-between onvo-z-10">

                {hideSuggestions ? <div></div> : <SuggestionsDropdown url={url} onSelect={setQuery}>
                    <div className="onvo-cursor-pointer onvo-rounded-full onvo-h-8 onvo-px-3 onvo-border onvo-border-black/10 dark:onvo-border-white/10 onvo-foreground-color onvo-flex onvo-flex-row onvo-items-center onvo-justify-center onvo-gap-1 onvo-z-10">
                        <SparklesIcon className="onvo-h-4 onvo-w-4 onvo-text-slate-700 dark:onvo-text-slate-200" />
                        <Text>Suggestions</Text>
                    </div>
                </SuggestionsDropdown>
                }

                <ArrowUpCircleIcon
                    className="onvo-size-10 onvo-rounded-full onvo-text-black dark:onvo-text-white hover:onvo-text-gray-700 dark:hover:onvo-text-gray-200 onvo-cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (query.trim() !== "") {
                            onSubmit(query);
                        }
                    }}
                />
            </div>
        </div >)
}
