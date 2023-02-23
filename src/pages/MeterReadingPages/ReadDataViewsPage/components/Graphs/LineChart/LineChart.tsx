import React, { FC } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";

type PropsType = {
  xAxis: Array<string>;
  yAxis: Array<number>;
  type?: string;
};

export const LineChart: FC<PropsType> = React.memo(({ xAxis, yAxis, type }) => {
  const { selectedGraphName } = useTypedSelector((state) => state.waterIndication);

  const valueCounter = {
    waterIndication: "м3",
    consumption: type === "power" ? "кВт*ч" : "м3",
    electricityBattery: "%",
    signalIntensity: "db",
  };

  const defaultDatasets = (() => {
    return [
      {
        data: yAxis,
        backgroundColor: "rgba(78, 180, 249, 0.16)",
        borderColor: "#18A0FB",
        pointBackgroundColor: "#18A0FB",
        lineTension: 0,
        hoverBackgroundColor: "#18A0FB",
        label: valueCounter[selectedGraphName],
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              // suggestedMax: 2.2,
            },
            gridLines: {
              color: "#D7E2F2",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              // maxRotation: 0,
            },
            gridLines: {
              color: "#D7E2F2",
            },
          },
        ],
      },
    };
  })();

  return (
    <CChartLine
      labels={xAxis}
      datasets={defaultDatasets}
      options={defaultOptions}
      label="months"
      style={{ height: "250px" }}
    />
  );
});
