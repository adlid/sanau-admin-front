import * as yup from "yup";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import * as queryString from "querystring";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
// redux
import { useAppDispatch, useTypedSelector } from "../../../../../../utils/hooks/reduxHooks";
import {
  createGroupTreeItemThunk,
  editGroupTreeItemThunk,
} from "../../../../../../store/slicesAndThunks/groupControl/groupControl.thunks";
// ts
import { groupItemsImages } from "../../../../../../ts/types/groupcontrol.types";
// components
import { SaveCancelBtns } from "./SaveCancelBtns";
import { AppPopper } from "../../../../../../components/Tooltip/AppPopper";
import { CustomRadio } from "../../../../../../components/uiKit/Inputs/CustomRadio";
import { ReactComponent as ArrowUp } from "../../../../../../assets/imgs/arrowUp.svg";

export const GroupInfo = (props: any) => {
  const { setTabValue } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { groupId }: any = queryString.parse(history.location.search.substring(1));
  const { detailTreeItem } = useTypedSelector((state) => state.groupsControl);

  const [dataSaving, setDataSaving] = useState<boolean>(false);
  const [selectedMeterCategory, setSelectedMeterCategory] = useState<string>("water");
  const [selectedIcon, setSelectedIcon] = useState<any>();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: detailTreeItem?.title,
      icon: selectedIcon?.name,
      type: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Обязательное поле") || yup.number().required("Обязательное поле"),
    }),
    onSubmit: async (values: any) => {
      const data = {
        title: values.title,
        icon: values.icon,
        type: selectedMeterCategory,
      };
      setDataSaving(true);
      let response: any;
      {
        pathname.includes("/create") && !groupId
          ? (response = await dispatch(createGroupTreeItemThunk(data)))
          : (response = await dispatch(editGroupTreeItemThunk({ ...data, key: groupId })));
      }
      setDataSaving(false);
      !response?.error && setTabValue("taksonomy");
    },
  });

  useEffect(() => {
    if (!detailTreeItem?.icon) setSelectedIcon(groupItemsImages[0]);
    else setSelectedIcon(groupItemsImages.filter((img) => img.name === detailTreeItem.icon)[0]);
  }, [detailTreeItem]);

  useEffect(() => {
    if (detailTreeItem?.type) setSelectedMeterCategory(detailTreeItem?.type);
  }, [detailTreeItem]);

  const editable = pathname.includes("/edit") || (pathname.includes("/create") && groupId);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="water_create_group__title d-flex">
        <Form.Group className="operator-character__form-item">
          <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Название группы</Form.Label>
          <div className="titleInputBox">
            <AppPopper
              gap="20px"
              content={
                <div className="water_create_group__dropDownMenu">
                  {groupItemsImages.map((item, index) => {
                    return (
                      <div key={index} className="dropDownItem" onClick={() => setSelectedIcon(item)}>
                        <item.icon />
                      </div>
                    );
                  })}
                </div>
              }
              placement="bottom-start"
            >
              <div className="dropDownMenu_selected">
                {selectedIcon && <selectedIcon.icon />}
                <ArrowUp style={{ marginLeft: "20px" }} />
              </div>
            </AppPopper>
            <Form.Control
              className="water_create_group__input"
              placeholder="Название группы"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              isInvalid={!!formik.errors.title && !!formik.touched.title}
            /> 
          </div>
        </Form.Group>
      </div>

      <div className="divider" />

      <div className="water_create_group__subtitleBox">
        <p className="subtitle">Тип группы</p>
        <div>
          <CustomRadio
            title="Электроэнергия"
            value="electric"
            selectedRadioValue={selectedMeterCategory}
            onClick={(target) => setSelectedMeterCategory(target)}
            disabled={editable}
          />
          <div className="mb12px"></div>
          <CustomRadio
            title="Вода"
            value="water"
            selectedRadioValue={selectedMeterCategory}
            onClick={(target) => setSelectedMeterCategory(target)}
            disabled={editable}
          />
          <div className="mb12px"></div>
          <CustomRadio
            title="Газ"
            value="gas"
            selectedRadioValue={selectedMeterCategory}
            onClick={(target) => setSelectedMeterCategory(target)}
            disabled={editable}
          />
          <div className="mb12px"></div>
        </div>
      </div>

      <SaveCancelBtns dataSaving={dataSaving} />
    </Form>
  );
};
