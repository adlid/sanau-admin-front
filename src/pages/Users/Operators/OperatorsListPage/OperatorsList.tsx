import React, { useState, useEffect } from "react";

import { AddButton } from "../../../../components/uiKit/Buttons/AddButton";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { OperatorsListItem } from "./components/OperatorsListItem";

//redux
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { useHistory } from "react-router";
import * as queryString from "querystring";

import { Search } from "../../../../components/uiKit/Search";
import { IOperatorsListItemWithSelect } from "../../../../ts/interfaces/users.interface";
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";

import { operatorsFilteredListThunk } from "../../../../store/slicesAndThunks/users/operators/operators.thunks";
import { Pagination } from "../../../../components/uiKit/Pagination";
import {
  addOperatorsIdToArr,
  removeOperatorsIdFromArr,
  selectAllOperators,
  removeSelectAllOperators,
} from "../../../../store/slicesAndThunks/users/operators/operators.slices";
import { Drawer, Popper } from "@material-ui/core";
import { AccessRightsSideBar } from "./components/AccessRightsSideBar/AccessRightsSideBar";
import { useSnackbar } from "notistack";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { operatorsSortList } from "../../../../ts/types/templates.types";
import { DeleteOperatorModal } from "../../../../components/uiKit/modals/DeleteOperatorModal/DeleteOperatorModal";
import { OperatorsFilter } from "../components/OperatorsFilter/OperatorsFilter";

import { ReactComponent as FilterIcon } from "../../../../assets/imgs/filter.svg";
import { ReactComponent as UpDownIcon } from "../../../../assets/imgs/updownArrows.svg";
import { ReactComponent as ArrowDown } from "../../../../assets/imgs/arrowDown.svg";
import { CustomRadio } from "../../../../components/uiKit/Inputs/CustomRadio";
import { AppPopper } from "../../../../components/Tooltip/AppPopper";

