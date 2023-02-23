import { Spinner } from "react-bootstrap";
import { CChart } from "@coreui/react-chartjs";
import React, { FC, useEffect, useState } from "react";
import {
  getUserInfoThunk,
  getMeterInfoThunk,
  getMeterServicesThunk,
} from "../../store/slicesAndThunks/dashboard/dashboard.thunks";
import { useAppDispatch, useTypedSelector } from "../../utils/hooks/reduxHooks";
import { FirstLineBlock } from "./components/FirstLineBlock/FirstLineBlock";
import { SecondLineBlock } from "./components/SecondLineBlock/SecondLineBlock";
import { ThirdLineBlock } from "./components/ThirdLineBlock/ThirdLineBlock";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const { userInfo, metersInfo, metersServices } = useTypedSelector((state) => state.dashboard);

  const [loading, setLoading] = useState<boolean>(false);

  const getDashboardData = async () => {
    setLoading(true);
    await dispatch(getUserInfoThunk());
    await dispatch(getMeterInfoThunk());
    await dispatch(getMeterServicesThunk());
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const doughnut = {
    labels: ["Вода", "Электроэнергия", "Газ"],
    datasets: [
      {
        data: [metersInfo?.totalCount[1].total, metersInfo?.totalCount[0].total, metersInfo?.totalCount[2].total],
        backgroundColor: ["#18A0FB", "#EB5757", "#355169"],
        hoverBackgroundColor: ["#18A0FB", "#EB5757", "#355169"],
      },
    ],
  };

  const totalUsers = userInfo.reduce((accumulator: any, currentValue: any) => accumulator + currentValue?.total, 0);

  return (
    <div className="dashboard_blocks">
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 130px)" }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {" "}
          <div className="dashboard_1_line">
            <div className="dashboard_1_line__block pie">
              <div>
                <div className="dashboard_1_line__block_header__text">
                  <p className="title">Общее количество ПУ</p>
                  <p className="value">{metersInfo?.total}</p>
                </div>
                <hr />
                <div className="dashboard_1_line_pie_footer">
                  <div className="dashboard_1_line_pie_footer_title">
                    <div className="round_big blue" />
                    <p>Вода</p>
                  </div>
                  <div className="dashboard_1_line_pie_footer_title">
                    <div className="round_big red" />
                    <p>Электроэнергия</p>
                  </div>
                  <div className="dashboard_1_line_pie_footer_title">
                    <div className="round_big darkBlue" />
                    <p>Газ</p>
                  </div>
                </div>
              </div>
              <CChart
                style={{ width: "300px", height: "150px" }}
                type="doughnut"
                datasets={doughnut.datasets}
                labels={doughnut.labels}
                options={{ legend: { display: false } }}
              />
            </div>
            {metersInfo?.totalCount.map((indicator, index) => {
              return <FirstLineBlock key={index} indicator={indicator} />;
            })}
          </div>
          <div className="dashboard_2_line">
            <p className="dashboard_2_line__header">Всего пользователей: {totalUsers}</p>
            <hr />
            <div className="dashboard_2_line__info">
              {userInfo?.map((user, index) => {
                return <SecondLineBlock key={index} user={user} />;
              })}
            </div>
          </div>
          <div className="dashboard_3_line">
            <p className="dashboard_3_line__header">Сервисы</p>
            <hr />
            <div className="dashboard_3_line__info">
              {metersServices.length
                ? metersServices.map((service, index) => {
                    return <ThirdLineBlock key={index} service={service} />;
                  })
                : "Нет доступных сервисов"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
