import React, { FC, useState } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { IOSSwitch } from "../../../../components/uiKit/Switch/Switch";
import { toggleMeterServicesThunk } from "../../../../store/slicesAndThunks/dashboard/dashboard.thunks";
import { IMeterServicesItemProps } from "../../../../ts/interfaces/dashboard.interface";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";

interface IThirdLineBlockProps {
  service: IMeterServicesItemProps;
}

export const ThirdLineBlock: FC<IThirdLineBlockProps> = (props) => {
  const { service } = props;
  const dispatch = useAppDispatch();

  const [state, setState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleService = async () => {
    setLoading(true);
    await dispatch(toggleMeterServicesThunk(service.id));
    setLoading(false);
  };

  useEffect(() => {
    setState(service.active);
  }, [service.active]);

  return (
    <div className="info_block">
      <div>
        <p className="info_block__title">{service.nameRu}</p>
        <p className="info_block__value">
          {loading ? <Spinner animation="border" size="sm" /> : service.active ? "Включен" : "Выключен"}
        </p>
      </div>
      <IOSSwitch checked={state} onChange={toggleService} />
    </div>
  );
};
