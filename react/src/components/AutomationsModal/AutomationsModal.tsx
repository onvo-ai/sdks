import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { Icon } from "../../tremor/Icon";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Label, Text, Title } from "../../tremor/Text";
import { useDashboard } from "../../layouts/Dashboard/useDashboard";
import { Card } from "../../tremor/Card";
import { Button } from "../../tremor/Button";
import { useBackend } from "../../layouts";
import { Automation, AutomationRun } from "@onvo-ai/js";
import { SearchSelect } from "../../tremor/SearchSelect";
import { CronInput } from "../../tremor/CronInput";
import { Input } from "../../tremor/Input";
import { Textarea } from "../../tremor/Textarea";
import cronstrue from "cronstrue";
import { Timezones } from "./timezones";
import { Switch } from "../../tremor/Switch";
import { DocumentIcon, PhotoIcon, PresentationChartBarIcon, TableCellsIcon, BoltIcon } from "@heroicons/react/24/solid";
import { EmailInput } from "../../tremor/EmailInput";
import { Empty } from "../Empty";
import { AtSymbolIcon, BoltSlashIcon, CalendarIcon, ClockIcon } from "@heroicons/react/20/solid";
import { getSchedule, stringToArray } from "cron-converter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { toast } from "sonner";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const useAutomationsModal = create<{
    open: boolean;
    setOpen: (
        open: boolean,
    ) => void;
}>((set) => ({
    open: false,
    setOpen: (
        op: boolean,
    ) => set({ open: op }),
}));

