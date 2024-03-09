import { Card } from "@tremor/react";
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
      key={widget.id}
      className="group foreground-color relative flex h-full w-full flex-col -z-[1] py-3"
      ref={ref}
    >
      <ChartBase json={output} title={widget.title} id={widget.id} />
    </Card>
  );
};

export default ChartCard;
