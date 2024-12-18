// import Line from "@/components/layouts/Charts/Lines";
// import Bar from "@/components/layouts/Charts/Bar";
import { StatCard } from "./components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
// import { useResizeObserver } from "usehooks-ts";
import { ApiResponse, ApiResponseError, DashboardResponse, ProjectCompletionPieChart } from "@/types";
import { getRequest } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AreaChart, XAxis, Area, PieChart, Pie } from "recharts";
import { Tooltip } from "@/components/ui/tooltip";
// import { Tooltip } from "@/components/ui/tooltip";
// import { MapList } from "@/components/layouts/MapList";

export const Home = () => {
  // const ref = useRef<HTMLDivElement>(null);

  // const { width = 0, height = 0 } = useResizeObserver({
  //   ref,
  //   box: "border-box",
  // });

  const { data } = useQuery<ApiResponse<DashboardResponse>, ApiResponseError>({
    queryKey: ["dashboard"],
    queryFn: async () => await getRequest("grants/dashboard-summary/"),
  });

  const statsData = [
    {
      title: "Total Projects",
      value: data?.data.number_of_projects ?? 0,
      description: "Number of projects created by the user",
    },
    {
      title: "Total Employees",
      value: data?.data.number_of_employees ?? 0,
      description: "Number of employees added",
    },
    {
      title: "Completed Projects",
      value: data?.data.completed_projects ?? 0,
      description: "Total proposals successfully generated",
    },
    {
      title: "Total Grant Agencies Added",
      value: data?.data.number_of_agencies_added ?? 0,
      description: "Agencies added by the user",
    },
  ];

  return (
    <>
      <section className="grid grid-cols-4 gap-2.5 items-center font-medium mt-10">
        {/* <MapList /> */}
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

        <RenderPie {...data?.data.project_completion_pie_chart} />
      </div>
    </>
  );
};

const RenderLine = () => {
  // const ref = useRef<HTMLDivElement>(null);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const chartConfig = {} satisfies ChartConfig;

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle className="text-sm">Report Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[10rem] max-h-[20rem] w-full"
        >
          <AreaChart accessibilityLayer data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <Tooltip /> */}
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const RenderReportGeneratedBar = () => {
  const ref = useRef<HTMLDivElement>(null);

  // const { width = 0, height = 0 } = useResizeObserver({
  //   ref,
  //   box: "border-box",
  // });

  return (
    <Card ref={ref} className="my-5 h-[28rem] w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Report Status</CardTitle>
      </CardHeader>
      <CardContent className="!pb-20">
        {/* <Bar {...{ height: height - 101, width: width - 58 }} /> */}
      </CardContent>
    </Card>
  );
};

const RenderPie = (props: Partial<ProjectCompletionPieChart>) => {
  const chartConfig = {} satisfies ChartConfig;

  const data01 = [
    { name: 'Completed projects', value: props.completed_projects ?? 0 },
    { name: 'Incomplete projects', value: props.incomplete_projects ?? 0 },
    { name: 'Active projects', value: props.active_projects ?? 0},
  ];

  return (
    <Card className="my-5 h-[28rem] w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Project Status</CardTitle>
      </CardHeader>
      <CardContent className="!pb-20">
        <ChartContainer
          config={chartConfig}
          className="min-h-[20rem] max-h-[60rem] w-full"
        >
          <PieChart >
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
