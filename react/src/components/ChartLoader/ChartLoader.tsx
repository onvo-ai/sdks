import { Logo } from "../Logo";
import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import { Label } from "../../tremor/Text";

export const ChartLoader: React.FC<{ logo: string }> = ({ logo }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 99) {
          clearInterval(interval);
          return 99;
        }
        if (prevProgress >= 80) {
          return Math.min(100, prevProgress + 1);
        }
        if (prevProgress >= 60) {
          return Math.min(100, prevProgress + 2);
        }
        if (prevProgress >= 40) {
          return Math.min(100, prevProgress + 3);
        }
        return prevProgress + 4;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const LogoIcon = useMemo(() => {
    return logo && logo.trim() !== "" ? (
      <Icon
        variant="shadow"
        className="!onvo-p-0"
        icon={() => (
          <img
            src={logo}
            className="onvo-object-contain onvo-rounded-md onvo-h-[32px] onvo-w-[32px]"
          />
        )}
      />
    ) : (
      <Icon variant="shadow" icon={() => <Logo height={20} width={20} />} />
    );
  }, [logo]);

  return (
    <div className="onvo-loader-question-modal onvo-relative onvo-flex onvo-flex-row onvo-gap-3 onvo-items-start onvo-justify-start onvo-w-full">
      {LogoIcon}
      <div className="onvo-w-full onvo-flex onvo-flex-col onvo-gap-2">
        <Label className="onvo-mt-2">
          ✨ Auto-magically generating your chart...
        </Label>
        <div className="onvo-w-full onvo-h-2 onvo-rounded-md onvo-bg-slate-200 dark:onvo-bg-slate-700">
          <div
            className="onvo-h-full onvo-transition-all onvo-duration-1000 onvo-ease-linear onvo-rounded-md onvo-bg-blue-500"
            style={{ width: progress + "%" }}
          ></div>
        </div>
        <Card className=" onvo-animate-pulse">
          <div className="onvo-h-6 onvo-bg-slate-200 onvo-rounded-md dark:onvo-bg-slate-700 onvo-w-72 onvo-mb-2.5"></div>
          <div className="onvo-w-48 onvo-h-4 onvo-mb-10 onvo-bg-slate-200 onvo-rounded-md dark:onvo-bg-slate-700"></div>
          <div className="onvo-flex onvo-items-baseline onvo-mt-4 onvo-gap-2">
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-32 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-48 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-32 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-64 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-64 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-32 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-64 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-32 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-48 dark:onvo-bg-slate-700"></div>
            <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-32 dark:onvo-bg-slate-700"></div>
          </div>
          <span className="onvo-sr-only">Loading...</span>
        </Card>
      </div>
    </div>
  );
};
