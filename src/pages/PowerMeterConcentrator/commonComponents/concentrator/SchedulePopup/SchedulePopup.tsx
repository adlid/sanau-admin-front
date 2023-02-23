import { FC } from "react";
import { icons } from "../../../../../utils/icons/icons";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { Form } from "react-bootstrap";
import { useFormik, Field, FormikProvider } from "formik";

//redux ts
import {
  useTypedSelector,
  useAppDispatch,
} from "../../../../../utils/hooks/reduxHooks";

import { setScheduleValues } from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";

type PropsType = {
  toggleSchedulePopupCallback: (isSchedulePopup: boolean) => void;
};

function dayOptionElements() {
  let options = [];
  for (let i = 2; i <= 48; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return options;
}
export const SchedulePopup: FC<PropsType> = ({
  toggleSchedulePopupCallback,
}) => {
  const dispatch = useAppDispatch();
  const { schedule } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      zeroDay: schedule.zeroDay.toString(),
      zeroTime:
        schedule.zeroTime < 10
          ? `0${schedule.zeroTime}:00`
          : `${schedule.zeroTime}:00`,
      pollsPerDay: schedule.pollsPerDay.toString(),
      startTime:
        schedule.startTime < 10
          ? `0${schedule.startTime}:00`
          : `${schedule.startTime}:00`,
      interval: schedule.interval.toString(),
    },
    onSubmit: (values) => {
      let valueToNumber = {
        zeroDay: +values.zeroDay,
        zeroTime: +values.zeroTime.split(":")[0],
        pollsPerDay: +values.pollsPerDay,
        startTime: +values.startTime.split(":")[0],
        interval: +values.interval,
      };
      dispatch(setScheduleValues(valueToNumber));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="schedule-popup">
      <FormikProvider value={formik}>
        <div className="schedule-popup__header">
          <span>Изменить расписание автоматического опроса</span>
          <img
            src={icons.closeIcon}
            onClick={() => toggleSchedulePopupCallback(false)}
            alt="close icon"
          />
        </div>
        <div className="schedule-popup__month">
          <div className="schedule-popup__month-block">
            <div className="d-flex justify-content-start flex-column">
              <span className="schedule-popup__month-block__title">
                Начало месяца
              </span>
              <span className="schedule-popup__month-block__paragraph">
                Первый опрос приборов учета
              </span>
              <div className="schedule-popup__month-block__input-blocks">
                <div className="d-flex flex-row justify-content-start">
                  <div className="input-blocks__item input-blocks__day">
                    <label>Число каждого месяца</label>
                    <input
                      value={formik.values.zeroDay}
                      name="zeroDay"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="input-blocks__item input-blocks__time">
                    <label>Время</label>
                    <input
                      name="zeroTime"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="time"
                      value={formik.values.zeroTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="schedule-popup__survey">
          <div className="schedule-popup__survey-block">
            <div className="d-flex justify-content-start flex-column">
              <span className="schedule-popup__survey-block__title">
                Ежедневный опрос
              </span>
              <div className="schedule-popup__survey-block__input-blocks">
                <div className="d-flex flex-row justify-content-start">
                  <div className="input-blocks__item input-blocks__survey-day">
                    <label>Опросов в день</label>
                    <Field as="select" name="pollsPerDay">
                      <option key={1} value="1">
                        1
                      </option>
                      {dayOptionElements()}
                    </Field>
                  </div>
                  <div className="input-blocks__item input-blocks__survey-duration">
                    <label>Интервал опроса</label>
                    <Field as="select" name="interval">
                      <option key={0.5} value={"30"}>
                        30 минут
                      </option>
                      <option key={1} value={"1"}>
                        1 час
                      </option>
                      <option key={2} value={"2"}>
                        2 часа
                      </option>
                      <option key={4} value={"4"}>
                        4 часа
                      </option>
                      <option key={6} value={"6"}>
                        6 часов
                      </option>
                      <option key={12} value={"12"}>
                        12 часов
                      </option>
                    </Field>
                  </div>
                  <div className="input-blocks__item input-blocks__time input-blocks__survey-time">
                    <label>Начало первого опроса</label>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="startTime"
                      type="time"
                      value={formik.values.startTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="schedule-popup__footer">
          <div className="d-flex justify-content-end flex-row">
            <MainButton
              isSecondary
              title="Отмена"
              style={{ width: 86, fontSize: 14, height: 40 }}
              onClick={(e) => {
                e.preventDefault();
                toggleSchedulePopupCallback(false);
              }}
            />
            <div className="mr16px" />
            <MainButton
              title="Изменить"
              style={{ width: 100, fontSize: 14, height: 40 }}
              onClick={() => toggleSchedulePopupCallback(false)}
            />
          </div>
        </div>
      </FormikProvider>
    </Form>
  );
};
