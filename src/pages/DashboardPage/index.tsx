import { StatCard } from "./components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ApiResponse,
  ApiResponseError,
  DashboardResponse,
  ProjectCompletionPieChart,
  ProjectCompletionTrend,
  ProjectCreationTrend,
} from "@/types";
import { getRequest } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import {
  AreaChart,
  XAxis,
  Area,
  PieChart,
  Pie,
  Bar,
  BarChart,
} from "recharts";
import { Tooltip } from "@/components/ui/tooltip";

export const Home = () => {
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

      <RenderLine trends={data?.data.project_completion_trend ?? []} />

      <div className="grid grid-cols-2 gap-2">
        <RenderReportGeneratedBar trends={data?.data.project_creation_trend ?? []} />

        <RenderPie {...data?.data.project_completion_pie_chart} />
      </div>
    </>
  );
};

const RenderLine = ({ trends }: { trends: ProjectCompletionTrend[] }) => {
  // const ref = useRef<HTMLDivElement>(null);
  const currentYearTrend = populateMissingMonths(trends)?.find?.(
    (item) => item.year === new Date().getFullYear()
  );

  const data = currentYearTrend?.data.map((item) => ({
    name: item?.month,
    count: item?.count,
  }));

  const chartConfig = {} satisfies ChartConfig;

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle className="text-sm">Project Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[10rem] max-h-[20rem] w-full"
        >
          <AreaChart accessibilityLayer data={data}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" />
            <Area
              type="monotone"
              dataKey="count"
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

const RenderReportGeneratedBar = ({ trends }: { trends: ProjectCreationTrend[] }) => {
  const currentYearTrend = populateMissingMonths(trends)?.find?.(
    (item) => item.year === new Date().getFullYear()
  );

  const chartData = currentYearTrend?.data.map((item) => ({
    month: item?.month,
    count: item?.count,
  }));

  const chartConfig = {
    count: {
      label: "Count",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card className="my-5 h-[28rem] w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Project Creation</CardTitle>
      </CardHeader>
      <CardContent className="h-[24rem]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const RenderPie = (props: Partial<ProjectCompletionPieChart>) => {
  const chartConfig = {} satisfies ChartConfig;

  const data01 = [
    { name: "Completed projects", value: props.completed_projects ?? 0 },
    { name: "Incomplete projects", value: props.incomplete_projects ?? 0 },
    { name: "Active projects", value: props.active_projects ?? 0 },
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
          <PieChart>
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

function populateMissingMonths(data: ProjectCreationTrend[]) {
  // List of all months in order
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return data.map((yearData) => {
    // Create a map of months in the current data for faster lookup
    const existingMonths = new Set(yearData.data.map((item) => item.month));

    // Populate missing months with count 0
    const fullData = allMonths.map((month) => {
      if (existingMonths.has(month)) {
        // Keep the existing month data
        return yearData.data.find((item) => item.month === month);
      } else {
        // Add the missing month with count 0
        return { month, count: 0 };
      }
    });

    return { ...yearData, data: fullData };
  });
}
