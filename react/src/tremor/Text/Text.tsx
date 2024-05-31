import React from "react";

export const Metric: React.FC<{ children: any; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <h3
      className={`text-3xl font-semibold text-slate-800 dark:text-slate-200 ${
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
      className={`text-lg font-semibold text-slate-800 dark:text-slate-200 ${
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
      className={`text-sm font-semibold text-slate-500 dark:text-slate-400 ${
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
      className={`text-sm text-slate-500 dark:text-slate-400 ${
        className || ""
      }`}
    >
      {children}
    </p>
  );
};
