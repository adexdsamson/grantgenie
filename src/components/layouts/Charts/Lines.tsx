import ResizableBox from "../Resizable";
import useDemoConfig from "@/hooks/useChartConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

type LinesProp = {
    width?: number,
    height?: number,
}

export default function Line(props: LinesProp) {
  const { data } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <>
      <br />
      <ResizableBox resizable={false}  height={props.height} width={props.width}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}
