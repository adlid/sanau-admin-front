import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";
import { useFormik } from "formik";
import * as yup from "yup";
//redux
import { CreateConcentratorType } from "../../../../../../ts/types/dataTransmissionsDevice.types";
import { createConcentrator } from "../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import {
  getAllConcentratorIPandPort,
  setSocketMessage,
} from "../../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import { useHistory } from "react-router-dom";
// sockets
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useSnackbar } from "notistack";

type PropsType = {
  concentratorIPandPort: CreateConcentratorType;
  isConcentratorConnected: boolean;
  clickSubmitForm: () => void;
};

export const AddConcentratorDevice: FC<PropsType> = (props) => {
  const { concentratorIPandPort, isConcentratorConnected, clickSubmitForm } = props;

  // hooks
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isConcentratorConnected) {
      formik.resetForm();
    }
  }, [isConcentratorConnected]);

  const dispatch = useAppDispatch();

  const { isFetchingUSPD } = useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator);

  const validationSchema = yup.object({
    ip: yup.string().required("Обязательное поле"),
    port: yup.string().required("Обязательное поле"),
  });

  const initialValues: CreateConcentratorType = {
    ip: concentratorIPandPort.ip,
    port: concentratorIPandPort.port,
    token: localStorage.getItem("accessToken") || "",
  };

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: CreateConcentratorType) => {
      setSubmitting(true);
    },
  });

  // socket status connection
  const createConcentratorFunc = async () => {
    await dispatch(createConcentrator(formik.values));
    setSubmitting(false);
    setSocketConnected(false);
    await dispatch(getAllConcentratorIPandPort(formik.values));
  };

  useEffect(() => {
    if (!socketConnected) {
      return;
    }

    createConcentratorFunc();
  }, [socketConnected]);

  useEffect(() => {
    let socket = new SockJS(`${process.env.REACT_APP_SOCKET}`);
    let stompClient = Stomp.over(socket);
    if (submitting) {
      stompClient.debug = (str: any) => {
        if (str.includes("Whoops")) {
          console.log("error:", "Socket not connected");
          // enqueueSnackbar("Подключение по сокетам не установлено!", { variant: "error" });
          // setSocketConnected(true);
        }
      };

      stompClient.connect({ Authorization: localStorage.getItem("accessToken") }, (frame: any) => {
        setSocketConnected(true);
        stompClient.subscribe(`/topic/concentrator/${formik.values.ip}:${formik.values.port}`, (messageOutput: any) => {
          dispatch(setSocketMessage(JSON.parse(messageOutput.body)));
        });
      });
    }

    return () => socket.close();
  }, [submitting]);

  return (
    <div className="add-data-transmission-device">
      <div className="add-data-transmission-device__header d-flex justify-content-between align-items-center">
        <h3 className="add-data-transmission-device__title">Новое устройство сбора и передачи данных</h3>
        <div className="d-flex">
          <MainButton
            isSecondary={true}
            title="Отмена"
            style={{ width: 86, fontSize: 16, height: 40 }}
            onClick={() => {
              history.push("/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-transmision-device");
              formik.resetForm();
            }}
          />
          <div className="mr16px"></div>
          <MainButton
            // isDisabled={!isConcentratorConnected}
            fetching={isFetchingUSPD}
            title="Сохранить"
            style={{ width: 139, fontSize: 16, height: 40 }}
            onClick={() => clickSubmitForm()}
          />
        </div>
      </div>

      <Form onSubmit={formik.handleSubmit} className="add-data-transmission-device__form">
        <div className="d-flex align-items-start">
          <Form.Group className="add-data-transmission-device__input">
            <Form.Label>IP</Form.Label>
            <Form.Control
              type="text"
              name="ip"
              placeholder="XXX.XXX.XXX.XXX"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ip}
              isInvalid={!!formik.errors.ip && !!formik.touched.ip}
            />
            {formik.touched.ip && formik.errors.ip && (
              <Form.Control.Feedback type="invalid">{formik.errors.ip}</Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="mr16px"></div>
          <Form.Group className="add-data-transmission-device__input">
            <Form.Label>Порт</Form.Label>
            <Form.Control
              type="text"
              name="port"
              placeholder="XXXX"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.port}
              isInvalid={!!formik.errors.port && !!formik.touched.port}
            />
            {formik.touched.port && formik.errors.port && (
              <Form.Control.Feedback type="invalid">{formik.errors.ip}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <div className="add-data-transmission-device__mt">
            {!isConcentratorConnected && (
              <MainButton fetching={submitting} title="Подключиться" style={{ width: 166, fontSize: 16, height: 48 }} />
            )}
            {isConcentratorConnected && (
              <div className="add-data-transmission-device__connected">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                      fill="#31B77E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.9697 4.97126C11.1096 4.83253 11.2985 4.75445 11.4956 4.75391C11.6927 4.75337 11.882 4.8304 12.0227 4.96835C12.1634 5.10631 12.2442 5.2941 12.2476 5.49113C12.2509 5.68815 12.1766 5.87859 12.0407 6.02126L8.04867 11.0113C7.98006 11.0852 7.89725 11.1445 7.8052 11.1856C7.71315 11.2268 7.61374 11.249 7.51292 11.2508C7.4121 11.2527 7.31194 11.2342 7.21843 11.1965C7.12491 11.1588 7.03997 11.1026 6.96867 11.0313L4.32367 8.38526C4.24998 8.3166 4.19088 8.23379 4.14989 8.1418C4.1089 8.0498 4.08685 7.95048 4.08508 7.84978C4.0833 7.74908 4.10183 7.64905 4.13955 7.55566C4.17727 7.46227 4.23341 7.37744 4.30463 7.30622C4.37585 7.235 4.46068 7.17886 4.55407 7.14113C4.64746 7.10341 4.74749 7.08489 4.84819 7.08667C4.94889 7.08844 5.04821 7.11048 5.14021 7.15148C5.23221 7.19247 5.31501 7.25157 5.38367 7.32526L7.47767 9.41826L10.9507 4.99326C10.9569 4.98551 10.9635 4.97816 10.9707 4.97126H10.9697Z"
                      fill="#31B77E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span>Подключено</span>
              </div>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};
