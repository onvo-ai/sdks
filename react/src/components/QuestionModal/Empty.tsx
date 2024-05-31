import { Text, Title } from "../../tremor/Text";
import React from "react";

const Empty: React.FC<{
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
        "onvo-empty-question-modal flex gap-6 items-center p-6 " +
        (direction === "row" ? "flex-row" : "flex-col text-center")
      }
    >
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-100">
          {icon}
        </div>
      )}
      {video && (
        <video
          src={video}
          className="max-w-xl rounded-lg shadow-xl"
          muted
          autoPlay
          loop
          controls={false}
        ></video>
      )}
      <div>
        <Title className="onvo-empty-question-modal-title mb-1 text-lg font-bold">
          {title}
        </Title>
        <Text className="onvo-empty-question-modal-subtitle mb-4 max-w-lg">
          {subtitle}
        </Text>
        {button}
      </div>
    </div>
  );
};

export default Empty;
