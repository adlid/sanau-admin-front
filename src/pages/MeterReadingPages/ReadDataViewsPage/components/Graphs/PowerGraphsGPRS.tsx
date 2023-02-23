import { FC, memo, useEffect, useState } from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";

import {
  filteredGPRSList, getXaxisValuesGPRSNew,
  getYaxisValuesGPRSNew
} from "../../../../../store/selects/powerIndication.selector";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";

import {
  getGraphSerialNumber, getSelectedGraphNameGPRS, getSelectedGraphNamePhase, setCurrentGPRSItemDeviceName
} from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.slices";

export const PowerGraphsGPRS: FC = memo(() => {
  const [isBarChart, setIsBarChart] = useState(true);
  const dispatch = useAppDispatch();

  const { GPRSGraphDataNew } = useTypedSelector((state) => state.powerIndication)

  const xAxisNew = useTypedSelector(getXaxisValuesGPRSNew);
  const yAxisNew = useTypedSelector(getYaxisValuesGPRSNew);

  const deviceIds = useTypedSelector(filteredGPRSList);
  const { selectedGraphNameGPRS, selectedGraphPhase } = useTypedSelector((state) => state.powerIndication);

  const { currentGPRSItemDeviceName } = useTypedSelector((state) => state.powerIndication);

  useEffect(() => {
    if (deviceIds.length > 0) {
      dispatch(getGraphSerialNumber(deviceIds[0].toString()));
    }
  }, [deviceIds]);

  return (
    <div className="meters-graph">
      <div className="d-flex justify-content-between">
        <Select
          className="meters-graph__select"
          value={currentGPRSItemDeviceName}
          onChange={(e) => dispatch(setCurrentGPRSItemDeviceName(e.target.value as string))}
          displayEmpty={true}
          MenuProps={{
            disableScrollLock: false,
            anchorOrigin: { vertical: 10, horizontal: -13 },
            transformOrigin: { vertical: "top", horizontal: "left" },
            getContentAnchorEl: null,
          }}
        >
          {GPRSGraphDataNew && GPRSGraphDataNew.map((item, idx) => {
            return (
              <MenuItem key={idx} value={item?.deviceName}>
                Прибор учета № {item.deviceName}
              </MenuItem>
            );
          })}
        </Select>

        <div className="d-flex align-items-center">
          <div className="d-flex">
            <svg
              onClick={() => setIsBarChart(true)}
              className="meters-graph__icon"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.71429 15.7143H1.57143V20.4286H4.71429V15.7143ZM12.5714 9.42857H9.42857V20.4286H12.5714V9.42857ZM20.4286 1.57143H17.2857V20.4286H20.4286V1.57143ZM17.2857 0C16.8689 0 16.4692 0.165561 16.1745 0.460261C15.8798 0.754961 15.7143 1.15466 15.7143 1.57143V20.4286C15.7143 20.8453 15.8798 21.245 16.1745 21.5397C16.4692 21.8344 16.8689 22 17.2857 22H20.4286C20.8453 22 21.245 21.8344 21.5397 21.5397C21.8344 21.245 22 20.8453 22 20.4286V1.57143C22 1.15466 21.8344 0.754961 21.5397 0.460261C21.245 0.165561 20.8453 0 20.4286 0H17.2857ZM7.85714 9.42857C7.85714 9.0118 8.0227 8.6121 8.3174 8.3174C8.6121 8.0227 9.0118 7.85714 9.42857 7.85714H12.5714C12.9882 7.85714 13.3879 8.0227 13.6826 8.3174C13.9773 8.6121 14.1429 9.0118 14.1429 9.42857V20.4286C14.1429 20.8453 13.9773 21.245 13.6826 21.5397C13.3879 21.8344 12.9882 22 12.5714 22H9.42857C9.0118 22 8.6121 21.8344 8.3174 21.5397C8.0227 21.245 7.85714 20.8453 7.85714 20.4286V9.42857ZM0 15.7143C0 15.2975 0.165561 14.8978 0.460261 14.6031C0.754961 14.3084 1.15466 14.1429 1.57143 14.1429H4.71429C5.13105 14.1429 5.53075 14.3084 5.82545 14.6031C6.12015 14.8978 6.28571 15.2975 6.28571 15.7143V20.4286C6.28571 20.8453 6.12015 21.245 5.82545 21.5397C5.53075 21.8344 5.13105 22 4.71429 22H1.57143C1.15466 22 0.754961 21.8344 0.460261 21.5397C0.165561 21.245 0 20.8453 0 20.4286V15.7143Z"
                fill={isBarChart ? "#253D51" : "#8A93A2"}
              />
            </svg>

            <div className="mr25px"></div>
            <svg
              onClick={() => setIsBarChart(false)}
              className="meters-graph__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 15.4L8 3L12.6552 18L15.5 10.5L17.4828 15.4H23"
                stroke={isBarChart ? "#8A93A2" : "#253D51"}
                strokeWidth="1.3"
              />
              <path
                d="M1 22L23 22"
                stroke={isBarChart ? "#8A93A2" : "#253D51"}
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb16px"></div>

      <div className="d-flex ">
        <button
          className={
            selectedGraphNameGPRS === "positiveActiveEnergy"
              ? "meters-graph__btn meters-graph__btn--active"
              : "meters-graph__btn"
          }
          onClick={() => dispatch(getSelectedGraphNameGPRS("positiveActiveEnergy"))}
        >
          Активная энергия +
        </button>
        <div className="mr12px"></div>
        <button
          className={
            selectedGraphNameGPRS === "reverseActiveEnergy"
              ? "meters-graph__btn meters-graph__btn--active"
              : "meters-graph__btn"
          }
          onClick={() => dispatch(getSelectedGraphNameGPRS("reverseActiveEnergy"))}
        >
          Активная энергия -
        </button>
        <div className="mr12px"></div>
        <button
          className={
            selectedGraphNameGPRS === "positiveReactiveEnergy"
              ? "meters-graph__btn meters-graph__btn--active"
              : "meters-graph__btn"
          }
          onClick={() => dispatch(getSelectedGraphNameGPRS("positiveReactiveEnergy"))}
        >
          Реактивная энергия +
        </button>
        <div className="mr12px"></div>
        <button
          className={
            selectedGraphNameGPRS === "reverseReactiveEnergy"
              ? "meters-graph__btn meters-graph__btn--active"
              : "meters-graph__btn"
          }
          onClick={() => dispatch(getSelectedGraphNameGPRS("reverseReactiveEnergy"))}
        >
          Реактивная энергия -
        </button>
        <div className="mr12px"></div>
        <button
          onClick={() => dispatch(getSelectedGraphNameGPRS("power"))}
          className={
            selectedGraphNameGPRS === "power" ? "meters-graph__btn meters-graph__btn--active" : "meters-graph__btn"
          }
        >
          Мощность
        </button>
        <div className="mr12px"></div>
        <button
          onClick={() => dispatch(getSelectedGraphNameGPRS("voltage"))}
          className={
            selectedGraphNameGPRS === "voltage" ? "meters-graph__btn meters-graph__btn--active" : "meters-graph__btn"
          }
        >
          Напряжение
        </button>
        <div className="mr12px"></div>
        <button
          onClick={() => dispatch(getSelectedGraphNameGPRS("amperage"))}
          className={
            selectedGraphNameGPRS === "amperage" ? "meters-graph__btn meters-graph__btn--active" : "meters-graph__btn"
          }
        >
          Ток
        </button>
      </div>

      {(selectedGraphNameGPRS === 'voltage' || selectedGraphNameGPRS === 'amperage') &&
        <div className="d-flex" style={{marginTop: '16px', alignItems: 'center'}}>
          <p style={{marginRight: '12px'}}>Фаза:</p>
          <button
            onClick={() => dispatch(getSelectedGraphNamePhase("phaseA"))}
            className={
              selectedGraphPhase === "phaseA" ? "meters-graph__btn meters-graph__btn--active" : "meters-graph__btn"
            }
          >
            Phase A
          </button>
          <div className="mr12px"></div>
          <div className="d-flex ">
            <button
              onClick={() => dispatch(getSelectedGraphNamePhase("phaseB"))}
              className={
                selectedGraphPhase === "phaseB" ? "meters-graph__btn meters-graph__btn--active" : "meters-graph__btn"
              }
            >
              Phase B
            </button>
            <div className="mr12px"></div>
            <div className="d-flex ">
              <button
                onClick={() => dispatch(getSelectedGraphNamePhase("phaseC"))}
                className={
                  selectedGraphPhase === "phaseC" ? "meters-graph__btn meters-graph__btn--active" : "meters-graph__btn"
                }
              >
                Phase C
              </button>
              <div className="mr12px"></div>
            </div>
          </div>
        </div>
      }

      <div className="mb16px"></div>

      <div className="meters-graph__body">
        {(xAxisNew && yAxisNew) ?
          (isBarChart ? <BarChart xAxis={xAxisNew} yAxis={yAxisNew} type={"power"} />
            :
            <LineChart xAxis={xAxisNew} yAxis={yAxisNew} type={"power"} />
          )
          :
          null
        }
      </div>
    </div>
  );
});
