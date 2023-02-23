import React, { useEffect, useState } from "react";
import * as queryString from "querystring";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { AppPopper } from "../../../../../../../components/Tooltip/AppPopper";
import { ReactComponent as ArrowUp } from "../../../../../../../assets/imgs/arrowUp.svg";
import { CustomRadio } from "../../../../../../../components/uiKit/Inputs/CustomRadio";
import { Search } from "../../../../../../../components/uiKit/Search";
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import { SaveCancelBtns } from "../SaveCancelBtns";
import { useHistory } from "react-router";
import { MeterListItem } from "./MeterListItem";
import {
  removeAllMeters,
  selectAllMeters,
} from "../../../../../../../store/slicesAndThunks/groupControl/groupControl.slices";
import {
  getGroupTreeItemMaterIndicatorsListThunk,
  saveGroupItemMeterIndicatorsThunk,
} from "../../../../../../../store/slicesAndThunks/groupControl/groupControl.thunks";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
import { Popover } from "react-tiny-popover";

interface ISearchCategories {
  title: string;
  value: string;
}

const searchCategories: ISearchCategories[] = [
  { title: "ФИО пользователя", value: "fio" },
  { title: "Лицевой счет", value: "personalAccountNumber" },
  { title: "Серийный №", value: "serialNumber" },
  { title: "Наименование счетчика", value: "title" },
];

