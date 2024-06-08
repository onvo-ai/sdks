import { Text, Title } from "../../tremor/Text";
import React from "react";

export const Empty: React.FC<{
  icon?: any;
  video?: string;
  title: string;
  subtitle: string;
  button?: any;
  direction?: "row" | "column";
}> = ({ icon, title, subtitle, direction = "column", button, video }) => {
  return (
    <div
      className={
        "onvo-empty-question-modal onvo-flex onvo-gap-6 onvo-items-center onvo-p-6 " +
        (direction === "row"
          ? "onvo-flex-row"
          : "onvo-flex-col onvo-text-center")
      }
    >
      {icon && (
        <div className="onvo-flex onvo-h-16 onvo-w-16 onvo-items-center onvo-justify-center onvo-rounded-full onvo-bg-gray-100 onvo-text-gray-600 dark:onvo-bg-gray-700 dark:onvo-text-gray-100">
          {icon}
        </div>
      )}
      {video && (
        <video
          src={video}
          className="onvo-max-w-xl onvo-rounded-lg onvo-shadow-xl"
          muted
          autoPlay
          loop
          controls={false}
        ></video>
      )}
      <div>
        <Title className="onvo-empty-question-modal-title onvo-mb-1 onvo-text-lg onvo-font-bold">
          {title}
        </Title>
        <Text className="onvo-empty-question-modal-subtitle onvo-mb-4 onvo-max-w-lg">
          {subtitle}
        </Text>
        {button}
      </div>
    </div>
  );
};
