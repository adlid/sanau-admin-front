import { MenuItem, Select } from "@material-ui/core";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import { Spinner, Form } from "react-bootstrap";
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";
import {
  changeOperatorsRightsThunk,
  templatesListThunk,
} from "../../../../../../store/slicesAndThunks/users/operators/operators.thunks";
import { configurationTags, generalTags, admissionTags } from "../../../../../../ts/types/templates.types";
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";

interface IAccessRightsSideBarProps {
  close: any;
}

export const AccessRightsSideBar: FC<IAccessRightsSideBarProps> = (props) => {
  const { close } = props;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { metersId, operatorsListArr, templatesList } = useTypedSelector((state) => state.operators);

  const [rightsValue, setRightsValue] = useState("self"); // selected template handlers
  const [privileges, setPrivileges] = useState<any>([]); // selected privileges
  const [templatesLoading, setTemplatesLoading] = useState<boolean>(false);
  const selectedTemplateItem = templatesList.filter((item) => rightsValue === item.name);

  const onPrivilegesChange = (tag: any) => {
    if (!privileges.some((priv: any) => priv.name === tag.name)) setPrivileges([...privileges, tag]);
    else setPrivileges(privileges.filter((priv: any) => priv.name !== tag.name));
  };

  const handleChangeRightsValue = (event: any) => setRightsValue(event.target.value);

  const saveRights = async () => {
    if (privileges.length > 0) {
      await dispatch(
        changeOperatorsRightsThunk({
          id: metersId,
          privileges: privileges,
        })
      );
      close();
      setPrivileges([]);
    } else enqueueSnackbar("Выберите права доступа", { variant: "error" });
  };

  const getTemplates = async () => {
    setTemplatesLoading(true);
    await dispatch(templatesListThunk());
    setTemplatesLoading(false);
  };

  useEffect(() => {
    getTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplateItem.length) {
      setPrivileges(selectedTemplateItem[0].privileges.map((item) => ({ name: item.name })));
    } else {
      if (metersId.length === 1) {
        const selectedOperator = operatorsListArr?.data.filter((user) => user.id === metersId[0]);
        selectedOperator?.length ? setPrivileges(selectedOperator[0].privileges) : setPrivileges([]);
      } else setPrivileges([]);
    }
  }, [rightsValue]);

  return (
    <div className="sideBar-detailItem">
      <div className="sideBar-detailItem__header">
        <svg
          onClick={close}
          style={{ cursor: "pointer" }}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z"
            fill="#253D51"
          />
        </svg>

        <div>
          <p className="sideBar-detailItem__header_title">Настройка прав доступа</p>
          <p
            className="sideBar-detailItem__header_text"
            style={{ width: "75%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {metersId.map((id) => {
              return operatorsListArr?.data
                .filter((user) => user.id === id)
                .map((user) => {
                  return user.fullName + ", ";
                })
                .join("");
            })}
          </p>
        </div>
      </div>

      <div className="sideBar-detailItem__body" style={{ marginTop: "8px", width: "100%" }}>
        <div className="sideBar-detailItem__body_select">
          <Select
            style={{ width: "100%" }}
            value={rightsValue}
            onChange={handleChangeRightsValue}
            MenuProps={{
              disableScrollLock: false,
              anchorOrigin: { vertical: 20, horizontal: -13 },
              transformOrigin: { vertical: "top", horizontal: "left" },
              getContentAnchorEl: null,
            }}
          >
            <MenuItem value={"self"}>Своя настройка</MenuItem>
            {templatesList.map((item) => {
              return <MenuItem value={item.name}>{item.name}</MenuItem>;
            })}
          </Select>
          {templatesLoading && <Spinner animation="border" />}
        </div>

        <div className="d-flex" style={{ marginTop: "22px", flexWrap: "wrap" }}>
          <div className="bluetooth-connection-description__wrap">
            <h2 className="create-user__checkbox_title">Основные</h2>
            <Form.Group>
              {generalTags.map((tag, index) => {
                return (
                  <Form.Check
                    key={index}
                    className="create-user__checkbox"
                    type="checkbox"
                    value={tag.name}
                    checked={privileges.some((priv: any) => priv.name === tag.name)}
                    label={tag.name}
                    onChange={() => onPrivilegesChange(tag)}
                  />
                );
              })}
            </Form.Group>
          </div>

          <div className="bluetooth-connection-description__wrap">
            <h2 className="create-user__checkbox_title">Конфигурация</h2>
            <Form.Group>
              {configurationTags.map((tag, index) => {
                return (
                  <Form.Check
                    key={index}
                    className="create-user__checkbox"
                    type="checkbox"
                    value={tag.name}
                    checked={privileges.some((priv: any) => priv.name === tag.name)}
                    label={tag.name}
                    onChange={() => onPrivilegesChange(tag)}
                  />
                );
              })}
            </Form.Group>
          </div>

          <div className="bluetooth-connection-description__wrap">
            <h2 className="create-user__checkbox_title">Администрирование</h2>
            <Form.Group>
              {admissionTags.map((tag, index) => {
                return (
                  <Form.Check
                    key={index}
                    className="create-user__checkbox"
                    type="checkbox"
                    value={tag.name}
                    checked={privileges.some((priv: any) => priv.name === tag.name)}
                    label={tag.name}
                    onChange={() => onPrivilegesChange(tag)}
                  />
                );
              })}
            </Form.Group>
          </div>
        </div>
      </div>

      <div className="sideBar-detailItem__footer">
        <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} onClick={saveRights} />
        <div className="mr16px"></div>
        <MainButton
          title="Отмена"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => {
            close();
            setPrivileges([]);
          }}
        />
      </div>
    </div>
  );
};
