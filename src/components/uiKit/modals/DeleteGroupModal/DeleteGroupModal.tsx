import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { deleteGroupTreeItemThunk } from "../../../../store/slicesAndThunks/groupControl/groupControl.thunks";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";

interface IDeleteGroupModalProps {
  open: boolean;
  onClose: any;
  groupId: string;
  groupName: string;
}

export const DeleteGroupModal: FC<IDeleteGroupModalProps> = (props) => {
  const { open, onClose, groupId, groupName } = props;
  const dispatch: any = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const deleteGroup = async () => {
    setIsRequesting(true);
    await dispatch(deleteGroupTreeItemThunk(groupId));
    setIsRequesting(false);
    onClose();
  };

  const orgData = useTypedSelector((state) => state.groupsControl.tree);

  const [selectedGroup, setSelectedGroup] = useState<any>();
  const changed = (data: any) => {
    return data?.map((item: any) => {
      if (item) {
        if (item.key === groupId) {
          setSelectedGroup(item);
        } else if (item.children) changed(item.children);
      }
    });
  };

  useEffect(() => {
    changed(orgData);
  }, [orgData, groupId]);

  return (
    <Modal {...props} show={open} onHide={onClose} dialogClassName="template_modal" centered>
      <Modal.Header className="template_modal__header" closeButton>
        <Modal.Title className="template_modal__header_title">Удалить группу?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <p className="template_modal__body_text">
          {selectedGroup?.children?.length > 0
            ? `Группа «${groupName}» содержит ${selectedGroup?.children?.length} подгрупп(-ы). Удалить группу и ${selectedGroup?.children?.length} подгрупп(-ы)?`
            : `Удалить группу «${groupName}»?`}
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
          onClick={deleteGroup}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Удалить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
