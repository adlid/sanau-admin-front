import React, { FC, useState } from "react";

import { Pagination } from "../../../../../../components/uiKit/Pagination";
import { ExcelButton } from "../../../../../../components/uiKit/Buttons/ExcelButton";
import { BluetoothGraphData } from "../../../../../../ts/interfaces/indication.interface";
import { useHistory } from "react-router-dom";

type PropsType = {
  tableData: Array<BluetoothGraphData>;
  token?: string;
  page?: number;
  totalPages?: number;
  saveExcelCallBack?: () => void;
  getTableInfoCallback?: (page: number) => void;
};

export const PowerMeterBluetooth: FC<PropsType> = ({
  tableData,
  token,
  page,
  totalPages,
  saveExcelCallBack,
  getTableInfoCallback,
}) => {
  const history = useHistory();

  return (
    <div className="main-table">
      <div className="read-data-view-table">
        <div className="overflow-block">
          <table className="table table-sm table-bordered">
            <thead>
              <tr className="read-data-view-table__bgc">
                <th scope="col">№</th>
                <th scope="col">Сер. №</th>
                <th scope="col">Дата и время фиксации</th>
                <th scope="col" className="col-100">
                  Показание
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((meter, index) => {
                return (
                  <tr
                    key={index}
                    className={
                      index % 2 !== 0
                        ? "read-data-view-table__bgc "
                        : "read-data-view-table__bgc read-data-view-table__bgc--white"
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{meter.serialNumber}</td>
                    <td>{meter.lastFixDate}</td>
                    <td>{meter.indication}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          <Pagination
              page={page !== undefined ? page : 1}
              totalPage={totalPages !== undefined ? totalPages : 1}
              onPageChanged={(page) => {
                history.push({ search: `?page=${page}&token=${token}` });

                if (getTableInfoCallback) {
                  getTableInfoCallback(page);
                }
              }}
            />

          <ExcelButton
            onClick={() => {
              if (saveExcelCallBack) {
                saveExcelCallBack();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
