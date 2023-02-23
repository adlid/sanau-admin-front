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
import { Checkbox, FormControl, Input, ListItemText, MenuItem, Select } from "@material-ui/core";
import {
  admissionTags,
  configurationTags,
  generalTags,
  operatorsStatusList,
} from "../../../../../ts/types/templates.types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  getContentAnchorEl: (): any => null,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      background: "#355169",
    },
  },
};

export const OperatorsFilter = (props: any) => {
  const history = useHistory();
  const { page }: any = queryString.parse(history.location.search.substring(1));

  const {
    startDate,
    setStartDate,
    finishDate,
    setFinishDate,
    selectedRights,
    handleChange,
    status,
    setStatus,
    dropFilters,
    getOperatorsList,
    setAnchorEl,
    setAnchorSort,
  } = props;

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [openSecondCalendar, setOpenSecondCalendar] = useState(false);

  return (
    <div className="operators-list__filter-block">
      <p className="operators-list__filter-block__title">По дате добавления</p>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            InputProps={{ className: "operators-list__filter-block__time" }}
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
            InputProps={{ className: "operators-list__filter-block__time" }}
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

      <p className="operators-list__filter-block__title">По возможностям (доступ)</p>
      <FormControl style={{ width: "100%", marginBottom: "12px" }}>
        <Select
          style={{ color: "#FFFFFF" }}
          multiple
          value={selectedRights}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(", ")}
          MenuProps={MenuProps}
          classes={{ selectMenu: "operators-list__filter-block__selectMenu" }}
        >
          <p className="operators-list__filter-block__selectTitle">Основные</p>
          {generalTags.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              <Checkbox checked={selectedRights.indexOf(item.name) > -1} style={{ color: "#FFFFFF" }} />
              <ListItemText primary={item.name} className="operators-list__filter-block__selectText" />
            </MenuItem>
          ))}
          <p className="operators-list__filter-block__selectTitle">Конфигурация </p>
          {configurationTags.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              <Checkbox checked={selectedRights.indexOf(item.name) > -1} style={{ color: "#FFFFFF" }} />
              <ListItemText primary={item.name} className="operators-list__filter-block__selectText" />
            </MenuItem>
          ))}
          <p className="operators-list__filter-block__selectTitle">Администрирование</p>
          {admissionTags.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              <Checkbox checked={selectedRights.indexOf(item.name) > -1} style={{ color: "#FFFFFF" }} />
              <ListItemText primary={item.name} className="operators-list__filter-block__selectText" />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p className="operators-list__filter-block__title">По статусу</p>
      <Form.Group>
        {operatorsStatusList.map((state, index) => {
          return (
            <Form.Check
              key={index}
              className="operators-list__filter-block__checkbox"
              type="checkbox"
              value={state.value}
              checked={status.some((item: string) => item === state.value)}
              label={state.label}
              onChange={() => {
                if (!status.some((item: string) => item === state.value)) setStatus([...status, state.value]);
                else setStatus(status.filter((item: string) => item !== state.value));
              }}
            />
          );
        })}
      </Form.Group>
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
            page == 1 && getOperatorsList();
            setAnchorEl(null);
            setAnchorSort(null);
          }}
        />
      </div>
    </div>
  );
};
