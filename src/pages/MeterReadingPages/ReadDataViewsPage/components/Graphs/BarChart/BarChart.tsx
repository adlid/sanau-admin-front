import React, { FC } from "react";
import { CChartBar } from "@coreui/react-chartjs";
import { useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";

type PropsType = {
  xAxis: Array<string>;
  yAxis: Array<number>;
  type?: string;
};

export const BarChart: FC<PropsType> = React.memo(({ xAxis, yAxis, type }) => {
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
        backgroundColor: "#253D51",
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
            },
            gridLines: {
              color: "#D7E2F2",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              // maxRotation: 0.5,
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
    <CChartBar
      labels={xAxis}
      datasets={defaultDatasets}
      options={defaultOptions}
      label="months"
      style={{ height: "250px" }}
    />
  );
});