export const AutomationsModal: React.FC<{
}> = () => {
    const { open, setOpen } = useAutomationsModal();
    const { dashboard } = useDashboard();
    const { backend, account, embedUser } = useBackend();

    const [automations, setAutomations] = useState<Automation[]>([]);
    const [selectedAutomation, setSelectedAutomation] = useState<Automation>();
    const [automationRuns, setAutomationRuns] = useState<AutomationRun[]>([]);

    useEffect(() => {
        if (open && dashboard) {
            getAllAutomations();
        }
    }, [open, dashboard]);

    const getAllAutomations = async () => {
        if (!backend || !dashboard) return;
        const response = await backend.automations.list({
            dashboard: dashboard?.id,
        });
        setAutomations(response);
        if (response.length > 0 && !selectedAutomation?.id) {
            setSelectedAutomation(response[0]);
        }
    }

    useEffect(() => {
        if (!selectedAutomation) return;
        getAutomationRuns(selectedAutomation.id);
    }, [selectedAutomation]);

    const createAutomation = async () => {
        toast.promise(async () => {
            let newAutomation = await backend?.automations.create({
                title: "Automation " + (automations.length + 1),
                description: "",
                dashboard: dashboard?.id,
                schedule: "",
                enabled: false,
                output_format: "pdf",
                method: "email",
                email_body: "Hello!<br /><br/>Here is your automated email from Onvo AI.",
                email_subject: "",
                email_cc: [],
                email_to: account?.email || embedUser?.email,
                timezone: dayjs.tz.guess().replace("Calcutta", "Kolkata")
            });
            await getAllAutomations();
            return newAutomation;
        }, {
            loading: "Creating automation...",
            success: (newAutomation) => {
                setSelectedAutomation(newAutomation);
                return "Automation created"
            },
            error: (e: any) => {
                return "Error creating automation: " + e.message
            }
        })

    }

    const getAutomationRuns = async (id: string) => {
        if (!backend) return;
        const runs = await backend.automation(id).getRuns();
        setAutomationRuns(runs || []);
    }

    const updateAutomation = async () => {
        if (!backend) return;
        if (!selectedAutomation) return;

        const arr = stringToArray(selectedAutomation.schedule);
        let sch = getSchedule(arr, new Date(), selectedAutomation.timezone);
        let next_run_at = sch.next().toISO();

        toast.promise(() => {
            return backend.automations.update(selectedAutomation.id, {
                title: selectedAutomation.title,
                description: selectedAutomation.description,
                schedule: selectedAutomation.schedule,
                enabled: selectedAutomation.enabled,
                output_format: selectedAutomation.output_format,
                email_body: selectedAutomation.email_body,
                email_subject: selectedAutomation.email_subject,
                email_cc: selectedAutomation.email_cc || [],
                timezone: selectedAutomation.timezone,
                next_run_at: next_run_at,
            })
        }, {
            loading: "Updating automation...",
            success: () => {
                getAllAutomations();
                return "Automation updated"
            },
            error: (e: any) => {
                return "Error updating automation: " + e.message
            }
        });
    }

    const updateSelectedAutomation = (update: Partial<Automation>) => {
        // @ts-ignore
        setSelectedAutomation(a => ({
            ...a, ...update
        }));
    }

    return (<>
        <dialog open={open}>
            <div
                className={twMerge(
                    "onvo-@container/widgetmodal onvo-h-full onvo-animate-dialogOpen onvo-w-full onvo-z-[9999] onvo-fixed onvo-left-0 onvo-top-0 onvo-foreground-color"
                )}
            >
                <div
                    className={
                        "onvo-foreground-color onvo-w-full onvo-left-0 onvo-top-0 onvo-z-10 onvo-flex onvo-flex-row onvo-justify-start onvo-items-center onvo-gap-4 onvo-border-solid onvo-border-b onvo-border-black/10 onvo-p-2 dark:onvo-border-white/10"
                    }
                >
                    <Icon
                        icon={ChevronLeftIcon}
                        variant="shadow"
                        className="onvo-ml-2 onvo-background-color onvo-border-solid onvo-border onvo-border-black/10 dark:onvo-border-white/10"
                        onClick={() => setOpen(false)}
                    />

                    <div className="onvo-flex onvo-flex-row onvo-w-full onvo-gap-1 onvo-flex-grow onvo-justify-start onvo-items-center">
                        <Text className="onvo-hidden @xl/widgetmodal:onvo-block">
                            {dashboard?.title}
                        </Text>
                        <ChevronRightIcon className="onvo-hidden @xl/widgetmodal:onvo-block onvo-h-4 onvo-w-4 dark:onvo-fill-slate-500" />
                        <Label>
                            Schedule report
                        </Label>
                        <div className="onvo-flex-grow onvo-h-2" />
                        <Button variant="secondary" onClick={createAutomation}>+ New automation</Button>
                    </div>
                </div>
                {automations.length > 0 ? (
                    <div className="onvo-relative onvo-flex onvo-flex-grow onvo-h-[calc(100%-52px)]  onvo-w-full onvo-flex-col-reverse @xl/widgetmodal:onvo-flex-row">
                        <div className="onvo-w-72 onvo-h-full onvo-foreground-color dark:onvo-bg-slate-950 onvo-divide-y onvo-divide-black/10 dark:onvo-divide-white/20 onvo-border-solid onvo-border-r onvo-border-black/10 dark:onvo-border-white/10">
                            {automations.map(a => (
                                <div key={a.id} className={"onvo-py-2 onvo-px-3 onvo-cursor-pointer " + (selectedAutomation?.id === a.id ? "onvo-bg-black/10 dark:onvo-bg-white/10" : "")} onClick={() => {
                                    setSelectedAutomation(a);
                                }}>
                                    <Text className="onvo-font-semibold">{a.title}</Text>
                                    <Text className="!onvo-text-xs onvo-mt-1"> {a.schedule.trim() === "" ? "Automation not setup" : cronstrue.toString(a.schedule, { verbose: true })}</Text>
                                </div>
                            ))}
                        </div>
                        <div className="onvo-flex-grow onvo-h-full onvo-flex onvo-flex-col">
                            <div className="onvo-w-full onvo-p-2 onvo-flex onvo-flex-row onvo-items-center onvo-gap-2 onvo-border-solid onvo-border-b onvo-border-black/10 dark:onvo-border-white/10">
                                <Text className="onvo-font-semibold onvo-mr-2">Title</Text>
                                <Input
                                    value={selectedAutomation?.title || ""}
                                    onChange={(e) => updateSelectedAutomation({ title: e.target.value })}
                                />
                                <div className="onvo-flex onvo-items-center onvo-justify-between onvo-gap-3 onvo-rounded-md onvo-py-1.5 onvo-px-2 onvo-border-solid onvo-border dark:onvo-border-slate-700">
                                    <Switch
                                        size="small"
                                        checked={selectedAutomation?.enabled}
                                        onCheckedChange={(val) => updateSelectedAutomation({ enabled: val })}
                                    />
                                    <Label>Enabled</Label>
                                </div>
                                <Button onClick={updateAutomation}>Save</Button>
                            </div>
                            <div className="onvo-background-color onvo-overflow-y-auto onvo-scrollbar-thin onvo-flex-grow dark:onvo-bg-dot-white/[0.2] onvo-p-8 onvo-bg-dot-black/[0.2] onvo-flex onvo-flex-col onvo-justify-start onvo-items-center">
                                <Card className="onvo-foreground-color onvo-max-w-screen-md !onvo-p-0">
                                    <div className="onvo-background-color onvo-px-4 onvo-py-2 onvo-border-solid onvo-border-b onvo-rounded-t-md onvo-border-black/10 dark:onvo-border-white/10 onvo-flex onvo-flex-row onvo-items-center onvo-gap-3">
                                        <Icon variant="shadow" size="sm" icon={ClockIcon} />

                                        <Title>When</Title>
                                    </div>
                                    <div className="onvo-p-4">
                                        <div className="onvo-flex onvo-flex-row onvo-items-centeronvo- mt-2">
                                            <CronInput
                                                value={selectedAutomation?.schedule || ""}
                                                onValueChange={(val) => updateSelectedAutomation({ schedule: val })}
                                            />
                                        </div>
                                        <div className="onvo-flex onvo-flex-row onvo-items-center onvo-mt-2">
                                            <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-text-sm onvo-font-semibold">
                                                Timezone
                                            </Text>
                                            <div className="onvo-flex onvo-flex-grow onvo-flex-row onvo-justify-start">
                                                <SearchSelect
                                                    value={selectedAutomation?.timezone}
                                                    onValueChange={(val) => {
                                                        updateSelectedAutomation({ timezone: val })
                                                    }}
                                                    items={Timezones}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <div className="onvo-z-10 onvo-relative onvo-h-8 onvo-w-full onvo-flex onvo-justify-center">
                                    <div className="-onvo-top-1.5 onvo-absolute onvo-size-3 onvo-bg-slate-200 dark:onvo-bg-slate-700 onvo-left-[50%] -onvo-ml-1.5 onvo-rounded-full onvo-border-2 onvo-border-slate-300 dark:onvo-border-slate-800" />
                                    <div className="onvo-h-8 onvo-w-[2px] onvo-bg-slate-300 dark:onvo-bg-slate-800" />
                                    <div className="-onvo-bottom-1.5 onvo-absolute onvo-size-3 onvo-bg-slate-200 dark:onvo-bg-slate-700 onvo-left-[50%] -onvo-ml-1.5 onvo-rounded-full onvo-border-2 onvo-border-slate-300 dark:onvo-border-slate-800" />
                                </div>
                                <Card className="onvo-foreground-color onvo-max-w-screen-md !onvo-p-0">
                                    <div className="onvo-background-color onvo-px-4 onvo-py-2 onvo-border-solid onvo-border-b onvo-rounded-t-md onvo-border-black/10 dark:onvo-border-white/10 onvo-flex onvo-flex-row onvo-items-center onvo-gap-3">
                                        <Icon variant="shadow" size="sm" icon={AtSymbolIcon} />
                                        <Title>Email configuration</Title>
                                    </div>
                                    <div className="onvo-p-4">
                                        <div className="onvo-flex onvo-flex-row onvo-items-center onvo-mt-2">
                                            <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-text-sm onvo-font-semibold">
                                                Subject
                                            </Text>
                                            <Input
                                                value={selectedAutomation?.email_subject}
                                                onChange={(e) => updateSelectedAutomation({ email_subject: e.target.value })}
                                                placeholder="Automated email from Onvo AI" />
                                        </div>
                                        <div className="onvo-flex onvo-flex-row onvo-items-center onvo-mt-2">
                                            <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-text-sm onvo-font-semibold">
                                                To
                                            </Text>
                                            <Input value={selectedAutomation?.email_to || ""} disabled />
                                        </div>
                                        <div className="onvo-flex onvo-flex-row onvo-items-center onvo-mt-2">
                                            <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-text-sm onvo-font-semibold">
                                                CC
                                            </Text>
                                            <EmailInput placeholder="Email IDs" value={selectedAutomation?.email_cc || []} onValueChange={(val) => {
                                                updateSelectedAutomation({ email_cc: val })
                                            }} />
                                        </div>

                                        <div className="onvo-flex onvo-flex-row onvo-items-center onvo-mt-2">
                                            <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-text-sm onvo-font-semibold">
                                                Body
                                            </Text>
                                            <Textarea value={selectedAutomation?.email_body}
                                                onChange={(e) => updateSelectedAutomation({ email_body: e.target.value })}
                                                placeholder="Hello {{name}}, &#10;Here is your automated email from Onvo AI" />
                                        </div>

                                        <div className="onvo-flex onvo-flex-row onvo-items-center onvo-mt-2">
                                            <Text className="onvo-w-24 onvo-flex-shrink-0 onvo-text-sm onvo-font-semibold">
                                                Attachment
                                            </Text>
                                            <div className="onvo-flex onvo-flex-row onvo-gap-4 onvo-w-full">
                                                {[{
                                                    title: "PDF", icon: DocumentIcon, id: "pdf"
                                                }, {
                                                    title: "Powerpoint", icon: PresentationChartBarIcon, id: "pptx"
                                                }, {
                                                    title: "Excel", icon: TableCellsIcon, id: "xlsx"
                                                }, {
                                                    title: "CSV", icon: TableCellsIcon, id: "csv"
                                                }, {
                                                    title: "Image", icon: PhotoIcon, id: "png"
                                                }].map(format => (
                                                    <Card key={format.id} onClick={() => {
                                                        updateSelectedAutomation({ output_format: format.id })
                                                    }} className={"onvo-cursor-pointer onvo-flex-grow !onvo-px-0 !onvo-py-2 onvo-flex onvo-flex-col onvo-justify-center onvo-items-center " + (selectedAutomation?.output_format === format.id ? "!onvo-border-blue-500 !onvo-shadow-blue-500 !onvo-text-blue-500" : "dark:onvo-text-slate-400")}>
                                                        <format.icon className="onvo-size-8 onvo-mb-1" />
                                                        <Text className="!onvo-text-inherit">{format.title}</Text>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <div className="onvo-z-10 onvo-relative onvo-h-8 onvo-w-full onvo-flex onvo-justify-center">
                                    <div className="-onvo-top-1.5 onvo-absolute onvo-size-3 onvo-bg-slate-200 dark:onvo-bg-slate-700 onvo-left-[50%] -onvo-ml-1.5 onvo-rounded-full onvo-border-2 onvo-border-slate-300 dark:onvo-border-slate-800" />
                                    <div className="onvo-h-8 onvo-w-[2px] onvo-bg-slate-300 dark:onvo-bg-slate-800" />
                                    <div className="-onvo-bottom-1.5 onvo-absolute onvo-size-3 onvo-bg-slate-200 dark:onvo-bg-slate-700 onvo-left-[50%] -onvo-ml-1.5 onvo-rounded-full onvo-border-2 onvo-border-slate-300 dark:onvo-border-slate-800" />
                                </div>
                                <Card className="onvo-foreground-color onvo-max-w-screen-md !onvo-p-0 onvo-mb-8">
                                    <div className="onvo-px-4 onvo-background-color onvo-py-2 onvo-border-solid onvo-border-b onvo-rounded-t-md onvo-border-black/10 dark:onvo-border-white/10 onvo-flex onvo-flex-row onvo-items-center onvo-gap-3">
                                        <Icon variant="shadow" size="sm" icon={CalendarIcon} />
                                        <Title>History</Title></div>
                                    <div className="onvo-p-4">
                                        {automationRuns.length === 0 ? (
                                            <Empty title="This automation has not been run yet." direction="column" subtitle="You will be able to see the status of each automation run once it has been executed at least once" icon={<BoltSlashIcon className="onvo-size-8" />} />
                                        ) : (<div className="onvo-flex onvo-flex-col onvo-gap-2 onvo-mt-2">
                                            {
                                                automationRuns.map((a) => (
                                                    <div
                                                        key={a.id}
                                                        className="onvo-border-solid onvo-border onvo-flex onvo-flex-row onvo-items-center onvo-gap-2 onvo-px-2 onvo-py-2 onvo-shadow-sm onvo-rounded-md dark:onvo-border-slate-700"
                                                    >
                                                        {a.status === "success" ? (
                                                            <div className="onvo-size-2 onvo-rounded-full onvo-bg-green-300 dark:onvo-bg-green-600" />
                                                        ) : (
                                                            <div className="onvo-size-2 onvo-rounded-full onvo-bg-red-300 dark:onvo-bg-red-600" />
                                                        )}

                                                        <div className="onvo-flex-grow">
                                                            <Text className="onvo-text-xs onvo-flex-shrink-0">
                                                                {`${dayjs(new Date(a.run_at)).fromNow()} - ${(a.recipient_emails || []).length
                                                                    } emails ${a.status === "success" ? "sent" : "not sent"}`}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                ))
                                            }</div>)}</div>
                                </Card>
                            </div></div>
                    </div>) : (<div className="onvo-relative onvo-flex onvo-flex-grow onvo-h-[calc(100%-52px)] onvo-w-full onvo-flex-col-reverse @xl/widgetmodal:onvo-flex-row">
                        <div className="onvo-background-color onvo-flex-grow dark:onvo-bg-dot-white/[0.2] onvo-p-8 onvo-bg-dot-black/[0.2] onvo-flex onvo-flex-col onvo-justify-start onvo-items-center">
                            <Card className="onvo-foreground-color onvo-max-w-screen-md">
                                <Empty title="No automations created yet" direction="column" subtitle="Automations let you send out your dashboards as a report as an email at a specified schedule" icon={<BoltIcon className="onvo-size-8" />} button={<Button onClick={createAutomation}>Create your first automation</Button>} />
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    </>)
}