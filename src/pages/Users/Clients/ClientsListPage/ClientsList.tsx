import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import * as queryString from "querystring";
import { Popper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
// ts
import { clientsSortList } from "../../../../ts/types/templates.types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { IDetailClientProps } from "../../../../ts/interfaces/users.interface";
// icons
import { ReactComponent as FilterIcon } from "../../../../assets/imgs/filter.svg";
import { ReactComponent as ArrowDown } from "../../../../assets/imgs/arrowDown.svg";
import { ReactComponent as UpDownIcon } from "../../../../assets/imgs/updownArrows.svg";
// components
import { Search } from "../../../../components/uiKit/Search";
import { ClientsListItem } from "./components/ClientsListItem";
import { Pagination } from "../../../../components/uiKit/Pagination";
import { AppPopper } from "../../../../components/Tooltip/AppPopper";
import { ClientsFilter } from "../components/ClientsFilter/ClientsFilter";
import { AddButton } from "../../../../components/uiKit/Buttons/AddButton";
import { CustomRadio } from "../../../../components/uiKit/Inputs/CustomRadio";
import { DeleteClientModal } from "../../../../components/uiKit/modals/DeleteClientModal/DeleteClientModal";
// redux
import { CreateIcon } from "../../../../assets/imgs/CreateIcon";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { clientsFilteredListThunk } from "../../../../store/slicesAndThunks/users/clients/clients.thunks";

export const ClientsList = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { page }: any = queryString.parse(history.location.search.substring(1));

  const { clientsListArr } = useTypedSelector((state) => state.clients);

  const [isScroll, handleIsScroll] = useState<boolean>(false);
  const [clientsLoading, setClientsLoading] = useState<boolean>(false);

  // FILTER OPERATORS PARAMS
  const [filterState, setFilterState] = useState<string>("");
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null); //DATES
  const [finishDate, setFinishDate] = useState<MaterialUiPickersDate | null>(null);
  const [query, setQuery] = useState<string>("");

  const [status, setStatus] = useState<string>("ALL"); // selected statuses
  const [types, setTypes] = useState<string>("ALL"); // selected statuses
  const [sort, setSort] = useState<string>("def"); // selected sort name

  const dropFilters = () => {
    setQuery("");
    setStatus("ALL");
    setTypes("ALL");
    setSort("def");
    setStartDate(null);
    setFinishDate(null);
    setAnchorEl(null);
    setAnchorSort(null);
    setAnchorCreate(null);
    setFilterState("drop");
  };

  useEffect(() => {
    if (filterState === "drop") {
      history.push({ search: `?page=${1}` });
      page == 1 && getClientsList();
      setFilterState("");
    }
  }, [filterState]);

  // FILTER POPPER
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: any = (event: any) => setAnchorEl(anchorEl ? null : event.currentTarget);
  const handlerClose = () => setAnchorEl(null);
  // SORT POPPER
  const [anchorSort, setAnchorSort] = useState<null | HTMLElement>(null);
  const handleClickSort: any = (event: any) => setAnchorSort(anchorSort ? null : event.currentTarget);
  // CREATE POPPER
  const [anchorCreate, setAnchorCreate] = useState<null | HTMLElement>(null);
  const handleClickCreate: any = (event: any) => setAnchorCreate(anchorCreate ? null : event.currentTarget);
  // DELETE MODAL
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const openDeleteModal = (id: string) => {
    setSelectedOperator(id);
    setDeleteModalOpen(true);
  };

  const getClientsList = async () => {
    setClientsLoading(true);
    await dispatch(
      clientsFilteredListThunk({
        options: {
          types: [types],
          statuses: [status],
          from: startDate,
          to: finishDate,
          query: query,
        },
        sortBy: sort,
        page,
      })
    );
    setClientsLoading(false);
  };

  useEffect(() => {
    getClientsList();
  }, [page, sort]);

  return (
    <>
      <DeleteClientModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} clientId={selectedOperator} />
      <div className="clients-list" onClick={() => anchorEl !== null && setAnchorEl(null)}>
        <div className="container_block">
          <h2 className="container_block__title">Клиенты</h2>
          <div className="clients-list__search-block">
            <div style={{ display: "flex", width: "100%" }}>
              <Search
                placeholder="Фамилия, имя, отдел"
                value={query}
                onChange={(value: string) => setQuery(value)}
                onEnterPress={getClientsList}
              />

              {/* FILTER MENU */}
              <Button onClick={handleClick} className="clients-list__filter-btn">
                <FilterIcon />
              </Button>
            </div>

            {/* SORT MENU */}
            <AppPopper
              gap="5px"
              content={
                <div className="clients-list__sort-block">
                  {clientsSortList.map((state, index) => {
                    return (
                      <div key={index} className="clients-list__sort-block__checkbox">
                        <CustomRadio
                          isSecondary
                          title={`${state.label}`}
                          value={`${state.value}`}
                          selectedRadioValue={sort}
                          onClick={() => setSort(state.value)}
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

            {/* CREATE MENU */}
            <AppPopper
              gap="5px"
              content={
                <div className="clients-list__create-block">
                  <div
                    className="clients-list__create-block__item"
                    onClick={() => history.push("/admin/users/clients/create/YL")}
                  >
                    <CreateIcon />
                    <p className="clients-list__create-block__title">Юридическое лицо</p>
                  </div>
                  <div
                    className="clients-list__create-block__item"
                    onClick={() => history.push("/admin/users/clients/create/FL")}
                  >
                    <CreateIcon />
                    <p className="clients-list__create-block__title">Физическое лицо</p>
                  </div>
                </div>
              }
              placement="bottom-end"
            >
              <div onClick={handleClickCreate}>
                <AddButton title="Добавить" style={{ width: 123, height: 40, fontSize: 14 }} />
              </div>
            </AppPopper>
          </div>

          {/* TABLE */}
          <div className="clients-list__table-block">
            <Row className="clients-list__table-group">
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="clients-list__card-title">№</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                <span className="clients-list__card-title">Дата рег-ции</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="clients-list__card-title">Тип</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                <span className="clients-list__card-title">ФИО</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="clients-list__card-title">Номер лиц.счета</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="clients-list__card-title">Телефон</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4}>
                <span className="clients-list__card-title">Email</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4}>
                <span className="clients-list__card-title">Статус</span>
              </Col>
              <Col xl={1} lg={1} md={4} sm={4} style={{ textAlign: "right" }}>
                <span className="clients-list__card-title">Действия</span>
              </Col>
            </Row>
            <hr className="tableHeaderLine" />

            <div className="clients-list__wrap" onScroll={() => handleIsScroll(true)}>
              {clientsLoading ? (
                <div className="clients-list__preloader">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : !clientsListArr?.data.length || clientsListArr === null ? (
                <div className="clients-list__preloader">
                  <p>Список пуст</p>
                </div> 
              ) : (
                clientsListArr.data.map((client: IDetailClientProps, index: any) => {
                  return (
                    <ClientsListItem 
                      key={client.id}
                      number={page == 1 ? index + 1 : (page - 1) * 10 + (index + 1)}
                      isScroll={isScroll}
                      handleIsScroll={handleIsScroll}
                      clientData={client}
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
              totalPage={clientsListArr?.totalPage || 0}
              onPageChanged={(page) => history.push({ search: `?page=${page}` })}
            />
          </div>
        </div>
      </div>

      {/* FILTER BODY */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ paddingTop: "5px", position: "relative" }}
      >
        <div>
          <ClientsFilter
            startDate={startDate}
            setStartDate={setStartDate}
            finishDate={finishDate}
            setFinishDate={setFinishDate}
            status={status}
            setStatus={setStatus}
            types={types}
            setTypes={setTypes}
            dropFilters={dropFilters}
            getClientsList={getClientsList}
            setAnchorEl={setAnchorEl}
            setAnchorSort={setAnchorSort}
          />
        </div>
      </Popper>
    </>
  );
};
