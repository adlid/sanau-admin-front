import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
// redux
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { deleteClientThunk } from "../../../../store/slicesAndThunks/users/clients/clients.thunks";

interface IDeleteClientModalProps {
  open: boolean;
  onClose: any;
  clientId: string;
}

export const DeleteClientModal: FC<IDeleteClientModalProps> = (props) => {
  const { open, onClose, clientId } = props;
  const dispatch: any = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const deleteClient = async () => {
    setIsRequesting(true);
    await dispatch(deleteClientThunk(clientId));
    setIsRequesting(false);
    onClose();
  };

  return (
    <Modal {...props} show={open} onHide={onClose} dialogClassName="template_modal" centered>
      <Modal.Header className="template_modal__header" closeButton>
        <Modal.Title className="template_modal__header_title">Удалить пользователя?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <p className="template_modal__body_text">
          Все данные пользователя будут удалены через 15 дней. Администратор может восстановить аккаунт в течение 15
          дней
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
          disabled={isRequesting}
          onClick={deleteClient}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Удалить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
