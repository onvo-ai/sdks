import React, { useState } from "react";
import { Card } from "../../tremor/Card";
import { Label, Title, Text } from "../../tremor/Text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../tremor/Select";
import { Input } from "../../tremor/Input";
import { Button } from "../../tremor/Button";
import { Textarea } from "../../tremor/Textarea";
import { Switch } from "../../tremor/Switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../tremor/Accordion";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

const chartTypes = [
  "line",
  "bar",
  "area",
  "metric",
  "table",
  "pie",
  "doughnut",
  "bubble",
  "polarArea",
  "radar",
  "scatter",
  "funnel",
].map((a) => ({ label: a, value: a }));

const PositionPicker: React.FC<{
  value: string;
  onValueChange: (str: string) => void;
}> = ({ value, onValueChange }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="top">Top</SelectItem>
        <SelectItem value="left">Left</SelectItem>
        <SelectItem value="bottom">Bottom</SelectItem>
        <SelectItem value="right">Right</SelectItem>
      </SelectContent>
    </Select>
  );
};

const AlignmentPicker: React.FC<{
  value: string;
  onValueChange: (str: string) => void;
}> = ({ value, onValueChange }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="center">Center</SelectItem>
        <SelectItem value="start">Start</SelectItem>
        <SelectItem value="end">End</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const WidgetWizard: React.FC<{
  onSubmit: (val: string) => void;
}> = ({ onSubmit }) => {
  const [type, setType] = useState(chartTypes[0].value);

  const [showTitle, setShowTitle] = useState(true);
  const [title, setTitle] = useState("");
  const [titlePosition, setTitlePosition] = useState("top");
  const [titleAlignment, setTitleAlignment] = useState("start");

  const [showSubtitle, setShowSubtitle] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [subtitlePosition, setSubtitlePosition] = useState("top");
  const [subtitleAlignment, setSubtitleAlignment] = useState("start");

  const [showXAxis, setShowXAxis] = useState(false);
  const [xAxis, setXAxis] = useState("");

  const [showYAxis, setShowYAxis] = useState(false);
  const [yAxis, setYAxis] = useState("");

  const [showLegend, setShowLegend] = useState(false);
  const [legendPosition, setLegendPosition] = useState("top");
  const [legendAlignment, setLegendAlignment] = useState("start");

  const [datasets, setDatasets] = useState<
    {
      title: string;
      description: string;
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[]
  >([]);
  const [datasetsEditable, setDatasetsEditable] = useState(false);

  const [additionalInformation, setAdditionalInformation] = useState("");

  const constructPrompt = () => {
    let prompt = `Create a chart of type ${type} with the output looking like the following:
\`\`\`json
{
    type: '${type}',
    data: {
        datasets: [${datasets.map(
      (d) => `{
            label: '${d.title}',
            data: [
                //${d.description}
            ],
            backgroundColor: '${d.backgroundColor}',
            borderColor: '${d.borderColor}',
            borderWidth: ${d.borderWidth},    
        }`
    )}]
    },
    options: {
        plugins: {
            title: {
                text: '${title}',
                display: ${showTitle ? "true" : "false"},
                position: '${titlePosition}',
                align: '${titleAlignment}',
            },
            subtitle: {
                text: '${subtitle}',
                display: ${showSubtitle ? "true" : "false"},
                position: '${subtitlePosition}',
                align: '${subtitleAlignment}',
            },
            legend: {
                display: ${showLegend ? "true" : "false"},
                position: '${legendPosition}',
                align: '${legendAlignment}',
            }
        },
        scales: {
            xAxis: {
                title: {
                    display: ${showXAxis ? "true" : "false"},
                    text: '${xAxis}'
                }
            },
            yAxis: {
                title: {
                    display: ${showYAxis ? "true" : "false"},
                    text: '${yAxis}'
                }
            }
        }
    }
}
\`\`\`

Additional information: ${additionalInformation}
`;
    onSubmit(prompt);
  };

  return (
    <Card className="onvo-background-color onvo-border-black/20 dark:onvo-border-white/20 !onvo-rounded-lg !onvo-p-0">
      <div className="onvo-p-4 onvo-relative onvo-flex onvo-flex-row onvo-divide-x onvo-divide-slate-200 dark:onvo-divide-slate-800 onvo-gap-4">
        <div className="onvo-w-full onvo-flex onvo-flex-col onvo-gap-2 onvo-flex-grow">
          <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
            <Label className="onvo-w-24 onvo-flex-shrink-0">Chart type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {chartTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-0">
              <AccordionTrigger>Title</AccordionTrigger>
              <AccordionContent className="onvo-flex onvo-flex-col onvo-gap-2">
                <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                  <Label className="onvo-flex-grow onvo-flex-shrink-0">
                    Show title
                  </Label>
                  <Switch
                    checked={showTitle}
                    onCheckedChange={(val) => setShowTitle(val)}
                  />
                </div>
                {showTitle && (
                  <>
                    <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                      <Label className="onvo-w-24 onvo-flex-shrink-0">
                        Chart title
                      </Label>
                      <Input onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                      <Label className="onvo-w-24 onvo-flex-shrink-0">
                        Position
                      </Label>
                      <PositionPicker
                        value={titlePosition}
                        onValueChange={setTitlePosition}
                      />
                    </div>
                    <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                      <Label className="onvo-w-24 onvo-flex-shrink-0">
                        Align
                      </Label>
                      <AlignmentPicker
                        value={titleAlignment}
                        onValueChange={setTitleAlignment}
                      />
                    </div>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>Subtitle</AccordionTrigger>
              <AccordionContent className="onvo-flex onvo-flex-col onvo-gap-2">
                <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                  <Label className="onvo-flex-grow onvo-flex-shrink-0">
                    Show subtitle
                  </Label>
                  <Switch
                    checked={showSubtitle}
                    onCheckedChange={(val) => setShowSubtitle(val)}
                  />
                </div>
                {showSubtitle && (
                  <>
                    <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                      <Label className="onvo-w-24 onvo-flex-shrink-0">
                        Chart subtitle
                      </Label>
                      <Input onChange={(e) => setSubtitle(e.target.value)} />
                    </div>

                    <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                      <Label className="onvo-w-24 onvo-flex-shrink-0">
                        Position
                      </Label>
                      <PositionPicker
                        value={subtitlePosition}
                        onValueChange={setSubtitlePosition}
                      />
                    </div>
                    <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                      <Label className="onvo-w-24 onvo-flex-shrink-0">
                        Align
                      </Label>
                      <AlignmentPicker
                        value={subtitleAlignment}
                        onValueChange={setSubtitleAlignment}
                      />
                    </div>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Axes</AccordionTrigger>
              <AccordionContent className="onvo-flex onvo-flex-col onvo-gap-2">
                <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                  <Label className="onvo-flex-grow onvo-flex-shrink-0">
                    Show x axis
                  </Label>
                  <Switch
                    checked={showXAxis}
                    onCheckedChange={(val) => setShowXAxis(val)}
                  />
                </div>
                {showXAxis && (
                  <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                    <Label className="onvo-w-24 onvo-flex-shrink-0">
                      X axis title
                    </Label>
                    <Input
                      value={xAxis}
                      onChange={(e) => setXAxis(e.target.value)}
                      placeholder="Date in DD/MM/YYYY format"
                    />
                  </div>
                )}
                <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                  <Label className="onvo-flex-grow onvo-flex-shrink-0">
                    Show y axis
                  </Label>
                  <Switch
                    checked={showYAxis}
                    onCheckedChange={(val) => setShowYAxis(val)}
                  />
                </div>
                {showYAxis && (
                  <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                    <Label className="onvo-w-24 onvo-flex-shrink-0">
                      Y axis
                    </Label>
                    <Input
                      value={yAxis}
                      onChange={(e) => setYAxis(e.target.value)}
                      placeholder="No of users"
                    />
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Legend</AccordionTrigger>
              <AccordionContent className="onvo-flex onvo-flex-col onvo-gap-2">
                <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                  <Label className="onvo-flex-grow onvo-flex-shrink-0">
                    Show legend
                  </Label>
                  <Switch
                    checked={showLegend}
                    onCheckedChange={(val) => setShowLegend(val)}
                  />
                </div>
                {showLegend && (
                  <>
                    <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                      <Label className="onvo-w-24 onvo-flex-shrink-0">
                        Position
                      </Label>
                      <PositionPicker
                        value={legendPosition}
                        onValueChange={setLegendPosition}
                      />
                    </div>
                    <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                      <Label className="onvo-w-24 onvo-flex-shrink-0">
                        Align
                      </Label>
                      <AlignmentPicker
                        value={legendAlignment}
                        onValueChange={setLegendAlignment}
                      />
                    </div>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Advanced</AccordionTrigger>
              <AccordionContent className="onvo-flex onvo-flex-col onvo-gap-2">
                <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                  <Label className="onvo-flex-grow onvo-flex-shrink-0">
                    Show points on chart
                  </Label>
                  <Switch />
                </div>

                <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                  <Label className="onvo-flex-grow onvo-flex-shrink-0">
                    Show value labels
                  </Label>
                  <Switch />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="onvo-w-full onvo-flex onvo-flex-col onvo-flex-grow onvo-pl-4 onvo-gap-2">
          <Title>Datasets</Title>
          <Text className="-onvo-mt-3">
            Describe the data to be displayed including any filters or
            aggregations
          </Text>
          <Accordion type="single" collapsible>
            {datasets.map((a, idx) => (
              <AccordionItem value={"dataset-" + (idx + 1)}>
                <AccordionTrigger>{a.title}</AccordionTrigger>
                <AccordionContent className="onvo-flex onvo-flex-col onvo-gap-2">
                  <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                    <Label className="onvo-w-24 onvo-flex-grow onvo-flex-shrink-0">
                      Title
                    </Label>

                    <Input
                      placeholder="Title"
                      value={a.title}
                      onChange={(e) => {
                        setDatasets(
                          datasets.map((a, i) => {
                            if (i === idx) {
                              return {
                                ...a,
                                title: e.target.value,
                              };
                            }
                            return a;
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                    <Label className="onvo-w-24 onvo-flex-shrink-0">
                      Description
                    </Label>
                    <Textarea
                      placeholder="Description"
                      value={a.description}
                      onChange={(e) => {
                        setDatasets(
                          datasets.map((a, i) => {
                            if (i === idx) {
                              return {
                                ...a,
                                description: e.target.value,
                              };
                            }
                            return a;
                          })
                        );
                      }}
                    />
                  </div>

                  <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                    <Label className="onvo-w-24 onvo-flex-shrink-0">
                      Background color
                    </Label>
                    <Input
                      placeholder="#ff1245"
                      value={a.backgroundColor}
                      onChange={(e) => {
                        setDatasets(
                          datasets.map((a, i) => {
                            if (i === idx) {
                              return {
                                ...a,
                                backgroundColor: e.target.value,
                              };
                            }
                            return a;
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                    <Label className="onvo-w-24 onvo-flex-shrink-0">
                      Border color
                    </Label>
                    <Input
                      placeholder="#ff0000"
                      value={a.borderColor}
                      onChange={(e) => {
                        setDatasets(
                          datasets.map((a, i) => {
                            if (i === idx) {
                              return {
                                ...a,
                                borderColor: e.target.value,
                              };
                            }
                            return a;
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="onvo-flex onvo-flex-row onvo-items-center onvo-gap-2">
                    <Label className="onvo-w-24 onvo-flex-shrink-0">
                      Border width
                    </Label>
                    <Input
                      type="number"
                      placeholder="2"
                      value={a.borderWidth}
                      onChange={(e) => {
                        setDatasets(
                          datasets.map((a, i) => {
                            if (i === idx) {
                              return {
                                ...a,
                                borderWidth: Number(e.target.value),
                              };
                            }
                            return a;
                          })
                        );
                      }}
                    />
                  </div>

                  <div className="onvo-flex onvo-flex-row onvo-items-center onvo-justify-end onvo-gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setDatasets(datasets.filter((a, i) => i !== idx));
                      }}
                    >
                      Remove datasource
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button
            variant="secondary"
            onClick={() =>
              setDatasets([
                ...datasets,
                {
                  title: "Dataset " + (datasets.length + 1),
                  description: "",
                  borderColor: "",
                  backgroundColor: "",
                  borderWidth: 2,
                },
              ])
            }
          >
            Add dataset
          </Button>
          <Title>Additional information</Title>
          <Textarea
            value={additionalInformation}
            onChange={(e) => setAdditionalInformation(e.target.value)}
          />
        </div>
      </div>
      <div className="onvo-px-4 onvo-py-2 onvo-rounded-b-md onvo-bg-black/20 dark:onvo-bg-white/20 onvo-flex onvo-flex-row onvo-justify-between onvo-items-center">
        <div className="onvo-flex onvo-flex-row onvo-gap-2 onvo-items-center">
          <InformationCircleIcon className="onvo-size-4 dark:onvo-text-slate-400" />
          <Text>
            The advanced chart builder is currently in beta and may produce
            incorrect outputs
          </Text>
        </div>
        <Button onClick={constructPrompt}>Create widget</Button>
      </div>
    </Card>
  );
};
