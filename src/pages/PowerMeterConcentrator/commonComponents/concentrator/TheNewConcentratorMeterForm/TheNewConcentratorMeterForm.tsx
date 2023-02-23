import { FC } from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

type PropsType = {
  formik: any;
};

export const TheNewConcentratorMeterForm: FC<PropsType> = ({ formik }) => {
  return (
    <div className="new-concentrator-meter">
      <div className="bluetooth-connection-counterparty__header bluetooth-connection-counterparty__header--pb d-flex">
        <Form.Group>
          <Form.Check
            checked={
              formik.values.meterGeneration ===
              "ОРМАН СО-Э711 TX PLC IP P (10-60 A)"
                ? true
                : false
            }
            type="radio"
            label="ОРМАН СО-Э711 TX PLC IP P (10-60 A)"
            name="meterGeneration"
            value={"ОРМАН СО-Э711 TX PLC IP P (10-60 A)"}
            id="formHorizontalRadios1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.type && !!formik.touched.type}
          />
        </Form.Group>
        <div className="mr33px"></div>
        <Form.Group>
          <Form.Check
            checked={
              formik.values.meterGeneration ===
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
                ? true
                : false
            }
            type="radio"
            label="ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
            name="meterGeneration"
            value={
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
            }
            id="formHorizontalRadios1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.type && !!formik.touched.type}
          />
        </Form.Group>
      </div>

      <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">
          Основное
        </h4>

        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Наименование ПУ</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="meterName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.meterName}
                isInvalid={!!formik.errors.meterName && !!formik.touched.meterName}
            />
            {formik.touched.meterName && formik.errors.meterName && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.meterName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Серийный номер</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="serial"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.serial}
              isInvalid={!!formik.errors.serial && !!formik.touched.serial}
            />
            {formik.touched.serial && formik.errors.serial && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.serial}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Знаков серийного номера</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="serialLength"
              value={formik.values.serial.length}
            />
            {formik.touched.serialLength && formik.errors.serialLength && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.serialLength}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Изготовитель</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="manufacturer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.manufacturer}
                isInvalid={!!formik.errors.manufacturer && !!formik.touched.manufacturer}
            />
            {formik.touched.manufacturer && formik.errors.manufacturer && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.manufacturer}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Организация, настроившая сбор</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="setUpOrganization"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.setUpOrganization}
                isInvalid={!!formik.errors.setUpOrganization && !!formik.touched.setUpOrganization}
            />
            {formik.touched.setUpOrganization && formik.errors.setUpOrganization && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.setUpOrganization}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Тип счетчика</Form.Label>
            <Form.Control 
              as="select"
              placeholder=""
              name="type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={!!formik.errors.type && !!formik.touched.type}
            >
              <option value="Однофазный активной энергии">Однофазный активной энергии</option>
              <option value="Трехфазный активной энергии">Трехфазный активной энергии</option>
              <option value="Трехфазный реактивной энергии">Трехфазный реактивной энергии</option>
              <option value="Повторитель">Повторитель</option>
              </Form.Control>
            {formik.touched.type && formik.errors.type && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.type}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
        <div className="d-flex">
        <Form.Group className="concentrator-character__form-item">
            <Form.Label>Название счетчика для фильтрации</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="filterMeterName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.filterMeterName}
                isInvalid={!!formik.errors.filterMeterName && !!formik.touched.filterMeterName}
            />
            {formik.touched.filterMeterName && formik.errors.filterMeterName && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.filterMeterName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
      </div>
        <div className="d-flex">
          {/* <Form.Group className="concentrator-character__form-item">
            <Form.Label>Сетевой адрес</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={!!formik.errors.email && !!formik.touched.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group> */}
          <div className="mr16px"></div>
          {/* <Form.Group className="concentrator-character__form-item">
            <Form.Label>Пароль доступа</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={!!formik.errors.email && !!formik.touched.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group> */}
          <div className="mr16px"></div>
          {/* <Form.Group className="concentrator-character__form-item">
            <Form.Label>Предаточное число</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={!!formik.errors.email && !!formik.touched.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )} 
          </Form.Group> */}
          <div className="mr16px"></div>
          {/* <Form.Group className="concentrator-character__form-item">
            <Form.Label>Линия/фидер установки</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={!!formik.errors.email && !!formik.touched.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group> */}
        </div>
      </div>

      <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">
          Параметры
        </h4>

        <Row>
          <Col>
            <h5 className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--2">
              Основные
            </h5>
            <Form.Group>
              <Form.Check
                checked={formik.values.residue ? true : false}
                name="residue"
                type="checkbox"
                label="Хранит остатка энергии"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue("residue", true);
                  } else {
                    formik.setFieldValue("residue", false);
                  }
                }}
              />
            </Form.Group>
            <div className="mb12px"></div>
            <Form.Group>
              <Form.Check
                checked={formik.values.creditResidue ? true : false}
                name="creditResidue"
                type="checkbox"
                label="Хранит остаток денег"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue("creditResidue", true);
                  } else {
                    formik.setFieldValue("creditResidue", false);
                  }
                }}
              />
            </Form.Group>
            <div className="mb12px"></div>
            <Form.Group>
              <Form.Check
                checked={formik.values.password ? true : false}
                name="password"
                type="checkbox"
                label="Требует пароль"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue("password", true);
                  } else {
                    formik.setFieldValue("password", false);
                  }
                }}
              />
            </Form.Group>
            <div className="mb12px"></div>
            <Form.Group>
              <Form.Check
                checked={formik.values.head ? true : false}
                name="head"
                type="checkbox"
                label="Головной ПУ"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue("head", true);
                  } else {
                    formik.setFieldValue("head", false);
                  }
                }}
              />
            </Form.Group>
            <div className="mb12px"></div>
            <Form.Group>
              <Form.Check
                checked={formik.values.state ? true : false}
                name="state"
                type="checkbox"
                label="Блокирован"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue("state", true);
                  } else {
                    formik.setFieldValue("state", false);
                  }
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <h5 className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--2">
              Считывание данных
            </h5>
            <Form.Group>
              <Form.Check
                checked={formik.values.prevDayEnd ? true : false}
                name="prevDayEnd"
                type="checkbox"
                label="Данные за предыдущие сутки"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue("prevDayEnd", true);
                  } else {
                    formik.setFieldValue("prevDayEnd", false);
                  }
                }}
              />
            </Form.Group>
            <div className="mb12px"></div>
            <Form.Group>
              <Form.Check
                checked={formik.values.saveMaxPower ? true : false}
                name="saveMaxPower"
                type="checkbox"
                label="Данные потребляемой мощности"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue("saveMaxPower", true);
                  } else {
                    formik.setFieldValue("saveMaxPower", false);
                  }
                }}
              />
            </Form.Group>
            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.activeEnergy ? true : false}
                  name="activeEnergy"
                  type="checkbox"
                  label="Активная энергия"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("activeEnergy", true);
                    } else {
                      formik.setFieldValue("activeEnergy", false);
                    }
                  }}
                />
              </Form.Group>
            )}
            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.reactiveEnergy ? true : false}
                  name="reactiveEnergy"
                  type="checkbox"
                  label="Реактивная энергия"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("reactiveEnergy", true);
                    } else {
                      formik.setFieldValue("reactiveEnergy", false);
                    }
                  }}
                />
              </Form.Group>
            )}
            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.threePhaseVoltage ? true : false}
                  name="threePhaseVoltage"
                  type="checkbox"
                  label="Напряжение"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("threePhaseVoltage", true);
                    } else {
                      formik.setFieldValue("threePhaseVoltage", false);
                    }
                  }}
                />
              </Form.Group>
            )}
            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.threePhaseAmperage ? true : false}
                  name="threePhaseAmperage"
                  type="checkbox"
                  label="Ток"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("threePhaseAmperage", true);
                    } else {
                      formik.setFieldValue("threePhaseAmperage", false);
                    }
                  }}
                />
              </Form.Group>
            )}
            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.activePower ? true : false}
                  type="checkbox"
                  name="activePower"
                  label="Активная мощность"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("activePower", true);
                    } else {
                      formik.setFieldValue("activePower", false);
                    }
                  }}
                />
              </Form.Group>
            )}
          </Col>
          <Col>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <h5 className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--2">
                Другие
              </h5>
            )}
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.eventLogs ? true : false}
                  name="eventLogs"
                  type="checkbox"
                  label="Журнал событий"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("eventLogs", true);
                    } else {
                      formik.setFieldValue("eventLogs", false);
                    }
                  }}
                />
              </Form.Group>
            )}
            <div className="mb12px"></div>

            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.errorFlagPrevDay ? true : false}
                  name="errorFlagPrevDay"
                  type="checkbox"
                  label="Признак ошибки"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("errorFlagPrevDay", true);
                    } else {
                      formik.setFieldValue("errorFlagPrevDay", false);
                    }
                  }}
                />
              </Form.Group>
            )}

            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.relayState ? true : false}
                  name="relayState"
                  type="checkbox"
                  label="Состояние реле"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("relayState", true);
                    } else {
                      formik.setFieldValue("relayState", false);
                    }
                  }}
                />
              </Form.Group>
            )}

            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.dailyFixingTime ? true : false}
                  name="dailyFixingTime"
                  type="checkbox"
                  label="Суточные архивы"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("dailyFixingTime", true);
                    } else {
                      formik.setFieldValue("dailyFixingTime", false);
                    }
                  }}
                />
              </Form.Group>
            )}
            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.monthlyFixingTime ? true : false}
                  name="monthlyFixingTime"
                  type="checkbox"
                  label="Месячные архивы"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("monthlyFixingTime", true);
                    } else {
                      formik.setFieldValue("monthlyFixingTime", false);
                    }
                  }}
                />
              </Form.Group>
            )}
            <div className="mb12px"></div>
            {formik.values.meterGeneration !==
              "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)" && (
              <Form.Group>
                <Form.Check
                  checked={formik.values.relayingStatus ? true : false}
                  name="relayingStatus"
                  type="checkbox"
                  label="Состояние маршрута"
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("relayingStatus", true);
                    } else {
                      formik.setFieldValue("relayingStatus", false);
                    }
                  }}
                />
              </Form.Group>
            )}
          </Col>
        </Row>
      </div>

      {/* <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">Таймер</h4>
        <div>
          <span>Системный таймер:</span>
          <span className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--2">
            12.12.2020 13:00
          </span>
        </div>
        <div>
          <span>Таймер прибора учета:</span>
          <span className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--3">
            {" "}
            Нет данных
          </span>
        </div>
        <div>
          <span>Отклонение: </span>
          <span className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--3">
            Нет данных
          </span>
        </div>
        <div>
          <span>Системный таймер:</span>
          <span className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--2">
            12.12.2020 13:00
          </span>
        </div>
      </div> */}

      {/* <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">
          Закрытие месяца (число и время, в которое будет будет фиксироваться
          энергия каждый месяц)
        </h4>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Число каждого месяца</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={!!formik.errors.email && !!formik.touched.email}
          />
          {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
        </Form.Group>
      </div> */}

      {/* <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">Тарифы</h4>
        <span className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--2">
          Основное: 0 тарифтов, Резервное: Отсутствует
        </span>
        <div></div>
        <span className="link link--active"> Настроить</span>
      </div> */}

      {/* <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">
          Кофигурация часовых срезов
        </h4>

        <Row>
          <Col>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Хранит остатка энергии"
                onChange={() => {}}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Хранит остатка энергии"
                onChange={() => {}}
              />
            </Form.Group>
          </Col>
        </Row>
      </div> */}

      <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">
          Параметры ретрансляции
        </h4>

        <div className="d-flex flex-wrap">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Номер ретранслятора</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="pos"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pos}
              isInvalid={!!formik.errors.pos && !!formik.touched.pos}
            />
            {formik.touched.pos && formik.errors.pos && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.pos}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        
        
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Фаза</Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder=""
              name="phase"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phase}
              isInvalid={!!formik.errors.phase && !!formik.touched.phase}
            >
              <option value="NOT_SET">Не определена</option>
              <option value="PHASE_A">Фаза А</option>
              <option value="PHASE_B">Фаза В</option>
              <option value="PHASE_C">Фаза С</option>
            </Form.Control>
            {formik.touched.phase && formik.errors.phase && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Шкаф</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="box"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.box}
              isInvalid={!!formik.errors.box && !!formik.touched.box}
            />
            {formik.touched.box && formik.errors.box && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.box}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Модуль</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="mod"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mod}
              isInvalid={!!formik.errors.mod && !!formik.touched.mod}
            />
            {formik.touched.mod && formik.errors.mod && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.mod}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
        <div className="d-flex flex-wrap">
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Главная линия</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="primaryLine"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.primaryLine}
              isInvalid={
                !!formik.errors.primaryLine && !!formik.touched.primaryLine
              }
            />
            {formik.touched.primaryLine && formik.errors.primaryLine && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.primaryLine}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Линия 1</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="firstLine"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstLine}
              isInvalid={
                !!formik.errors.firstLine && !!formik.touched.firstLine
              }
            />
            {formik.touched.firstLine && formik.errors.firstLine && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstLine}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Линия 2</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="secondLine"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.secondLine}
              isInvalid={
                !!formik.errors.secondLine && !!formik.touched.secondLine
              }
            />
            {formik.touched.secondLine && formik.errors.secondLine && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.secondLine}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
          <Form.Group className="concentrator-character__form-item">
            <Form.Label>Линия 3</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="thirdLine"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.thirdLine}
              isInvalid={
                !!formik.errors.thirdLine && !!formik.touched.thirdLine
              }
            />
            {formik.touched.thirdLine && formik.errors.thirdLine && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.thirdLine}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="mr16px"></div>
        </div>
      </div>

      {/* <div className="bluetooth-connection-counterparty__border">
        <h4 className="bluetooth-connection-counterparty__subtitle">
          Нагрузка
        </h4>
        <div className="mb20px"></div>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Хранит остатка энергии"
            onChange={() => {}}
          />
        </Form.Group>
        <div className="mb20px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Верхний предел мощности (Вт)</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={!!formik.errors.email && !!formik.touched.email}
          />
          {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
        </Form.Group>

        <span className="bluetooth-connection-counterparty__subtitle bluetooth-connection-counterparty__subtitle--2">
          При достижениии 5 Вт, восстановление в течении 5 минут
        </span>
        <div></div>
        <span className="link link--active">
          {" "}
          Настроить защиту от перенапряжения
        </span>
      </div> */}
    </div>
  );
};
