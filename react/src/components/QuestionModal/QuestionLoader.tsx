import { useEffect, useState } from "react";
import Logo from "./Logo";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Card } from "../../tremor/Card";
import { Icon } from "../../tremor/Icon";
import { Text } from "../../tremor/Text";

const Loader: React.FC<{}> = ({}) => {
  return (
    <div className="onvo-loader-question-modal-content" role="status">
      <svg
        aria-hidden="true"
        className="onvo-w-6 onvo-h-6 onvo-mr-2 onvo-text-gray-200 onvo-animate-spin dark:onvo-text-gray-600 onvo-fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="onvo-sr-only">Loading...</span>
    </div>
  );
};

const QuestionLoader: React.FC<{}> = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 6) return;
    let timeout = setTimeout(() => {
      setState((s) => s + 1);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const states = [
    "Analyzing required datasources",
    "Loading required datasources",
    "Writing code to answer question",
    "Testing code",
    "Executing code",
    "Rendering result",
    "Generating insights",
  ];

  return (
    <div className="onvo-loader-question-modal onvo-relative onvo-flex onvo-flex-col onvo-items-start onvo-justify-start onvo-gap-3">
      <div className="onvo-flex onvo-flex-row onvo-gap-3 onvo-items-start onvo-justify-start">
        <Icon
          variant="shadow"
          icon={() => <Logo height={20} width={20} />}
          size="sm"
        />
        <div className="onvo-flex-grow onvo-flex onvo-flex-col onvo-gap-2 onvo-pt-1">
          {states.slice(0, state + 1).map((a, i) => (
            <div
              className="onvo-flex onvo-flex-row onvo-items-center"
              key={"state-" + i}
            >
              {state === i ? (
                <Loader />
              ) : (
                <CheckCircleIcon className="onvo-h-6 onvo-w-6 onvo-mr-2 onvo-text-green-500" />
              )}
              <Text>{a}</Text>
            </div>
          ))}
        </div>
      </div>
      <Card className="onvo-animate-pulse">
        <div className="onvo-h-2.5 onvo-bg-gray-200 onvo-rounded-full dark:onvo-bg-slate-700 onvo-w-32 onvo-mb-2.5"></div>
        <div className="onvo-w-48 onvo-h-2 onvo-mb-10 onvo-bg-slate-200 onvo-rounded-full dark:onvo-bg-slate-700"></div>
        <div className="onvo-flex onvo-items-baseline onvo-mt-4">
          <div className="onvo-w-full onvo-bg-slate-200 onvo-rounded-t-lg onvo-h-72 dark:onvo-bg-slate-700"></div>
          <div className="onvo-w-full onvo-h-56 onvo-ms-6 onvo-bg-slate-200 onvo-rounded-t-lg dark:onvo-bg-slate-700"></div>
          <div className="onvo-w-full onvo-bg-slate-200 onvo-rounded-t-lg onvo-h-72 onvo-ms-6 dark:onvo-bg-slate-700"></div>
          <div className="w-full h-64 onvo-ms-6 onvo-bg-slate-200 onvo-rounded-t-lg dark:onvo-bg-slate-700"></div>
          <div className="onvo-w-full onvo-bg-slate-200 onvo-rounded-t-lg onvo-h-80 onvo-ms-6 dark:onvo-bg-slate-700"></div>
          <div className="onvo-w-full onvo-bg-slate-200 onvo-rounded-t-lg onvo-h-72 onvo-ms-6 dark:onvo-bg-slate-700"></div>
          <div className="onvo-w-full onvo-bg-slate-200 onvo-rounded-t-lg onvo-h-80 onvo-ms-6 dark:onvo-bg-slate-700"></div>
          <div className="onvo-w-full onvo-bg-slate-200 onvo-rounded-t-lg onvo-h-72 onvo-ms-6 dark:onvo-bg-slate-700"></div>
          <div className="onvo-w-full onvo-h-56 onvo-ms-6 onvo-bg-slate-200 onvo-rounded-t-lg dark:onvo-bg-slate-700"></div>
          <div className="onvo-w-full onvo-bg-slate-200 onvo-rounded-t-lg onvo-h-72 onvo-ms-6 dark:onvo-bg-slate-700"></div>
        </div>
        <span className="onvo-sr-only">Loading...</span>
      </Card>
    </div>
  );
};

export default QuestionLoader;
