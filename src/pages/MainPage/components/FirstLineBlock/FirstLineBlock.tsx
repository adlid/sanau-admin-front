import React, { FC } from "react";
import { GasMeterIcon } from "../../../../assets/imgs/dashboard/GasMeterIcon";
import { PowerMeterIcon } from "../../../../assets/imgs/dashboard/PowerMeterIcon";
import { WaterMeterIcon } from "../../../../assets/imgs/dashboard/WaterMeterIcon";
import { IDashboarMeter } from "../../../../ts/interfaces/dashboard.interface";

interface IFirstLineBlockProps {
  indicator: IDashboarMeter;
}

const name: any = {
  electric: "ПУ Электроэнергии",
  water: "ПУ Воды",
  gas: "ПУ Газа",
};

const icon: any = {
  electric: <PowerMeterIcon />,
  water: <WaterMeterIcon />,
  gas: <GasMeterIcon />,
};

export const FirstLineBlock: FC<IFirstLineBlockProps> = (props) => {
  const { indicator } = props;

  return (
    <div className="dashboard_1_line__block">
      <div className="dashboard_1_line__block_header">
        {icon[indicator.commonType]}
        <div className="dashboard_1_line__block_header__text">
          <p className="title">{name[indicator.commonType]}</p>
          <p className="value">{indicator.total}</p>
        </div>
      </div>
      <hr />
      <div className="dashboard_1_line__block_footer">
        <div className="dashboard_1_line__block_footer__text">
          <p className="text">Активные</p>
          <p className="text value_success">{indicator.active}</p>
        </div>
        <div className="dashboard_1_line__block_footer__text">
          <p className="text">Неактивные</p>
          <p className="text value_inactive">{indicator.inactive}</p>
        </div>
        <div className="dashboard_1_line__block_footer__text">
          <p className="text">Заблокированные</p>
          <p className="text value_error">{indicator.deleted}</p>
        </div>
      </div>
    </div>
  );
};
