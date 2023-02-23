import React, { FC, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";

import { AddButton } from "../../components/uiKit/Buttons/AddButton";
import { Search } from "../../components/uiKit/Search";
import { AccessTemplateListItem } from "./components/AccessTemplateListItem/AccessTemplateListItem";

import { useAppDispatch, useTypedSelector } from "../../utils/hooks/reduxHooks";

import { searchTemplateThunk, templatesListThunk } from "../../store/slicesAndThunks/users/operators/operators.thunks";
import { DeleteAccessTemplateModal } from "../../components/uiKit/modals/DeleteAccessTemplateModal/DeleteAccessTemplateModal";

interface IAccessTemplatesProps {}

export const AccessTemplates: FC<IAccessTemplatesProps> = (props) => {
  const {} = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isScroll, handleIsScroll] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState<boolean>(false);

  const { templatesList } = useTypedSelector((state) => state.operators);

  const [searchValue, setSearchValue] = useState<string>("");

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [template, setTemplate] = useState<any>();
  const openDeleteModal = (template: any) => {
    setDeleteModalOpen(true);
    setTemplate(template);
  };

  const searchTemplates = async () => {
    setTemplatesLoading(true);
    await dispatch(searchTemplateThunk(searchValue));
    setTemplatesLoading(false);
  };

  useEffect(() => {
    searchTemplates();
  }, []);

  return (
    <>
      <DeleteAccessTemplateModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} template={template} />
      <div className="templates-list">
        <div className="container_block">
          <h2 className="container_block__title">Шаблоны прав доступа</h2>
          <div className="templates-list__search-block">
            <Search
              onEnterPress={searchTemplates}
              placeholder="Название шаблона"
              value={searchValue}
              onChange={(value: string) => {
                setSearchValue(value);
              }}
            />
            <AddButton
              title="Добавить шаблон"
              style={{ width: 180, height: 40, fontSize: 14 }}
              onClick={() => {
                history.push("/admin/users/access-templates/create");
              }}
            />
          </div>

          <div className="templates-list__table-block">
            <Row className="templates-list__table-group">
              <Col xl={1} lg={1} md={4} sm={4} className="table-group__column">
                <span className="templates-list__card-title">№</span>
              </Col>
              <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
                <span className="templates-list__card-title">Дата создания</span>
              </Col>
              <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
                <span className="templates-list__card-title">Название шаблона</span>
              </Col>
              <Col xl={5} lg={5} md={4} sm={4} className="table-group__column">
                <span className="templates-list__card-title">Права</span>
              </Col>
              <Col
                xl={1}
                lg={1}
                md={4}
                sm={4}
                className="table-group__column"
                style={{ textAlign: "right", paddingRight: "0px" }}
              >
                <span className="templates-list__card-title">Действия</span>
              </Col>
            </Row>
            <hr
              style={{
                height: 2,
                margin: 0,
                backgroundColor: "#D7E2F2",
                border: "none",
              }}
            />

            <div
              className="templates-list__wrap"
              onScroll={() => {
                handleIsScroll(true);
              }}
            >
              {!templatesList.length ? (
                templatesLoading ? (
                  <div className="templates-list__preloader">
                    <Spinner animation="border" size="sm" />
                  </div>
                ) : (
                  <div className="templates-list__preloader">
                    <p>Список пуст</p>
                  </div>
                )
              ) : (
                templatesList.map((operator, index) => {
                  return (
                    <AccessTemplateListItem
                      key={index}
                      number={index + 1}
                      isScroll={isScroll}
                      handleIsScroll={handleIsScroll}
                      templateData={operator}
                      openDeleteModal={openDeleteModal}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
