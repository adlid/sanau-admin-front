import { FC, useState, useEffect } from "react";
import { SortByButton } from "../../../components/uiKit/Buttons/SortByButton";
import { MainButton } from "../../../components/uiKit/Buttons/MainButton";

import { Form, Row, Col, InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import { Popover } from "react-tiny-popover";
import { Pagination } from "../../../components/uiKit/Pagination";
//picker
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { makeStyles } from "@material-ui/core/styles";
import { icons } from "../../../utils/icons/icons";
import { useHistory } from "react-router-dom";
import moment from "moment";
import * as queryString from "querystring";
//redux
import { useTypedSelector, useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { getDevicesLogs } from "../../../store/slicesAndThunks/logs/logs.thunk";

const useStyle = makeStyles((theme) => ({
  root: {
    color: "#B9BEC7",
  },
}));

export const DevicesLogs: FC = () => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { devicesLogsPage } = queryString.parse(history.location.search.substring(1));
  const { deviceLogs, loading } = useTypedSelector((state) => state.logs);

  const [page, setPage] = useState(1);
  const [isFilterPopoverOpen, setFilterIsPopoverOpen] = useState(false);
  const [isFilterIconHover, setIsFilterIconHover] = useState(false);
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);
  const [items, setItems] = useState<Array<string>>([]);
  const [items2, setItems2] = useState<Array<string>>([]);

  const getSystemsLogsCallback = (
    page: number,
    sortByParam = sortBy,
    serialNumber = inputValue,
    from = startDate,
    to = finishDate,
    meterCommonType = items,
    serviceName = items2
  ) => {
    history.push({
      search: `?devicesLogsPage=${page}`,
    });

    dispatch(
      getDevicesLogs({
        serialNumber,
        from,
        to,
        meterCommonType,
        serviceName,
        page: page,
        sortBy: sortByParam,
        action: [],
        meterSpecificType: [],
      })
    );
  };

  useEffect(() => {
    if (devicesLogsPage === undefined) {
      getSystemsLogsCallback(1);
    } else {
      getSystemsLogsCallback(+devicesLogsPage as number);
      setPage(+devicesLogsPage as number);
    }
  }, []);

  return (
    <div className="logs">
      <h2 className="logs__title">Логи по системе и устройствам</h2>
      <div className="logs__search-wrap d-flex">
        <InputGroup className="info-by-bluetooth__filter">
          <FormControl
            className="info-by-bluetooth__form-control"
            placeholder="Поиск"
            aria-describedby="basic-addon1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <InputGroup.Prepend>
            <Popover
              isOpen={isFilterPopoverOpen}
              padding={10}
              positions={["bottom", "left"]}
              containerClassName="logs__popover-container"
              onClickOutside={() => {
                setFilterIsPopoverOpen(false);
              }}
              content={
                <div className="info-by-bluetooth__period">
                  <h4 className="info-by-bluetooth__title">По дате добавления</h4>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="info-by-bluetooth__calendar d-flex align-items-center"
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                      <KeyboardDatePicker
                        inputProps={{ className: classes.root }}
                        open={openFirstCalendar}
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        placeholder="ДД/ММ/ГГГГ"
                        value={startDate}
                        onClick={() => {
                          setOpenFirstCalendar(true);
                        }}
                        onClose={() => setOpenFirstCalendar(false)}
                        onChange={(date: MaterialUiPickersDate) => {
                          setStartDate(date);
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        keyboardIcon={<img src={icons.calendarIcon} alt="iconCalendar" />}
                      />
                      <div className="mr8px"></div>
                      <KeyboardDatePicker
                        inputProps={{ className: classes.root }}
                        open={openSecondCalendar}
                        onClick={() => setOpenSecondCalendar(true)}
                        onClose={() => setOpenSecondCalendar(false)}
                        onChange={(date: MaterialUiPickersDate) => {
                          setFinishDate(date);
                        }}
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        placeholder="ДД/ММ/ГГГГ"
                        value={finishDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        keyboardIcon={<img src={icons.calendarIcon} alt="iconCalendar" />}
                        helperText={null}
                      />
                    </MuiPickersUtilsProvider>
                  </div>

                  <h4 className="info-by-bluetooth__title">Тип устройства</h4>

                  <Form.Group>
                    <Form.Check
                      checked={items.some((i) => i === "Электроэнергия")}
                      name="residue"
                      type="checkbox"
                      label="Электроэнергия"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItems([...items, "Электроэнергия"]);
                        } else {
                          setItems(items.filter((i) => i !== "Электроэнергия"));
                        }
                      }}
                    />
                  </Form.Group>
                  <div className="mb12px"></div>
                  <Form.Group>
                    <Form.Check
                      checked={items.some((i) => i === "Вода")}
                      name="residue"
                      type="checkbox"
                      label="Вода"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItems([...items, "Вода"]);
                        } else {
                          setItems(items.filter((i) => i !== "Вода"));
                        }
                      }}
                    />
                  </Form.Group>
                  <div className="mb12px"></div>
                  <Form.Group>
                    <Form.Check
                      checked={items.some((i) => i === "Газ")}
                      name="residue"
                      type="checkbox"
                      label="Газ"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItems([...items, "Газ"]);
                        } else {
                          setItems(items.filter((i) => i !== "Газ"));
                        }
                      }}
                    />
                  </Form.Group>
                  <div className="mb12px"></div>

                  <h4 className="info-by-bluetooth__title">Сервис</h4>
                  <Form.Group>
                    <Form.Check
                      checked={items2.some((i) => i === "MeterService")}
                      name="residue"
                      type="checkbox"
                      label="MeterService"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItems2([...items2, "MeterService"]);
                        } else {
                          setItems2(items2.filter((i) => i !== "MeterService"));
                        }
                      }}
                    />
                  </Form.Group>
                  <div className="mb12px"></div>
                  <Form.Group>
                    <Form.Check
                      checked={items2.some((i) => i === "ElectricService")}
                      name="residue"
                      type="checkbox"
                      label="ElectricService"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItems2([...items2, "ElectricService"]);
                        } else {
                          setItems2(items2.filter((i) => i !== "ElectricService"));
                        }
                      }}
                    />
                  </Form.Group>
                  <div className="mb12px"></div>
                  <Form.Group>
                    <Form.Check
                      checked={items2.some((i) => i === "WaterService")}
                      name="residue"
                      type="checkbox"
                      label="WaterService"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItems2([...items2, "WaterService"]);
                        } else {
                          setItems2(items2.filter((i) => i !== "WaterService"));
                        }
                      }}
                    />
                  </Form.Group>
                  <div className="mb12px"></div>
                  <Form.Group>
                    <Form.Check
                      checked={items2.some((i) => i === "GasService")}
                      name="residue"
                      type="checkbox"
                      label="GasService"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItems2([...items2, "GasService"]);
                        } else {
                          setItems2(items2.filter((i) => i !== "GasService"));
                        }
                      }}
                    />
                  </Form.Group>

                  <div className="logs__btns d-flex">
                    <MainButton
                      isSecondary
                      title="Сбросить"
                      style={{ width: 100, height: 40, fontSize: 14 }}
                      onClick={() => {
                        setInputValue("");
                        setItems([]);
                        setStartDate(null);
                        setFinishDate(null);
                        setPage(1);
                        setFilterIsPopoverOpen(false);
                        getSystemsLogsCallback(1, "asc", "", null, null, [], []);
                      }}
                    />
                    <div className="mr16px"></div>
                    <MainButton
                      title="Применить"
                      style={{ width: 194, height: 40, fontSize: 14 }}
                      onClick={() => {
                        setFilterIsPopoverOpen(false);
                        getSystemsLogsCallback(1);
                      }}
                    />
                  </div>
                </div>
              }
            >
              <div
                onClick={() => setFilterIsPopoverOpen(true)}
                onMouseOver={() => {
                  setIsFilterIconHover(true);
                }}
                onMouseLeave={() => setIsFilterIconHover(false)}
                className={
                  isFilterPopoverOpen
                    ? "info-by-bluetooth__filter-icon info-by-bluetooth__filter-icon--open d-flex justify-content-center align-items-center"
                    : "info-by-bluetooth__filter-icon d-flex justify-content-center align-items-center"
                }
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 15.75C9 15.5511 9.07902 15.3603 9.21967 15.2197C9.36032 15.079 9.55109 15 9.75 15H14.25C14.4489 15 14.6397 15.079 14.7803 15.2197C14.921 15.3603 15 15.5511 15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5H9.75C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75ZM6 11.25C6 11.0511 6.07902 10.8603 6.21967 10.7197C6.36032 10.579 6.55109 10.5 6.75 10.5H17.25C17.4489 10.5 17.6397 10.579 17.7803 10.7197C17.921 10.8603 18 11.0511 18 11.25C18 11.4489 17.921 11.6397 17.7803 11.7803C17.6397 11.921 17.4489 12 17.25 12H6.75C6.55109 12 6.36032 11.921 6.21967 11.7803C6.07902 11.6397 6 11.4489 6 11.25ZM3 6.75C3 6.55109 3.07902 6.36032 3.21967 6.21967C3.36032 6.07902 3.55109 6 3.75 6H20.25C20.4489 6 20.6397 6.07902 20.7803 6.21967C20.921 6.36032 21 6.55109 21 6.75C21 6.94891 20.921 7.13968 20.7803 7.28033C20.6397 7.42098 20.4489 7.5 20.25 7.5H3.75C3.55109 7.5 3.36032 7.42098 3.21967 7.28033C3.07902 7.13968 3 6.94891 3 6.75Z"
                    fill={isFilterPopoverOpen || isFilterIconHover ? "#fff" : "#8A93A2"}
                  />
                </svg>
              </div>
            </Popover>
          </InputGroup.Prepend>
        </InputGroup>

        <div className="mr12px"></div>

        <Button
          className="info-by-bluetooth__btn"
          onClick={() => {
            getSystemsLogsCallback(1);
            setPage(1);
          }}
          disabled={loading}
        >
          {loading ?
            <Spinner animation="border" size="sm" color="white" />
            : "Найти"
          }
        </Button>

        <div className="mr12px"></div>

        <SortByButton
          getBtnValue={(value) => {
            setSortBy(value);
            getSystemsLogsCallback(page, value);
          }}
        />
      </div>

      <div className="logs__wrap">
        <Row className="logs__rows">
          <Col xl={2} className="logs__col">
            Дата и время
          </Col>
          <Col className="logs__col">Сервис</Col>
          <Col className="logs__col">Тип устройства</Col>
          <Col className="logs__col">Серийный №</Col>
          <Col className="logs__col">Действие</Col>
        </Row>

        {deviceLogs !== null &&
          deviceLogs.data.map((d, index) => {
            return (
              <Row key={d.createdAt + index} className="logs__rows">
                <Col xl={2} className="logs__col logs__col--secondary">
                  {d.createdAt ? moment(d.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
                </Col>
                <Col className="logs__col logs__col--secondary">{d.serviceName}</Col>
                <Col className="logs__col logs__col--secondary">{`${d.meterCommonType || "-"} ${d.meterSpecificType || "-"
                  }`}</Col>
                <Col className="logs__col logs__col--secondary">{d.meterSerialNumber || "-"}</Col>
                <Col className="logs__col logs__col--secondary">{d.action || "-"}</Col>
              </Row>
            );
          })}
      </div>

      <div className="mb20px"></div>

      <Pagination
        totalPage={deviceLogs !== null ? deviceLogs.totalPage : 1}
        page={page}
        onPageChanged={(page) => {
          window.scrollTo(0, 0);
          getSystemsLogsCallback(page);
          setPage(page);
        }}
      />
    </div>
  );
};
