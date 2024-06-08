import React from "react";

export const Metric: React.FC<{ children: any; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <h3
      className={`onvo-text-3xl onvo-font-semibold onvo-text-slate-800 dark:onvo-text-slate-200 ${
        className || ""
      }`}
    >
      {children}
    </h3>
  );
};

export const Title: React.FC<{
  children: any;
  className?: string;
  onClick?: () => void;
}> = ({ children, className, onClick }) => {
  return (
    <h3
      onClick={onClick}
      className={`onvo-text-lg onvo-font-semibold onvo-text-slate-800 dark:onvo-text-slate-200 ${
        className || ""
      }`}
    >
      {children}
    </h3>
  );
};

export const Label: React.FC<{ children: any; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <label
      className={`onvo-text-sm onvo-font-semibold onvo-text-slate-500 dark:onvo-text-slate-400 ${
        className || ""
      }`}
    >
      {children}
    </label>
  );
};

export const Text: React.FC<{ children: any; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <p
      className={`onvo-text-sm onvo-text-slate-500 dark:onvo-text-slate-400 ${
        className || ""
      }`}
    >
      {children}
    </p>
  );
};
