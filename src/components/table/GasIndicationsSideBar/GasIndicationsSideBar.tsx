import { Spinner } from "react-bootstrap";
import React, { FC, useState, useEffect } from "react";
// components
import { IOSSwitch } from "../../uiKit/Switch/SwitchRed";
// ts
import { UserRoles } from "../../../ts/types/lorawanUdpDevice.types";
// redux
import { useAppDispatch, useTypedSelector } from "../../../utils/hooks/reduxHooks";
import { getDetailGasUdpSidebarInfoThunk } from "../../../store/slicesAndThunks/gasIndication/gasIndication.thunks";

interface IGasIndicationsSideBar {
  meter: any;
  close: any;
  openValveClosingCauseModalOpenModal: any;
}

export const GasIndicationsSideBar: FC<IGasIndicationsSideBar> = (props) => {
  const { meter, close, openValveClosingCauseModalOpenModal } = props;

  // hooks
  const dispatch = useAppDispatch();

  const { detailUdpMeterData } = useTypedSelector((state) => state.gasIndication);

  const openChangeValveCause = () => {
    close();
    openValveClosingCauseModalOpenModal();
  };

  const [loading, setLoading] = useState<boolean>(false);

  const getDetailSidebarInfo = async () => {
    setLoading(true);
    await dispatch(
      getDetailGasUdpSidebarInfoThunk({ barcode: meter.barcode || meter.gasModel.barcode, arrayId: meter.id || "" })
    );
    setLoading(false);
  };

  useEffect(() => {
    getDetailSidebarInfo();
  }, [meter.barcode]);

  return (
    <div>
      <div className="sideBar-indications-detailItem__header">
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
          <p className="sideBar-indications-detailItem__header_title">
            {meter.barcode || meter.gasModel.barcode || "???????????????????????? ????????"}
          </p>
          <p className="sideBar-indications-detailItem__header_text">????????????????????</p>
        </div>
      </div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%" }}>
          <div className="sideBar-indications-detailItem" style={{ borderRight: "1px solid #D7E2F2" }}>
            <div className="sideBar-indications-detailItem__section">
              <p className="sideBar-indications-detailItem__section_title">???????????? ??????????</p>
            </div>

            <div className="sideBar-indications-detailItem__infoBox">
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">??????</p>
                <p className="text">{detailUdpMeterData?.type || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????????????? ??????????</p>
                <p className="text">{meter.barcode || meter.gasModel.barcode || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????? ????????????????????</p>
                <p className="text">{detailUdpMeterData?.createdAt || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????????????????? ????????????????????</p>
                <p className="text">{detailUdpMeterData?.updatedAt || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">????????????????????????</p>
                <p className="text">{detailUdpMeterData?.manufacturer || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">??????????????????????, ?????????????????????? ????????</p>
                <p className="text">{detailUdpMeterData?.setUpOrganization || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">????????????????????</p>
                <p className="text">{detailUdpMeterData?.array?.caliber || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">????????????</p>
                <p className="text">{detailUdpMeterData?.array?.pinCode || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item" style={{ borderBottom: "unset" }}>
                <p className="text" style={{ height: "16px" }} />
                <p className="text" style={{ height: "16px" }} />
              </div>
            </div>

            <div className="sideBar-indications-detailItem__section">
              <p className="sideBar-indications-detailItem__section_title">????????????????????</p>
            </div>

            <div className="sideBar-indications-detailItem__infoBox">
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">??????</p>
                <p className="text">{UserRoles[detailUdpMeterData?.roleName || "-"] || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">??????</p>
                <p className="text">{detailUdpMeterData?.fullName || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">??????????</p>
                <p className="text">{detailUdpMeterData?.address || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????????? ????????????????</p>
                <p className="text">{detailUdpMeterData?.phoneNumber || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????????????????????? ??????????</p>
                <p className="text">{detailUdpMeterData?.email || "-"}</p>
              </div>
            </div>
          </div>
          <div className="sideBar-indications-detailItem">
            <div className="sideBar-indications-detailItem__section">
              <p className="sideBar-indications-detailItem__section_title">?????????????????? ????????</p>
            </div>

            <div className="sideBar-indications-detailItem__infoBox">
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">ECL</p>
                <p className="text">{detailUdpMeterData?.array?.ecl || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">txtpower</p>
                <p className="text">{detailUdpMeterData?.array?.txtPower || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">IMSI</p>
                <p className="text">{detailUdpMeterData?.array?.imsi || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????????????? ?????????????? PCI</p>
                <p className="text">{detailUdpMeterData?.array?.pci || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">Cell ID ?????????????? ??????????????</p>
                <p className="text">{detailUdpMeterData?.array?.cid || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">IMEI</p>
                <p className="text">{detailUdpMeterData?.array?.imei || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">ICCID</p>
                <p className="text">{detailUdpMeterData?.array?.iccId || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????? ??????????????</p>
                <p className="text">{detailUdpMeterData?.array?.signalNoise || "-"}</p>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????????????????????????? ??????????????</p>
                <p className="text">{detailUdpMeterData?.array?.signalIntensity || "-"}</p>
              </div>
            </div>

            <div className="sideBar-indications-detailItem__section">
              <p className="sideBar-indications-detailItem__section_title">?????????????????? ?????????????? ??????????</p>
            </div>

            <div className="sideBar-indications-detailItem__infoBox">
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????????????????????????? ????????????????????</p>
                <IOSSwitch checked={false} className="gasSideBarSwith" />
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????????????? ????????????????/???????????????? ??????????????</p>
                <IOSSwitch checked={false} className="gasSideBarSwith" />
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????????????? ???????????????? ?????????????? ???? ??????????????</p>
                <p className="text">{"-"}</p>
                <span
                  className="text"
                  style={{ textDecoration: "underline", cursor: "pointer", color: "#18A0FB" }}
                  onClick={openChangeValveCause}
                >
                  ????????????????
                </span>
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????????????? ??????????????</p>
                <IOSSwitch checked={false} className="gasSideBarSwith" />
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????????????????? Qmax</p>
                <IOSSwitch checked={false} className="gasSideBarSwith" />
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????????? ???????? ?????? ???????????????? ??????????????</p>
                <IOSSwitch checked={Boolean(detailUdpMeterData?.array?.isRevealGas)} className="gasSideBarSwith" />
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????????????? ?????????????? ???????????? ?????? ???????????????? ??????????????</p>
                <IOSSwitch checked={false} className="gasSideBarSwith" />
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????? ??????????????????</p>
                <IOSSwitch checked={false} className="gasSideBarSwith" />
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">???????????????????????? ?????????????? ?????????????? ?? ???????????????? ??????????????</p>
                <IOSSwitch checked={false} className="gasSideBarSwith" />
              </div>
              <div className="sideBar-indications-detailItem__infoBox_item">
                <p className="text">?????????????????????????????????????? ????????????</p>
                <IOSSwitch checked={false} className="gasSideBarSwith" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
