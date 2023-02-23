import { FC, useState } from "react";
import { Modal } from "react-bootstrap";

import { SchedulePopup } from "../SchedulePopup";
import { ScheduleType } from "../../../../../ts/types/dataTransmissionsDevice.types";

type PropsType = {
  schedule: ScheduleType;
};

export const ConcentratorSchedule: FC<PropsType> = ({ schedule }) => {
  const [isSchedulePopup, toggleSchedulePopup] = useState(false);

  return (
    <>
      <div className="concentrator-schedule">
        <div className="concentrator-schedule__descr">
          Aвтоматический опрос каждый(-ые){" "}
          {schedule.interval === 30 ? `${schedule.interval} минут` : `${schedule.interval} час(а)`},{" "}
          {schedule.pollsPerDay} раз(а) в день с {schedule.startTime}, начиная с {schedule.zeroDay} числа{" "}
          {schedule.zeroTime} каждого месяца
        </div>

        <div onClick={() => toggleSchedulePopup(true)} className="link link--active">
          Изменить расписание
        </div>
      </div>
      <Modal
        show={isSchedulePopup}
        onHide={() => toggleSchedulePopup(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <SchedulePopup toggleSchedulePopupCallback={toggleSchedulePopup} />
      </Modal>
    </>
  );
};
