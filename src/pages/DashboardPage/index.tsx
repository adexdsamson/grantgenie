import Line from "@/components/layouts/Charts/Lines";
import Bar from "@/components/layouts/Charts/Bar";
import { StatCard } from "./components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

const statsData = [
  {
    title: "Total Projects",
    value: 1489,
    description: "Number of projects created by the user",
  },
  {
    title: "Active Projects",
    value: 1400,
    description: "Projects currently being worked on",
  },
  {
    title: "Completed Projects",
    value: 149,
    description: "Total proposals successfully generated",
  },
  {
    title: "Total Grant Agencies Added",
    value: 14,
    description: "Agencies added by the user",
  },
];

export const Home = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { width = 0, height = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  console.log({ width });

  return (
    <>
      <section className="grid grid-cols-4 gap-2.5 items-center font-medium mt-10">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </section>

      <RenderLine />

      <div className="grid grid-cols-2 gap-2">
        <RenderReportGeneratedBar />

        <Card ref={ref} className="mt-5 h-[28rem] w-full">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm">Report Status</CardTitle>
          </CardHeader>
          <CardContent className="!pb-20">
            <Line {...{ height: height - 101, width: width - 58 }} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const RenderLine = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { width = 0, height = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  return (
    <Card ref={ref} className="mt-5 h-[28rem] w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Report Status</CardTitle>
      </CardHeader>
      <CardContent className="!pb-20">
        <Line {...{ height: height - 101, width: width - 58 }} />
      </CardContent>
    </Card>
  );
};

const RenderReportGeneratedBar = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { width = 0, height = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  return (
    <Card ref={ref} className="mt-5 h-[28rem] w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Report Status</CardTitle>
      </CardHeader>
      <CardContent className="!pb-20">
        <Bar {...{ height: height - 101, width: width - 58 }} />
      </CardContent>
    </Card>
  );
};
