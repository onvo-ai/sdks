import React, { useEffect, useState } from "react";
import { Card } from "../../tremor/Card";
import { Label } from "../../tremor/Text";

const ProgressBar = () => {
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
  return (
    <div className="onvo-w-full onvo-h-2 onvo-rounded-md onvo-bg-slate-200 dark:onvo-bg-slate-700">
      <div
        className="onvo-h-full onvo-transition-all onvo-duration-1000 onvo-ease-linear onvo-rounded-md onvo-bg-blue-500"
        style={{ width: progress + "%" }}
      ></div>
    </div>
  );
};

const ChartPlaceholder: React.FC<{
  className?: string;
}> = ({ className }) => (
  <Card
    className={
      "onvo-relative onvo-w-full onvo-flex onvo-flex-col onvo-min-h-72 onvo-animate-pulse " +
      className
    }
  >
    <div className="onvo-h-6 onvo-bg-slate-200 onvo-rounded-md dark:onvo-bg-slate-700 onvo-w-72 onvo-mb-2.5"></div>
    <div className="onvo-w-48 onvo-h-4 onvo-mb-10 onvo-bg-slate-200 onvo-rounded-md dark:onvo-bg-slate-700"></div>
    <div className="onvo-flex onvo-h-full onvo-w-full onvo-relative onvo-flex-grow onvo-items-baseline onvo-gap-2">
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[40%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[60%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[40%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[100%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[100%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[40%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[100%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[40%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[60%] dark:onvo-bg-slate-700"></div>
      <div className="onvo-flex-grow onvo-bg-slate-200 onvo-rounded-t-md onvo-h-[40%] dark:onvo-bg-slate-700"></div>
    </div>
    <span className="onvo-sr-only">Loading...</span>
  </Card>
);

export const ChartLoader: React.FC<{
  className?: string;
  variant: "message" | "card";
}> = ({ variant, className }) => {
  if (variant === "card") {
    return <ChartPlaceholder className={className} />;
  }


  return (
    <div className="onvo-loader-question-modal onvo-relative onvo-flex onvo-flex-row onvo-gap-3 onvo-items-start onvo-justify-start onvo-w-full">
      <div className="onvo-w-full onvo-flex onvo-flex-col onvo-gap-2">
        <Label className="onvo-mt-2">
          ✨ Auto-magically generating your widget...
        </Label>
        <ProgressBar />
        <ChartPlaceholder className="onvo-h-72" />
      </div>
    </div>
  );
};
