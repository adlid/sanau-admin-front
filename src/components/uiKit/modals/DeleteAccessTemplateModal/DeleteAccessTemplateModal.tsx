import React, { FC, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { deleteTemplateThunk } from "../../../../store/slicesAndThunks/users/operators/operators.thunks";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";

interface IDeleteAccessTemplateModalProps {
  open: boolean;
  onClose: any;
  template: any;
}

export const DeleteAccessTemplateModal: FC<IDeleteAccessTemplateModalProps> = (props) => {
  const { open, onClose, template } = props;
  const dispatch: any = useAppDispatch();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const deleteOperator = async () => {
    setIsRequesting(true);
    await dispatch(deleteTemplateThunk(template?.id));
    setIsRequesting(false);
    onClose();
  };

  return (
    <Modal {...props} show={open} onHide={onClose} dialogClassName="template_modal" centered>
      <Modal.Header className="template_modal__header" closeButton>
        <Modal.Title className="template_modal__header_title">Удалить шаблон?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <p className="template_modal__body_text">
          {`Удаленные шаблоны не подлежат восстановлению. Удалить «${template?.name}»?`}
        </p>
      </Modal.Body>
      <Modal.Footer className="template_modal__footer">
        <Button
          onClick={onClose}
          className="template_modal__footer_btn"
          style={{ background: "#355169" }}
          disabled={isRequesting}
        >
          Отмена
        </Button>
        <Button
          variant="primary"
          className="template_modal__footer_btn"
          style={{ background: "#EB5757" }}
          onClick={deleteOperator}
          disabled={isRequesting}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Удалить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