export const OperatorsList = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { page }: any = queryString.parse(history.location.search.substring(1));

  const { selectedAllOperators, operatorsListArr, metersId } = useTypedSelector((state) => state.operators);

  const [isScroll, handleIsScroll] = useState<boolean>(false);
  const [operatorsLoading, setOperatorsLoading] = useState<boolean>(false);

  const addMetersIdToArrCallBack = (id: string) => dispatch(addOperatorsIdToArr(id));
  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeOperatorsIdFromArr(id));

  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  // FILTER OPERATORS PARAMS
  const [filterState, setFilterState] = useState<string>("");
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null); //DATES
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);
  const [query, setQuery] = useState<string>("");

  const [status, setStatus] = useState<any>([]); // selected statuses
  const [sort, setSort] = useState<any>("asc"); // selected sort name
  const [selectedRights, setSelectedRights] = React.useState<string[]>([]); // selected rights
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRights(event.target.value as string[]);
  };

  const dropFilters = () => {
    setQuery("");
    setStatus([]);
    setSelectedRights([]);
    setStartDate(null);
    setFinishDate(null);
    setAnchorEl(null);
    setAnchorSort(null);
    setFilterState("drop");
  };

  useEffect(() => {
    if (filterState === "drop") {
      history.push({ search: `?page=${1}` });
      page == 1 && getOperatorsList();
      setFilterState("");
    }
  }, [filterState]);

  // FILTER POPPER
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: any = (event: any) => setAnchorEl(anchorEl ? null : event.currentTarget);
  // SORT POPPER
  const [anchorSort, setAnchorSort] = useState<null | HTMLElement>(null);
  const handleClickSort: any = (event: any) => setAnchorSort(anchorSort ? null : event.currentTarget);
  // DELETE MODAL
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const openDeleteModal = (id: string) => {
    setSelectedOperator(id);
    setDeleteModalOpen(true);
  };

  const onAccessTemplatesBtnClick = () => {
    if (metersId.length > 0) {
      setSideBarOpen(true);
    } else enqueueSnackbar("Выберите операторов", { variant: "error" });
  };

  const getOperatorsList = async () => {
    setOperatorsLoading(true);
    await dispatch(
      operatorsFilteredListThunk({
        options: {
          status: status,
          privileges: selectedRights,
          createFrom: startDate,
          createTo: finishDate,
          query,
        },
        sortBy: sort,
        page,
      })
    );
    setOperatorsLoading(false);
  };

  useEffect(() => {
    getOperatorsList();
  }, [page, sort]);

  return (
    <>
      <DeleteOperatorModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        operatorId={selectedOperator}
      />
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          <AccessRightsSideBar close={sideBarToggle(false)} />
        </div>
      </Drawer>

      <div className="operators-list" onClick={() => anchorEl !== null && setAnchorEl(null)}>
        <div className="container_block">
          <h2 className="container_block__title">Операторы</h2>
          <div className="operators-list__search-block">
            <div style={{ display: "flex", width: "100%" }}>
              <Search
                placeholder="Фамилия, имя, отдел"
                value={query}
                onChange={(value: string) => setQuery(value)}
                onEnterPress={getOperatorsList}
              />
              {/* FILTER MENU */}
              <Button onClick={handleClick} className="operators-list__filter-btn">
                <FilterIcon />
              </Button>
            </div>

            {/* SORT MENU */}
            <AppPopper
              gap="5px"
              content={
                <div className="operators-list__sort-block">
                  {operatorsSortList.map((state, index) => {
                    return (
                      <div key={index} className="operators-list__sort-block__checkbox">
                        <CustomRadio
                          isSecondary
                          title={`${state.label}`}
                          value={`${state.value}`}
                          selectedRadioValue={sort}
                          onClick={(target) => setSort(target)}
                        />
                      </div>
                    );
                  })}
                </div>
              }
              placement="bottom-end"
            >
              <Button onClick={handleClickSort} className="sortBtn">
                <UpDownIcon />
                Сортировать
                <div className={anchorSort ? "arrIcon" : "arrIcon arrIcon--rotated"}>
                  <ArrowDown />
                </div>
              </Button>
            </AppPopper>

            <MainButton
              isSecondary={true}
              title="Настроить права доступа"
              style={{ width: 212, fontSize: 14, height: 40 }}
              onClick={onAccessTemplatesBtnClick}
            />
            <AddButton
              title="Добавить"
              style={{ width: 123, height: 40, fontSize: 14 }}
              onClick={() => history.push("/admin/users/operators/create")}
            />
          </div>

          <div className="operators-list__table-block">
            <Row className="operators-list__table-group">
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column table-group__column-checkbox">
                <input
                  type="checkbox"
                  className="checkbox-table"
                  checked={selectedAllOperators && metersId.length === operatorsListArr?.data.length}
                  onChange={(e) => {
                    if (e.target.checked) dispatch(selectAllOperators());
                    else dispatch(removeSelectAllOperators());
                  }}
                />
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="operators-list__card-title">№</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="operators-list__card-title">Дата рег-ции</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="operators-list__card-title">Логин</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="operators-list__card-title">ФИО</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="operators-list__card-title">Должность</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="operators-list__card-title">Телефон</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4}>
                <span className="operators-list__card-title">Email</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4}>
                <span className="operators-list__card-title">Права</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4}>
                <span className="operators-list__card-title">Посл. активность</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4}>
                <span className="operators-list__card-title">Статус</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} style={{ textAlign: "right" }}>
                <span className="operators-list__card-title">Действия</span>
              </Col>
            </Row>
            <hr className="tableHeaderLine" />

            <div className="operators-list__wrap" onScroll={() => handleIsScroll(true)}>
              {operatorsLoading ? (
                <div className="operators-list__preloader">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : !operatorsListArr?.data.length || operatorsListArr === null ? (
                <div className="operators-list__preloader">
                  <p>Список пуст</p>
                </div>
              ) : (
                operatorsListArr.data.map((operator: IOperatorsListItemWithSelect, index: any) => {
                  return (
                    <OperatorsListItem
                      key={operator.id}
                      number={page == 1 ? index + 1 : (page - 1) * 10 + (index + 1)}
                      isScroll={isScroll}
                      handleIsScroll={handleIsScroll}
                      operatorData={operator}
                      addOperatorsIdToArrCallBack={addMetersIdToArrCallBack}
                      removeOperatorsIdFromArrCallBack={removeMetersIdFromArrCallBack}
                      openDeleteModal={openDeleteModal}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="indication-meters-list__pagination">
            <Pagination
              page={page !== undefined ? +page : 1}
              totalPage={operatorsListArr?.totalPage || 0}
              onPageChanged={(page) => history.push({ search: `?page=${page}` })}
            />
          </div>
        </div>
      </div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ paddingTop: "5px", position: "relative" }}
      >
        <div>
          <OperatorsFilter
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
          />
        </div>
      </Popper>
    </>
  );
};
