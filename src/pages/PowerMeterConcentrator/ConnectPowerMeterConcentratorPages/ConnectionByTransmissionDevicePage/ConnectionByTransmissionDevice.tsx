import moment from "moment";
import { FC, useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ConcentratorTab } from "./components/ConcentratorTab";
import { AddConcentratorDevice } from "./components/AddConcentratorDevice";
//redux
import { useTypedSelector, useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { resetConcentratorState } from "../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import { Accordion, AccordionDetails, AccordionSummary, withStyles } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import { ReactComponent as CheckedGreen } from "../../../../assets/imgs/checkedGreen.svg";
import { NotCheckedComponent } from "../../../../assets/imgs/NotCheckedComponents";

export const ConnectionByTransmissionDevicePage: FC = () => {
  // hooks
  const dispatch = useAppDispatch();

  const { isConcentratorConnected, concentratorIPandPort } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  const { socketMessages } = useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator);

  const [submitForm, setSubmitForm] = useState<() => any>();

  const bindFormSubmit = (action: () => Promise<any>) => {
    if (!submitForm) {
      setSubmitForm(() => () => action());
    }
  };

  const clickSubmitForm = () => {
    if (submitForm) submitForm();
  };

  useEffect(() => {
    return () => {
      dispatch(resetConcentratorState());
    };
  }, []);

  const AppAccordionSummary = withStyles({
    root: {
      marginBottom: -1,
      minHeight: 56,
      "&$expanded": { minHeight: 56, backgroundColor: "#EBEDEF", borderBottom: "1px solid rgba(0, 0, 0, .125)" },
    },
    content: { "&$expanded": { margin: "12px 0" } },
    expanded: {},
  })(AccordionSummary);

  const AppAccordion = withStyles({ root: { borderRadius: "0px", boxShadow: "0px -2px 16px rgba(12, 18, 22, 0.24)" } })(
    Accordion
  );

  return (
    <div className="power-meter-data-transmission-device" style={{ position: "relative", height: "100%" }}>
      <AddConcentratorDevice
        concentratorIPandPort={concentratorIPandPort}
        isConcentratorConnected={isConcentratorConnected}
        clickSubmitForm={clickSubmitForm}
      />

      {isConcentratorConnected && <ConcentratorTab bindFormSubmit={bindFormSubmit} />}
      {!isConcentratorConnected && (
        <div className="add-data-transmission-device__accordionBox">
          <AppAccordion square defaultExpanded={true}>
            <AppAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: "#EBEDEF !important" }}
            >
              <div className="add-data-transmission-device__accordion">
                <p className="text">Состояние</p>
                <p className="text">
                  Ошибки: {socketMessages.filter((messageObj: any) => !messageObj.status.includes("200")).length}
                </p>
              </div>
            </AppAccordionSummary>
            <AccordionDetails
              style={{ padding: "0px", display: "flex", flexDirection: "column", maxHeight: "200px", overflow: "auto" }}
            >
              {socketMessages.length !== 0 ? (
                socketMessages.map((messageObject: any) => {
                  // if (!messageObject.status.includes("200")) messageObject.error = true;
                  let error = Boolean(!messageObject.status.includes("200"));

                  return (
                    <Row
                      style={{
                        width: "100%",
                        alignItems: "center",
                        padding: "8px 16px",
                        background: !error ? "#FFFFFF" : "#EB5757",
                        margin: "0px",
                      }}
                    >
                      <Col xl={1} lg={1} md={4} sm={4} style={{ textAlign: "center" }}>
                        {!error ? <CheckedGreen /> : <NotCheckedComponent />}
                      </Col>
                      <Col xl={2} lg={2} md={4} sm={4}>
                        <p className="accordion_row_text" style={!error ? { color: "#355169" } : { color: "#FFFFFF" }}>
                          {messageObject.time ? moment(messageObject.time).format("DD.MM.YYYY HH:mm") : "---"}
                        </p>
                      </Col>
                      <Col xl={7} lg={7} md={4} sm={4}>
                        <p style={!error ? { color: "#355169" } : { color: "#FFFFFF" }} className="accordion_row_text">
                          {messageObject.message || "---"}
                        </p>
                      </Col>
                      <Col xl={2} lg={2} md={4} sm={4} style={{ textAlign: "right", paddingRight: "0px" }}>
                        <p
                          className="accordion_row_status"
                          style={!error ? { color: "#355169" } : { color: "#FFFFFF" }}
                        >
                          {messageObject.status || "---"}
                        </p>
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <p style={{ width: "100%", textAlign: "center", margin: "0px", padding: "8px 16px" }}>Нет данных</p>
              )}
            </AccordionDetails>
          </AppAccordion>
        </div>
      )}
    </div>
  );
};
