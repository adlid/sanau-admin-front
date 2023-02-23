import moment from "moment";
import React, { FC, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { deleteNewsThunk } from "../../../../store/slicesAndThunks/news/news.thunks";
import { INewsListItem } from "../../../../ts/interfaces/news.interface";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";

interface IDeleteNewsModalProps {
  open: boolean;
  onClose: any;
  news: INewsListItem;
}

export const DeleteNewsModal: FC<IDeleteNewsModalProps> = (props) => {
  const { open, onClose, news } = props;
  const dispatch: any = useAppDispatch();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const deleteNews = async () => {
    setIsRequesting(true);
    await dispatch(deleteNewsThunk(news?.id));
    setIsRequesting(false);
    onClose();
  };

  return (
    <Modal {...props} show={open} onHide={onClose} dialogClassName="template_modal" centered>
      <Modal.Header className="template_modal__header" closeButton>
        <Modal.Title className="template_modal__header_title">Удалить новость?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <p className="template_modal__body_text">
          Удаленные новости не подлежат восстановлению. Удалить «{news?.title}» от{" "}
          {moment(news?.created_at).format("DD.MM.YYYY HH:mm")}?
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
          onClick={deleteNews}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Удалить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
