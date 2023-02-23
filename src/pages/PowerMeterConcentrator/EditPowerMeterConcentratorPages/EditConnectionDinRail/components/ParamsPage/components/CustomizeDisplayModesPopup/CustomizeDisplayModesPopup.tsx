import { FC } from "react"
import { Form } from "react-bootstrap"

import { MainButton } from "../../../../../../../../components/uiKit/Buttons/MainButton"

type PropsType = {
  toggleFirstPopup: (bool: boolean) => void
}

export const CustomizeDisplayModesPopup: FC<PropsType> = ({
  toggleFirstPopup
}) => {
  return <div className="display-modes-popup">
    <svg onClick={() => toggleFirstPopup(false)} className="display-modes-popup__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z" fill="#253D51" />
    </svg>

    <div className="display-modes-popup__header">
      <h2 className="display-modes-popup__title">
        Настроить режимы индикации
      </h2>
    </div>
    <div className="d-flex">
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          Основной режим
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Дисплей"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Версия "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Дата"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Время"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Номер ПУ"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>


      <div className="mr8px"></div>
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          ButtFlow active
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Положительная активная общая энергии"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Положительная активная скорость энергии"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="ButtFlow active rate peak energy"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="ButtFlow active rate flat power"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="ButtFlow active rate peak energy"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>
      <div className="mr8px"></div>
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          Overcurrent active
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent active total energy "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent active rate tip energy "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent active rate peak energy"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent active rate flat power"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent active rate valley energy "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>
    </div>
    <div className="mb8px"></div>

    <div className="d-flex">
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          ButtFlow reactive
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="ButtFlow reactive power"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="ButtFlow reactive power rate "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="ButtFlow reactive power peak energy"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="ButtFlow reactive power rate flat power"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="ButtFlow reactive power rate peak energy"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>
      <div className="mr8px"></div>
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          Overcurrent reactive
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent reactive total energy "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent reactive power rate "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent reactive power peak energy"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent reactive power rate flat power"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Overcurrent reactive rate valley energy "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>
      <div className="mr8px"></div>
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          Ток
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Ток, фаза А"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Ток, фаза B"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Ток, фаза C"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Ток, фаза N"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>
    </div>

    <div className="mb8px"></div>
    <div className="d-flex">
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          Напряжение
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Напряжение, фаза А"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Напряжение, фаза B"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Напряжение, фаза C"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>
      <div className="mr8px"></div>
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          Активная мощность
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Активная мощность, общая"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Активная мощность, фаза А"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Активная мощность, фаза B"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Активная мощность, фаза C"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Полная мощность "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>
      <div className="mr8px"></div>
      <div className="display-modes-popup__wrap">
        <h4 className="display-modes-popup__subtitle">
          Коэффициент мощности
        </h4>
        <div className="mb16px">

        </div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Коэффициент мощности, общий"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Коэффициент мощности, фаза А"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Коэффициент мощности, фаза B"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Коэффициент мощности, фаза C"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Total active maximum demand "
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
        <div className="mb12px"></div>
        <Form.Group>
          <Form.Check
            // checked={items.some(i => i === "MeterService")}
            checked
            name="residue"
            type="checkbox"
            label="Total working time in the next"
            onChange={(e) => {
              // if (e.target.checked) {
              //     setItems([...items, "MeterService"]);
              // } else {
              //     setItems(items.filter(i => i !== "MeterService"));
              // }
            }}
          />
        </Form.Group>
      </div>
    </div>

    <div className="mb8px"></div>


    <div className="display-modes-popup__footer d-flex justify-content-end">
      <MainButton
        onClick={() => toggleFirstPopup(false)}
        isSecondary title="Отмена" style={{ width: 86, height: 40, fontSize: 16 }} />
      <div className="mr8px">
      </div>
      <MainButton title="Сохранить" style={{ width: 107, height: 40, fontSize: 16 }} />
    </div>
  </div>
}