import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
// components
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";
// icons
import { ReactComponent as Checked } from "../../../../../../assets/imgs/checked.svg";
import { ReactComponent as NotChecked } from "../../../../../../assets/imgs/notChecked.svg";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import { changeOtanAtttibutesThunk } from "../../../../../../store/slicesAndThunks/powerConcentrator/otan/otan.thunk";

export const ParamsPage: FC = () => {
  // hooks
  const dispatch = useAppDispatch();

  // data from redux
  const { otanDetailValues } = useTypedSelector((state) => state.powerMeterOtanMeter);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      voltage: otanDetailValues?.voltage || "",
      current: otanDetailValues?.current || "",
      voltageCoefficient: otanDetailValues?.voltageCoefficient || "",
      currentCoefficient: otanDetailValues?.currentCoefficient || "",
      numberOfWires: otanDetailValues?.numberOfWires || "",
      location: otanDetailValues?.location || "",
      idCode: otanDetailValues?.idCode || "",
      timer: otanDetailValues?.timer || "",
      accuracyClassActiveEnergy: otanDetailValues?.accuracyClassActiveEnergy || "",
      accuracyClassReactiveEnergy: otanDetailValues?.accuracyClassReactiveEnergy || "",
      totalPositiveActiveIndication: otanDetailValues?.totalPositiveActiveIndication || false,
      tariffPositiveActiveIndication: otanDetailValues?.tariffPositiveActiveIndication || false,
      totalNegativeActiveIndication: otanDetailValues?.totalNegativeActiveIndication || false,
      tariffNegativeActiveIndication: otanDetailValues?.tariffNegativeActiveIndication || false,
      totalPositiveReactiveIndication: otanDetailValues?.totalPositiveReactiveIndication || false,
      tariffPositiveReactiveIndication: otanDetailValues?.tariffPositiveReactiveIndication || false,
      totalNegativeReactiveIndication: otanDetailValues?.totalNegativeReactiveIndication || false,
      tariffNegativeReactiveIndication: otanDetailValues?.tariffNegativeReactiveIndication || false,
    },
    validationSchema: yup.object({}),
    onSubmit: async (values: any) => {
      const body = {
        ip: otanDetailValues?.ip || "-",
        port: Number(otanDetailValues?.port || ""),
        deviceId: otanDetailValues?.deviceId || "",
        accuracyClassActiveEnergy: values.accuracyClassActiveEnergy,
        accuracyClassReactiveEnergy: values.accuracyClassReactiveEnergy,
      };
      await dispatch(changeOtanAtttibutesThunk(body));
    },
  });

  return (
    <div className="">
      <div className="bluetooth-connection-counterparty__header">
        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Класс точности по активной энергии</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              name="accuracyClassActiveEnergy"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accuracyClassActiveEnergy}
              isInvalid={!!formik.errors.accuracyClassActiveEnergy && !!formik.touched.accuracyClassActiveEnergy}
            />
            {formik.touched.accuracyClassActiveEnergy && formik.errors.accuracyClassActiveEnergy && (
              <Form.Control.Feedback type="invalid">{formik.errors.accuracyClassActiveEnergy}</Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="mr12px"></div>

          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Класс точности по реактивной энергии</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              name="accuracyClassReactiveEnergy"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accuracyClassReactiveEnergy}
              isInvalid={!!formik.errors.accuracyClassReactiveEnergy && !!formik.touched.accuracyClassReactiveEnergy}
            />
            {formik.touched.accuracyClassReactiveEnergy && formik.errors.accuracyClassReactiveEnergy && (
              <Form.Control.Feedback type="invalid">{formik.errors.accuracyClassReactiveEnergy}</Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
        <div className="d-flex align-items-end">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Напряжение</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="voltage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.voltage}
              isInvalid={!!formik.errors.voltage && !!formik.touched.voltage}
            />
            {formik.touched.voltage && formik.errors.voltage && (
              <Form.Control.Feedback type="invalid">{formik.errors.voltage}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr12px"></div>

          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Коэф. напряжения</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="voltageCoefficient"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.voltageCoefficient}
              isInvalid={!!formik.errors.voltageCoefficient && !!formik.touched.voltageCoefficient}
            />
            {formik.touched.voltageCoefficient && formik.errors.voltageCoefficient && (
              <Form.Control.Feedback type="invalid">{formik.errors.voltageCoefficient}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr12px"></div>

          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Ток</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="current"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.current}
              isInvalid={!!formik.errors.current && !!formik.touched.current}
            />
            {formik.touched.current && formik.errors.current && (
              <Form.Control.Feedback type="invalid">{formik.errors.current}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr12px"></div>

          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Коэф. тока</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="currentCoefficient"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentCoefficient}
              isInvalid={!!formik.errors.currentCoefficient && !!formik.touched.currentCoefficient}
            />
            {formik.touched.currentCoefficient && formik.errors.currentCoefficient && (
              <Form.Control.Feedback type="invalid">{formik.errors.currentCoefficient}</Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
        <div className="d-flex align-items-end">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Местоположение точки учета</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              isInvalid={!!formik.errors.location && !!formik.touched.location}
            />
            {formik.touched.location && formik.errors.location && (
              <Form.Control.Feedback type="invalid">{formik.errors.location}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr12px"></div>

          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Кол-во проводов</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="numberOfWires"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.numberOfWires}
              isInvalid={!!formik.errors.numberOfWires && !!formik.touched.numberOfWires}
            />
            {formik.touched.numberOfWires && formik.errors.numberOfWires && (
              <Form.Control.Feedback type="invalid">{formik.errors.numberOfWires}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr12px"></div>

          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Идентификационный код</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="idCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.idCode}
              isInvalid={!!formik.errors.idCode && !!formik.touched.idCode}
            />
            {formik.touched.idCode && formik.errors.idCode && (
              <Form.Control.Feedback type="invalid">{formik.errors.idCode}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr12px"></div>

          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Таймер</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="timer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.timer}
              isInvalid={!!formik.errors.timer && !!formik.touched.timer}
            />
            {formik.touched.timer && formik.errors.timer && (
              <Form.Control.Feedback type="invalid">{formik.errors.timer}</Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
      </div>

      <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">Индикация ЖКИ</h4>
        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Дата</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="accuracyClassActiveEnergy"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accuracyClassActiveEnergy}
              isInvalid={!!formik.errors.accuracyClassActiveEnergy && !!formik.touched.accuracyClassActiveEnergy}
            />
            {formik.touched.accuracyClassActiveEnergy && formik.errors.accuracyClassActiveEnergy && (
              <Form.Control.Feedback type="invalid">{formik.errors.accuracyClassActiveEnergy}</Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="mr12px"></div>

          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Время</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder=""
              name="accuracyClassReactiveEnergy"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accuracyClassReactiveEnergy}
              isInvalid={!!formik.errors.accuracyClassReactiveEnergy && !!formik.touched.accuracyClassReactiveEnergy}
            />
            {formik.touched.accuracyClassReactiveEnergy && formik.errors.accuracyClassReactiveEnergy && (
              <Form.Control.Feedback type="invalid">{formik.errors.accuracyClassReactiveEnergy}</Form.Control.Feedback>
            )}
          </Form.Group>
        </div>

        <table className="table table-sm table-bordered">
          <thead>
            <tr className="read-data-view-table__bgc">
              <th scope="col">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Сумма по A+</span>
                  {formik.values.totalPositiveActiveIndication ? <Checked /> : <NotChecked />}
                </div>
              </th>
              <th scope="col">
                <div className="d-flex justify-content-between align-items-center">
                  <span>По тарифам A+</span>
                  {formik.values.tariffPositiveActiveIndication ? <Checked /> : <NotChecked />}
                </div>
              </th>

              <th scope="col">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Сумма по A-</span>
                  {formik.values.totalNegativeActiveIndication ? <Checked /> : <NotChecked />}
                </div>
              </th>
              <th scope="col">
                <div className="d-flex justify-content-between align-items-center">
                  <span>По тарифам A-</span>
                  {formik.values.tariffNegativeActiveIndication ? <Checked /> : <NotChecked />}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="read-data-view-table__bgc read-data-view-table__bgc--white">
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Сумма по P+</span>
                  {formik.values.totalPositiveReactiveIndication ? <Checked /> : <NotChecked />}
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <span>По тарифам P+</span>
                  {formik.values.tariffPositiveReactiveIndication ? <Checked /> : <NotChecked />}
                </div>
              </td>

              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Сумма по P-</span>
                  {formik.values.totalNegativeReactiveIndication ? <Checked /> : <NotChecked />}
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <span>По тарифам P-</span>
                  {formik.values.tariffNegativeReactiveIndication ? <Checked /> : <NotChecked />}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bluetooth-connection-counterparty__border" style={{ position: "relative", overflow: "auto" }}>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th colSpan={14} className="read-data-view-table__bgc" style={{ textAlign: "center" }}>
                Тарифное расписание на неделю
              </th>
            </tr>
            <tr>
              <th colSpan={2}>Понедельник</th>
              <th colSpan={2}>Вторник</th>
              <th colSpan={2}>Среда</th>
              <th colSpan={2}>Четверг</th>
              <th colSpan={2}>Пятница</th>
              <th colSpan={2}>Суббота</th>
              <th colSpan={2}>Воскресенье</th>
            </tr>

            <tr className="read-data-view-table__bgc">
              <th scope="col">Время</th>
              <th scope="col">Тариф</th>

              <th scope="col">Время</th>
              <th scope="col">Тариф</th>

              <th scope="col">Время</th>
              <th scope="col">Тариф</th>

              <th scope="col">Время</th>
              <th scope="col">Тариф</th>

              <th scope="col">Время</th>
              <th scope="col">Тариф</th>

              <th scope="col">Время</th>
              <th scope="col">Тариф</th>

              <th scope="col">Время</th>
              <th scope="col">Тариф</th>
            </tr>
          </thead>

          <tbody>
            {otanDetailValues?.tariffSchedule && otanDetailValues.tariffSchedule.length !== 0 ? (
              otanDetailValues.tariffSchedule.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={
                      index % 2 !== 0
                        ? "read-data-view-table__bgc "
                        : "read-data-view-table__bgc read-data-view-table__bgc--white"
                    }
                  >
                    <td>{item.time}</td>
                    <td>{item.tariffNumber}</td>

                    <td>{item.time}</td>
                    <td>{item.tariffNumber}</td>

                    <td>{item.time}</td>
                    <td>{item.tariffNumber}</td>

                    <td>{item.time}</td>
                    <td>{item.tariffNumber}</td>

                    <td>{item.time}</td>
                    <td>{item.tariffNumber}</td>

                    <td>{item.time}</td>
                    <td>{item.tariffNumber}</td>

                    <td>{item.time}</td>
                    <td>{item.tariffNumber}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="read-data-view-table__bgc read-data-view-table__bgc--white">
                <td colSpan={14} style={{ textAlign: "center", padding: "20px 0px" }}>
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bluetooth-connection-counterparty__header">
        <div className="gprs2-info__footer">
          <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
        </div>
      </div>
    </div>
  );
};
