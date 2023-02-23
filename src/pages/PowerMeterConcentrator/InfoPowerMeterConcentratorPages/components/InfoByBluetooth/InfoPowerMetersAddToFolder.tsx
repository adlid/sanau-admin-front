import { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
// components
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { getGPRSMetersList } from "../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.thunk";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import { AppPopper } from "../../../../../components/Tooltip/AppPopper";
import { groupItemsImages } from "../../../../../ts/types/groupcontrol.types";
import { ReactComponent as ArrowUp } from "../../../../../assets/imgs/arrowUp.svg";
import { Search } from "../../../../../components/uiKit/Search";
import { CustomRadio } from "../../../../../components/uiKit/Inputs/CustomRadio";
import { MeterListItem } from "../../../../GroupsControl/components/Power/PowerCreateGroup/components/Meters/MeterListItem";
import { ConcentratorMeterItem } from "../InfoByTCP/components/ConcentratorMeterItem";
import { getDinRailMetersList } from "../../../../../store/slicesAndThunks/powerConcentrator/dinRail/dinRail.thunk";
import { getOtanMetersList } from "../../../../../store/slicesAndThunks/powerConcentrator/otan/otan.thunk";
import { addMetersToFolderThunk } from "../../../../../store/slicesAndThunks/powerIndication/powerIndication.thunks";

const searchCategories = [
  { title: "ФИО пользователя", value: "name" },
  { title: "Лицевой счет", value: "accountNumber" },
  { title: "Серийный №", value: "serial" },
  { title: "Наименование счетчика", value: "meterName" },
];

interface IProps { }

export const InfoPowerMetersAddToFolder: FC<IProps> = (props) => {
  const { } = props;
  //   hooks
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search)

  const [meterType, setMeterType] = useState<'gprs' | 'dinrail' | 'bluetooth' | 'otan' | null>(null)
  const [folderId, setFolderId] = useState<string | null>(null)

  const [inputValue, setInputValue] = useState("")
  const [searchCategory, setSearchCategory] = useState<string>("personalAccountNumber");
  const [searchCategoryName, setSearchCategoryName] = useState<string>("Лицевой счет");
  const [selectedMeters, setSelectedMeters] = useState<Array<string>>([])
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectMeters = (meterId: string, type: 'add' | 'remove') => {
    if (type === 'add') {
      setSelectedMeters(state => [...state, meterId])
    } else {
      setSelectedMeters(state => state.filter(item => item !== meterId))
    }
  }

  const { GPRSMetersList, GPRSloading } = useTypedSelector(state => state.powerMeterGPRSMeter)
  const { dinRailMetersList, DinRailLoading } = useTypedSelector(state => state.powerMeterDinRailMeter)
  const { otanMetersList, otanloading } = useTypedSelector(state => state.powerMeterOtanMeter)
  // const { GPRSMetersList, GPRSloading } = useTypedSelector(state => state.powerMeterGPRSMeter)

  const getData = () => {
    if (meterType === 'gprs') {
      dispatch(getGPRSMetersList({ text: inputValue, queryType: "", folderId: "", type: "DIRECT"}));
    }
    // din-rail
    else if (meterType === 'dinrail') {
      dispatch(getDinRailMetersList({ text: inputValue, queryType: "", folderId: "" }));
    }
    // 
    else if (meterType === 'otan') {
      dispatch(getOtanMetersList({ text: inputValue, queryType: "", folderId: "" }));
    }
  }

  useEffect(() => {
    if (query.get('meterType') === 'info-by-tcp') {
      setMeterType('gprs')
    } else if (query.get('meterType') === 'info-by-rs') {
      setMeterType('dinrail')
    } else if (query.get('meterType') === 'bluetooth') {
      setMeterType('bluetooth')
    } else if (query.get('meterType') === 'info-by-otan') {
      setMeterType('otan')
    }
    setFolderId(query.get('folderId'))
  }, [])

  useEffect(() => {
    getData()
  }, [meterType, folderId])

  const handleSave = () => {
    if (folderId && meterType) {
      dispatch(addMetersToFolderThunk({ folderId, meterId: selectedMeters, type: meterType }))
    }
  }

  return (
    <div className="power_create_group__title" style={{ fontSize: "unset", fontWeight: "unset" }}>
      <h1 className="infoByBluetoothAddGroup_title">
        Добавление счетчиков в группу
      </h1>

      <div className="indication-meters-list__search-block">
        <Search value={inputValue} onChange={(value: string) => setInputValue(value)} />
        <AppPopper
          gap="1px"
          content={
            <div className="power_create_group__searchDropDown">
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

        <div className="mr12px"></div>
        <MainButton
          title="Найти"
          isSecondary
          style={{ width: 75, height: 40, fontSize: 14 }}
          onClick={() => getData()}
        // isDisabled={dataSaving}
        />
      </div>

      <div className="power-lorawan-concentrator-meter-list__header">
        {meterType === 'gprs' &&
          <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
            <Col xl={3} lg={3} md={4} sm={4}>
              <input
                type="checkbox"
                className="checkbox-table"
                checked={selectAll}
                onChange={(e) => {
                  if (e.target.checked) setSelectAll(true);
                  else setSelectAll(false);
                }}
              />
              <span style={{ marginLeft: "20px" }}>Сер.№</span>
            </Col>
            <Col xl={4} lg={4} md={4} sm={4}>
              Наименование
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Лицевой счет
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Последняя активность
            </Col>
          </Row>
        }

        {meterType === 'dinrail' &&
          <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
            <Col xl={3} lg={3} md={4} sm={4}>
              <input
                type="checkbox"
                className="checkbox-table"
                checked={selectAll}
                onChange={(e) => {
                  if (e.target.checked) setSelectAll(true);
                  else setSelectAll(false);
                }}
              />
              <span style={{ marginLeft: "20px" }}>Сер.№</span>
            </Col>
            <Col xl={4} lg={4} md={4} sm={4}>
              ID
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              IP
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Активно
            </Col>
          </Row>
        }

        {meterType === 'otan' &&
          <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
            <Col xl={3} lg={3} md={4} sm={4}>
              <input
                type="checkbox"
                className="checkbox-table"
                checked={selectAll}
                onChange={(e) => {
                  if (e.target.checked) setSelectAll(true);
                  else setSelectAll(false);
                }}
              />
              <span style={{ marginLeft: "20px" }}>Сер.№</span>
            </Col>
            <Col xl={4} lg={4} md={4} sm={4}>
              ID
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              IP
            </Col>
            <Col xl={3} lg={3} md={4} sm={4}>
              Адрес
            </Col>
          </Row>
        }

        <div style={{ marginBottom: '18px' }}></div>

        <div className="power-lorawan-concentrator-meter-list__wrap">
          {(GPRSloading || DinRailLoading) && (
            <div className="power-lorawan-concentrator-meter-list__preloader">
              <Spinner animation="border" size="sm" />
            </div>
          )}

          {meterType === 'gprs' && GPRSMetersList.map((item, index) => (
            <Row style={{ maxWidth: "100%", paddingLeft: "25px" }} key={index}>
              <Col xl={3} lg={3} md={4} sm={4}>
                <input
                  type="checkbox"
                  className="checkbox-table"
                  checked={selectedMeters.includes(item.id.toString()) || selectAll}
                  onChange={(e) => {
                    if (e.target.checked) handleSelectMeters(item.id.toString(), 'add');
                    else handleSelectMeters(item.id.toString(), 'remove');
                  }}
                />
                <span style={{ marginLeft: "20px" }}>{item.deviceId}</span>
              </Col>
              <Col xl={4} lg={4} md={4} sm={4}>{item.apnName}</Col>
              <Col xl={2} lg={2} md={4} sm={4}>{item.personalAccountNumber}</Col>
              <Col xl={2} lg={2} md={4} sm={4}>{item.lastFixDate}</Col>
            </Row>
          ))}

          {meterType === 'dinrail' && dinRailMetersList.map((item, index) => (
            <Row style={{ maxWidth: "100%", paddingLeft: "25px" }} key={index}>
              <Col xl={3} lg={3} md={4} sm={4}>
                <input
                  type="checkbox"
                  className="checkbox-table"
                  checked={selectedMeters.includes(item.id) || selectAll}
                  onChange={(e) => {
                    if (e.target.checked) handleSelectMeters(item.id, 'add');
                    else handleSelectMeters(item.id, 'remove');
                  }}
                />
                <span style={{ marginLeft: "20px" }}>{item.deviceId}</span>
              </Col>
              <Col xl={4} lg={4} md={4} sm={4}>{item.id}</Col>
              <Col xl={2} lg={2} md={4} sm={4}>{item.ip}</Col>
              <Col xl={2} lg={2} md={4} sm={4}>{item.active ? 'Да' : 'Нет'}</Col>
            </Row>
          ))}

          {meterType === 'otan' && otanMetersList.map((item, index) => (
            <Row style={{ maxWidth: "100%", paddingLeft: "25px" }} key={index}>
              <Col xl={3} lg={3} md={4} sm={4}>
                <input
                  type="checkbox"
                  className="checkbox-table"
                  checked={selectedMeters.includes(item.id) || selectAll}
                  onChange={(e) => {
                    if (e.target.checked) handleSelectMeters(item.id, 'add');
                    else handleSelectMeters(item.id, 'remove');
                  }}
                />
                <span style={{ marginLeft: "20px" }}>{item.deviceId}</span>
              </Col>
              <Col xl={4} lg={4} md={4} sm={4}>{item.id}</Col>
              <Col xl={2} lg={2} md={4} sm={4}>{item.ip}</Col>
              <Col xl={3} lg={3} md={4} sm={4}>{item.location}</Col>
            </Row>
          ))}
        </div>

        <div style={{ marginBottom: '18px' }}></div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <MainButton
            title="Сохранить"
            style={{ width: 122, fontSize: 14, height: 40 }}
            isDisabled={(!selectAll && !selectedMeters.length)
              || folderId === null
              || GPRSloading
              || otanloading
              || DinRailLoading
            }
            onClick={(e) => {
              e.preventDefault();
              handleSave();
              pathname.includes("/bluetooth")
                ? history.push(
                  "/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-bluetooth&bluetoothPage=1"
                )
                : history.push("/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-tcp&page=1");
            }}
          />

          <MainButton
            isSecondary
            title="Отмена"
            style={{ width: 86, fontSize: 14, height: 40 }}
            onClick={(e) => {
              e.preventDefault();
              pathname.includes("/bluetooth")
                ? history.push(
                  "/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-bluetooth&bluetoothPage=1"
                )
                : history.push("/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-tcp&page=1");
            }}
          />
        </div>
      </div>
    </div>
  );
};
