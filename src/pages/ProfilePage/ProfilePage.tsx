import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { MainButton } from "../../components/uiKit/Buttons/MainButton";
import { operatorProfileThunk } from "../../store/slicesAndThunks/users/operators/operators.thunks";
import {
  editProfileUser,
  userProfileThunk,
} from "../../store/slicesAndThunks/users/user/user.thunks";
import { useAppDispatch, useTypedSelector } from "../../utils/hooks/reduxHooks";
import { PasswordEditCard } from "../OperatorProfilePage/PasswordEditCard";

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const { userProfile } = useTypedSelector((state) => state.user);
  const { privileges } = useTypedSelector((state) => state.auth);

  const [passwordFormOpen, setPasswordFormOpen] = useState<boolean>(false);

  const getProfileData = async () => {
    await dispatch(userProfileThunk());
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userProfile?.firstname,
      lastname: userProfile?.lastname,
      phoneNumber: userProfile?.phoneNumber,
      fathersname: userProfile?.fathersname,
    },
    // // aedid: string;
    //     firstname: string;
    //     lastname: string;
    //     fathersname: string;
    //     phoneNumber: string | number;
    onSubmit: async (values: any) => {
      await dispatch(
        editProfileUser({
          ...values,
          id: userProfile?.id,
        })
      );
    },
  });

  console.log(userProfile);
  return (
    <div style={{ width: "100%" }} className="operatorProfile">
      <div style={{ width: "100%" }} className="operatorProfile_block">
        <div className="operatorProfile_block__header">Личные данные</div>
        <Form onSubmit={formik.handleSubmit}>
          <div className="operatorProfile_block__body">
            {/* <div className="infoLine" style={{ marginTop: "28px" }}>
            <p className="infoLine_text">Должность</p>
            <p className="infoLine_text">Оператор</p>
          </div>
          <div className="infoLine">
            <p className="infoLine_text">Имя</p>
            <p className="infoLine_text">{userProfile?.firstname}</p>
          </div> */}

            <Form.Group>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                value={formik.values.firstname}
                onChange={formik.handleChange}
                type="text"
                placeholder=""
                name="firstname"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                value={formik.values.lastname}
                onChange={formik.handleChange}
                type="text"
                placeholder=""
                name="lastname"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Отчество</Form.Label>
              <Form.Control
                value={formik.values.fathersname}
                onChange={formik.handleChange}
                type="text"
                placeholder=""
                name="fathersname"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Номер телефона</Form.Label>
              <Form.Control
                value={formik.values.phoneNumber || ""}
                onChange={formik.handleChange}
                type="text"
                placeholder=""
                name="phoneNumber"
              />
            </Form.Group>
            <div
              style={{ marginTop: 40, display: "flex", justifyContent: "end" }}
            >
              <MainButton
                title="Сохранить"
                style={{ width: 139, height: 40, fontSize: 14 }}
              />
            </div>
          </div>
        </Form>
      </div>

      {/* <div style={{ marginTop: "8px" }}>
        {!passwordFormOpen ? (
          <div className="operatorProfile_block">
            <div className="operatorProfile_block__header">Безопасность</div>
            <div className="operatorProfile_block__body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p className="title">Изменить пароль</p>
                  <p className="title date">
                    Последнее изменение: 15.01.2020 12:56
                  </p>
                </div>

                <MainButton
                  title="Изменить"
                  //   fetching={isFetchingModal}
                  style={{ width: 139, height: 40, fontSize: 16 }}
                  onClick={() => setPasswordFormOpen(true)}
                />
              </div>
            </div>
          </div>
        ) : (
          <PasswordEditCard
            lastPasswordChange={"awd"}
            setPasswordFormOpen={setPasswordFormOpen}
          />
        )}
      </div> */}
    </div>
  );
};
