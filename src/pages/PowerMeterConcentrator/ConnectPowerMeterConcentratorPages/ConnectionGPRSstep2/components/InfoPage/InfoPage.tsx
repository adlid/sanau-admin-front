import { FC } from "react"
import { Form } from "react-bootstrap";
import { useTypedSelector } from '../../../../../../utils/hooks/reduxHooks';
import { useFormik } from "formik";
import * as yup from "yup";


export const InfoPage: FC = () => {

    const { information } = useTypedSelector(state => state.powerMeterGPRSMeter.GPRSResponseInitialValues)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            batteryVoltage: information.batteryVoltage,
            binCode: information.binCode,
            disbalance: information.disbalance,
            meterConstant: information.meterConstant,
            programVersion: information.programVersion,
            programming: information.programming,
            relay: information.relay,
            temperature: information.temperature,
            timeInNetwork: information.timeInNetwork
        },
        validationSchema: yup.object({

        }),
        onSubmit: async (values: any) => {

        },
    });

    return <div className="gprs2-info">
        <Form.Group className="operator-character__form-item">
            <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>BIN-код</Form.Label>
            <Form.Control
                type="text"
                placeholder=""
                name="binCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.binCode}
                isInvalid={!!formik.errors.binCode && !!formik.touched.binCode}
            />
            {formik.touched.binCode && formik.errors.binCode && (
                <Form.Control.Feedback type="invalid">{formik.errors.binCode}</Form.Control.Feedback>
            )}
        </Form.Group>

        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
            <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Версия прошивки</Form.Label>
            <Form.Control
                type="text"
                placeholder=""
                name="programVersion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.programVersion}
                isInvalid={!!formik.errors.programVersion && !!formik.touched.programVersion}
            />
            {formik.touched.programVersion && formik.errors.programVersion && (
                <Form.Control.Feedback type="invalid">{formik.errors.programVersion}</Form.Control.Feedback>
            )}
        </Form.Group>
        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
            <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Предаточное число прибора учета, imp/kWh</Form.Label>
            <Form.Control
                type="text"
                placeholder=""
                name="meterConstant"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.meterConstant}
                isInvalid={!!formik.errors.meterConstant && !!formik.touched.meterConstant}
            />
            {formik.touched.meterConstant && formik.errors.meterConstant && (
                <Form.Control.Feedback type="invalid">{formik.errors.meterConstant}</Form.Control.Feedback>
            )}
        </Form.Group>
        <div className="mb20px"></div>

        <Form.Group className="operator-character__form-item">
            <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Время работы прибора учета (час)</Form.Label>
            <Form.Control
                type="text"
                placeholder=""
                name="timeInNetwork"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.timeInNetwork}
                isInvalid={!!formik.errors.timeInNetwork && !!formik.touched.timeInNetwork}
            />
            {formik.touched.timeInNetwork && formik.errors.timeInNetwork && (
                <Form.Control.Feedback type="invalid">{formik.errors.timeInNetwork}</Form.Control.Feedback>
            )}
        </Form.Group>
        <div className="mb20px"></div>
        <Form.Group className="operator-character__form-item">
            <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Напряжение батареи (В)</Form.Label>
            <Form.Control
                type="text"
                placeholder=""
                name="batteryVoltage"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.batteryVoltage}
                isInvalid={!!formik.errors.batteryVoltage && !!formik.touched.batteryVoltage}
            />
            {formik.touched.batteryVoltage && formik.errors.batteryVoltage && (
                <Form.Control.Feedback type="invalid">{formik.errors.batteryVoltage}</Form.Control.Feedback>
            )}
        </Form.Group>
        <div className="mb20px"></div>
        <Form.Group className="operator-character__form-item">
            <Form.Label style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>Температура прибора учета (С°)</Form.Label>
            <Form.Control
                type="text"
                placeholder=""
                name="temperature"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.temperature}
                isInvalid={!!formik.errors.temperature && !!formik.touched.temperature}
            />
            {formik.touched.temperature && formik.errors.temperature && (
                <Form.Control.Feedback type="invalid">{formik.errors.temperature}</Form.Control.Feedback>
            )}
        </Form.Group>
        <div className="mb16px"></div>
        <Form.Group>
            <Form.Check
                checked={formik.values.disbalance}
                name="creditResidue"
                type="checkbox"
                label="Режим дисбаланса"
                onChange={(e) => { }}
            />
        </Form.Group>
        <div className="mb16px"></div>
        <Form.Group>
            <Form.Check
                checked={formik.values.relay}
                name="creditResidue"
                type="checkbox"
                label="Реле нагрузки"
                onChange={(e) => { }}
            />
        </Form.Group>
        <div className="mb16px"></div>
        <Form.Group>
            <Form.Check
                checked={formik.values.programming}
                name="creditResidue"
                type="checkbox"
                label="Режим программирования"
                onChange={(e) => { }}
            />
        </Form.Group>

    </div>
}