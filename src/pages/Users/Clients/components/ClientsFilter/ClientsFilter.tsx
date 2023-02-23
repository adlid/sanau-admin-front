import { Form } from "react-bootstrap";
import React, { useState } from "react";
import ruLocale from "date-fns/locale/ru";
import { useHistory } from "react-router";
import * as queryString from "querystring";
import DateFnsUtils from "@date-io/date-fns";
import { icons } from "../../../../../utils/icons/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { MainButton } from "../../../../../components/uiKit/Buttons/MainButton";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// types
import { clientsStatusList, clientsTypeList } from "../../../../../ts/types/templates.types";
import { CustomRadio } from "../../../../../components/uiKit/Inputs/CustomRadio";

export const ClientsFilter = (props: any) => {
  const history = useHistory();
  const { page }: any = queryString.parse(history.location.search.substring(1));

  const {
    startDate,
    setStartDate,
    finishDate,
    setFinishDate,
    status,
    setStatus,
    types,
    setTypes,
    dropFilters,
    getClientsList,
    setAnchorEl,
    setAnchorSort,
  } = props;

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  return (
    <div className="clients-list__filter-block">
      <p className="clients-list__filter-block__title">По дате добавления</p>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            InputProps={{ className: "clients-list__filter-block__time" }}
            open={openFirstCalendar}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            placeholder="ДД/ММ/ГГГГ"
            value={startDate}
            onClick={() => setOpenFirstCalendar(true)}
            onClose={() => setOpenFirstCalendar(false)}
            onChange={(date: MaterialUiPickersDate) => setStartDate(date)}
            KeyboardButtonProps={{ "aria-label": "change date" }}
            keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
          />
          <div className="indication-filter__border" />
          <KeyboardDatePicker
            InputProps={{ className: "clients-list__filter-block__time" }}
            open={openSecondCalendar}
            onClick={() => setOpenSecondCalendar(true)}
            onClose={() => setOpenSecondCalendar(false)}
            onChange={(date: MaterialUiPickersDate) => setFinishDate(date)}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            placeholder="ДД/ММ/ГГГГ"
            value={finishDate}
            KeyboardButtonProps={{ "aria-label": "change date" }}
            keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
            helperText={null}
          />
        </MuiPickersUtilsProvider>
      </div>

      <div>
        <p className="clients-list__filter-block__title">По типу клиента</p>
        {clientsTypeList.map((state, index) => {
          return (
            <div key={index} className="clients-list__sort-block__checkbox">
              <CustomRadio
                isSecondary
                title={`${state.label}`}
                value={`${state.value}`}
                selectedRadioValue={types}
                onClick={(target) => setTypes(target)}
              />
            </div>
          );
        })}
      </div>

      <div>
        <p className="clients-list__filter-block__title">По статусу</p>
        {clientsStatusList.map((state, index) => {
          return (
            <div key={index} className="clients-list__sort-block__checkbox">
              <CustomRadio
                isSecondary
                title={`${state.label}`}
                value={`${state.value}`}
                selectedRadioValue={status}
                onClick={(target) => setStatus(target)}
              />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", marginTop: "8px" }}>
        <MainButton
          title="Сбросить"
          isSecondary
          style={{ width: 100, height: 40, fontSize: 14 }}
          onClick={dropFilters}
        />
        <div className="mr16px"></div>
        <MainButton
          title="Применить"
          style={{ width: 194, height: 40, fontSize: 14 }}
          onClick={() => {
            history.push({ search: `?page=${1}` });
            page == 1 && getClientsList();
            setAnchorEl(null);
            setAnchorSort(null);
          }}
        />
      </div>
    </div>
  );
};