export const Meters = (props: any) => {
  const { tabValue } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();

  // MAIN DATA
  const [currentGroupId, setCurrentGroupId] = useState<string>("");
  const { groupId }: any = queryString.parse(history.location.search.substring(1));
  const { metersList, selectedMeters, removedChildrenKey } = useTypedSelector((state) => state.groupsControl);

  // METERS PAGE NUMBER HANDLERS
  const [pageNum, setPageNum] = useState<number>(1);

  // LOADERS
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [dataSaving, setDataSaving] = useState<boolean>(false);

  // FILTER POPPER
  const [items, setItems] = useState<Array<string>>([]);
  const [isFilterPopoverOpen, setFilterIsPopoverOpen] = useState(false);

  // SEARCH
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("personalAccountNumber");
  const [searchCategoryName, setSearchCategoryName] = useState<string>("Лицевой счет");

  const getMetersData = async (pageNum: number, arr = items) => {
    setDataLoading(true);
    await dispatch(
      getGroupTreeItemMaterIndicatorsListThunk({
        filterData: {
          field: searchCategory,
          query: searchValue,
          key: groupId,
          specificType: arr,
        },
        page: pageNum,
      })
    );
    setDataLoading(false);
  };

  useEffect(() => {
    groupId && setCurrentGroupId(groupId);
  }, [groupId]);

  useEffect(() => {
    currentGroupId && getMetersData(1);
  }, [currentGroupId, tabValue]);

  const onSaveClick = async () => {
    setDataSaving(true);
    await dispatch(
      saveGroupItemMeterIndicatorsThunk({
        parentKey: groupId,
        childrenKey: selectedMeters,
        removedChildrenKey: removedChildrenKey,
      })
    );
    setDataSaving(false);
  };

  return (
    <>
      <div className="water_create_group__title" style={{ fontSize: "unset", fontWeight: "unset" }}>
        <div className="indication-meters-list__search-block">
          <Search value={searchValue} onChange={(value: string) => setSearchValue(value)} />
          <AppPopper
            gap="1px"
            content={
              <div className="water_create_group__searchDropDown">
                {searchCategories.map((category, index) => {
                  return (
                    <div key={index} className="dropDownItem">
                      <CustomRadio
                        title={category.title}
                        value={category.value}
                        selectedRadioValue={searchCategory}
                        onClick={(target) => {
                          setSearchCategoryName(category.title);
                          setSearchCategory(target);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            }
            placement="bottom-start"
          >
            <div style={{ position: "relative", width: "180px", height: "40px" }}>
              <div className="dropDownMenu_selected searchDropDownMenu_selected">
                <p className="title">{searchCategoryName}</p>
                <ArrowUp style={{ marginLeft: "20px" }} />
              </div>
            </div>
          </AppPopper>

          <div className="mr12px"></div>

          <Popover
            isOpen={isFilterPopoverOpen}
            padding={10}
            positions={["bottom", "left"]}
            containerClassName="info-by-bluetooth__popover-container"
            onClickOutside={() => {
              setFilterIsPopoverOpen(false);
            }}
            content={
              <div className="power_create_group__popover">
                <Form.Group>
                  <Form.Check
                    checked={items.some((i) => i === "water-lorawan")}
                    name="residue"
                    type="checkbox"
                    label="Подключение через LoRaWAN и UDP 
          "
                    onChange={(e) => {
                      if (e.target.checked) {
                        setItems([...items, "water-lorawan"]);
                      } else {
                        setItems(items.filter((i) => i !== "water-lorawan"));
                      }
                    }}
                  />
                </Form.Group>
                <div className="mb12px" />
                <Form.Group>
                  <Form.Check
                    checked={items.some((i) => i === "water-web-socket")}
                    name="residue"
                    type="checkbox"
                    label="Подключение через LoRaWAN и WS"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setItems([...items, "water-web-socket"]);
                      } else {
                        setItems(items.filter((i) => i !== "water-web-socket"));
                      }
                    }}
                  />
                </Form.Group>
                <div className="mb12px" />
                <div className="d-flex">
                  <MainButton
                    isSecondary
                    title="Сбросить"
                    style={{ width: 100, height: 40, fontSize: 14 }}
                    onClick={() => {
                      setFilterIsPopoverOpen(false);
                      setItems([]);
                      getMetersData(1, []);
                    }}
                  />
                  <div className="mr16px"></div>
                  <MainButton
                    title="Применить"
                    style={{ width: 194, height: 40, fontSize: 14 }}
                    onClick={() => {
                      setFilterIsPopoverOpen(false);
                      getMetersData(1);
                    }}
                  />
                </div>
              </div>
            }
          >
            <div
              onClick={() => setFilterIsPopoverOpen(true)}
              className="power_create_group__filter-btn power_create_group__filter-btn--params"
            >
              <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 9.75C6 9.55109 6.07902 9.36032 6.21967 9.21967C6.36032 9.07902 6.55109 9 6.75 9H11.25C11.4489 9 11.6397 9.07902 11.7803 9.21967C11.921 9.36032 12 9.55109 12 9.75C12 9.94891 11.921 10.1397 11.7803 10.2803C11.6397 10.421 11.4489 10.5 11.25 10.5H6.75C6.55109 10.5 6.36032 10.421 6.21967 10.2803C6.07902 10.1397 6 9.94891 6 9.75ZM3 5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H14.25C14.4489 4.5 14.6397 4.57902 14.7803 4.71967C14.921 4.86032 15 5.05109 15 5.25C15 5.44891 14.921 5.63968 14.7803 5.78033C14.6397 5.92098 14.4489 6 14.25 6H3.75C3.55109 6 3.36032 5.92098 3.21967 5.78033C3.07902 5.63968 3 5.44891 3 5.25ZM0 0.75C0 0.551088 0.0790178 0.360322 0.21967 0.21967C0.360322 0.0790178 0.551088 0 0.75 0H17.25C17.4489 0 17.6397 0.0790178 17.7803 0.21967C17.921 0.360322 18 0.551088 18 0.75C18 0.948912 17.921 1.13968 17.7803 1.28033C17.6397 1.42098 17.4489 1.5 17.25 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790178 1.13968 0 0.948912 0 0.75Z"
                  fill="white"
                />
              </svg>
            </div>
          </Popover>

          <div className="mr12px"></div>
          <MainButton
            title="Найти"
            isSecondary
            style={{ width: 75, height: 40, fontSize: 14 }}
            onClick={() => getMetersData(1)}
            isDisabled={dataSaving}
          />
        </div>

        <div className="water_create_group__table-block">
          <Row className="water_create_group__table-group">
            <Col
              xl={1}
              lg={1}
              md={4}
              sm={4}
              className="water_create_group__table-group__column water_create_group__table-group__column-checkbox"
            >
              <input
                type="checkbox"
                className="checkbox-table"
                checked={
                  metersList?.data.length !== 0 &&
                  metersList?.data.filter((meter) => selectedMeters.includes(meter.groupMeter.key)).length ===
                    metersList?.data.length
                }
                onChange={(e) => {
                  if (
                    metersList?.data.filter((meter) => selectedMeters.includes(meter.groupMeter.key)).length !==
                    metersList?.data.length
                  )
                    dispatch(selectAllMeters());
                  else dispatch(removeAllMeters());
                }}
              />
            </Col>
            <Col xl={1} lg={1} md={3} sm={3} className="water_create_group__table-group__column">
              <span className="water_create_group__card-title">Сер.№</span>
            </Col>
            <Col xl={3} lg={3} md={3} sm={3} className="water_create_group__table-group__column">
              <span className="water_create_group__card-title">Наименование</span>
            </Col>
            <Col xl={3} lg={3} md={3} sm={3} className="water_create_group__table-group__column">
              <span className="water_create_group__card-title">Лицевой счет</span>
            </Col>
            <Col xl={4} lg={4} md={4} sm={4} className="water_create_group__table-group__column">
              <span className="water_create_group__card-title">ФИО</span>
            </Col>
          </Row>
          <hr className="tableHeaderLine" />

          <div className="water_create_group__wrap">
            {!metersList?.data.length || metersList === null ? (
              dataLoading ? (
                <div className="water_create_group__preloader">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                <p className="water_create_group__preloader">Список пуст</p>
              )
            ) : (
              metersList.data.map((meter: any, index: any) => {
                return <MeterListItem meterData={meter} />;
              })
            )}
          </div>
        </div>
      </div>

      <SaveCancelBtns
        onSaveClick={onSaveClick}
        dataSaving={dataSaving}
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={metersList?.totalPage}
        onPageChange={getMetersData}
        pagination
      />
    </>
  );
};



