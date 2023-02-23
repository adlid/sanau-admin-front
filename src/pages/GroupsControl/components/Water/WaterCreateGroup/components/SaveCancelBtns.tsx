import React, { FC } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";
import { Pagination } from "../../../../../../components/uiKit/Pagination";

interface ISaveCancelBtnsProps {
  onSaveClick?: () => void;
  dataSaving: boolean;
  pageNum?: number;
  setPageNum?: any;
  totalPages?: number;
  pagination?: boolean;
  onPageChange?: any;
}

export const SaveCancelBtns: FC<ISaveCancelBtnsProps> = (props) => {
  const { onSaveClick, dataSaving, pageNum, setPageNum, totalPages, pagination, onPageChange } = props;
  const history = useHistory();

  return (
    <div className="water_create_group__btns d-flex" style={{ position: "absolute", bottom: 0, width: "100%" }}>
      <div>
        {pagination && (
          <Pagination
            page={pageNum || 1}
            totalPage={totalPages !== undefined ? totalPages : 1}
            onPageChanged={(page) => {
              setPageNum(page);
              onPageChange(page);
            }}
          />
        )}
      </div>

      <div className="d-flex">
        <MainButton
          title={dataSaving ? <Spinner animation="border" size="sm" /> : "Сохранить"}
          style={{ width: 139, height: 40, fontSize: 14 }}
          onClick={onSaveClick}
          isDisabled={dataSaving}
        />
        <div className="mr16px"></div>
        <MainButton
          title="Отмена"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => history.push("/admin/system/groups-control?tabValue=water&state=show")}
          isDisabled={dataSaving}
        />
      </div>
    </div>
  );
};
