import { Card, Title } from "@tremor/react";
import React, { useMemo, useRef } from "react";
import ChartBase from "./ChartBase";

const ChartCard: React.FC<{
  editable?: boolean;
  widget: any;
  onUpdate: () => void;
  onRequestEdit: () => void;
}> = ({ widget, onUpdate, onRequestEdit, editable }) => {
  const ref = useRef<HTMLDivElement>(null);

  let output = useMemo(() => {
    if (widget && widget.cache) {
      return JSON.parse(widget.cache);
    } else {
      return undefined;
    }
  }, [widget]);

  return (
    <Card
      className="z-0 foreground-color relative flex h-full w-full flex-col"
      ref={ref}
    >
      <div className="flex w-full flex-row items-center">
        <Title className="flex-grow">{widget.title}</Title>
      </div>
      <div className="relative z-0 h-[calc(100%-30px)] w-full overflow-y-auto">
        <ChartBase json={output} key={widget.id} />
      </div>
    </Card>
  );
};

export default ChartCard;
