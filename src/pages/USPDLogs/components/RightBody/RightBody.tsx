import * as queryString from "querystring";
import { Popper } from "@material-ui/core";
import React, { FC, useRef, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
// components
import { Search } from "../../../../components/uiKit/Search";
import { ReactComponent as FilterIcon } from "../../../../assets/imgs/filter.svg";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { LogsMetersItem } from "../LogsMetersItem";
import { Pagination } from "../../../../components/uiKit/Pagination";
import { useHistory } from "react-router";

interface IProps {
  logsFetching: boolean;
  headerHeight: number;
}

export const RightBody: FC<IProps> = (props) => {
  const { logsFetching, headerHeight } = props;

  // hooks
  const history = useHistory();
  const dispatch = useAppDispatch();

  // data from redux and url
  const { uspdLogs } = useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator);
  const { page }: any = queryString.parse(history.location.search.substring(1));

  // other data handlers
  const [query, setQuery] = useState<string>("");

  //   filter
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick: any = (event: any) => setAnchorEl(anchorEl ? null : event.currentTarget);

  return (
    <>
      <div
        className="uspdLogs_right__body"
        style={{
          height: `calc(100% - ${headerHeight}px - 16px)`,
          background: "#ffffff",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <Search
            placeholder="Пользователь, логин"
            value={query}
            onChange={(value: string) => setQuery(value)}
            onEnterPress={() => {}}
          />
          {/* FILTER MENU */}
          <Button onClick={handleClick} className="operators-list__filter-btn">
            <FilterIcon />
          </Button>

          <Button className="sortBtn" style={{ marginLeft: "12px", height: "40px" }}>
            Найти
          </Button>
        </div>

        <div className="uspdLogs-list__table-block">
          <Row className="uspdLogs-list__table-group">
            <Col xl={2} lg={2} md={4} sm={4} className="uspdTable-group__column">
              <span className="uspdLogs-list__card-title">Дата и время</span>
            </Col>
            <Col xl={2} lg={2} md={4} sm={4} className="uspdTable-group__column">
              <span className="uspdLogs-list__card-title">Пользователь</span>
            </Col>
            <Col xl={2} lg={2} md={4} sm={4} className="uspdTable-group__column">
              <span className="uspdLogs-list__card-title">Адрес</span>
            </Col>
            <Col xl={2} lg={2} md={4} sm={4} className="uspdTable-group__column">
              <span className="uspdLogs-list__card-title">Логин</span>
            </Col>
            <Col xl={3} lg={3} md={4} sm={4} className="uspdTable-group__column">
              <span className="uspdLogs-list__card-title">Детали</span>
            </Col>
            <Col xl={1} lg={1} md={4} sm={4} className="uspdTable-group__column">
              <span className="uspdLogs-list__card-title">Статус</span>
            </Col>
          </Row>
          <hr style={{ height: 2, margin: 0, backgroundColor: "#D7E2F2", border: "none" }} />

          <div className="uspdLogs-list__wrap">
            {logsFetching ? (
              <div className="uspdLogs-list__preloader">
                <Spinner animation="border" size="sm" />
              </div>
            ) : uspdLogs === null || uspdLogs?.data.length === 0 ? (
              <div className="uspdLogs-list__preloader">
                <p>Нет данных</p>
              </div>
            ) : (
              uspdLogs.data.map((log: any, index: number) => {
                return <LogsMetersItem logData={log} />;
              })
            )}
          </div>
        </div>

        <div className="indication-meters-list__pagination">
          {uspdLogs && (
            <Pagination
              totalPage={uspdLogs?.totalPage}
              page={page ? +page : 1}
              onPageChanged={(page) => history.push({ search: `?page=${page}` })}
            />
          )}
        </div>
      </div>

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ paddingTop: "5px", position: "relative" }}
      >
        <div>
          {/* <OperatorsFilter
            startDate={startDate}
            setStartDate={setStartDate}
            finishDate={finishDate}
            setFinishDate={setFinishDate}
            selectedRights={selectedRights}
            handleChange={handleChange}
            status={status}
            setStatus={setStatus}
            dropFilters={dropFilters}
            getOperatorsList={getOperatorsList}
            setAnchorEl={setAnchorEl}
            setAnchorSort={setAnchorSort}
          /> */}
        </div>
      </Popper>
    </>
  );
};
