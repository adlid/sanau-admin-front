import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MainButton } from "../../components/uiKit/Buttons/MainButton";
import { operatorProfileThunk } from "../../store/slicesAndThunks/users/operators/operators.thunks";
import { useAppDispatch, useTypedSelector } from "../../utils/hooks/reduxHooks";
import { PasswordEditCard } from "./PasswordEditCard";

export const OperatorProfilePage = () => {
  // hooks
  const dispatch = useAppDispatch();
  const { operatorProfile } = useTypedSelector((state) => state.operators);
  const { privileges } = useTypedSelector((state) => state.auth);

  const [passwordFormOpen, setPasswordFormOpen] = useState<boolean>(false);

  const getProfileData = async () => {
    await dispatch(operatorProfileThunk());
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="operatorProfile">
      <div className="operatorProfile_block">
        <div className="operatorProfile_block__header">Личные данные</div>
        <div className="operatorProfile_block__body">
          <p className="title">Фамилия Имя Отчество</p>

          <div className="infoLine" style={{ marginTop: "28px" }}>
            <p className="infoLine_text">Должность</p>
            <p className="infoLine_text">Оператор</p>
          </div>
          <div className="infoLine">
            <p className="infoLine_text">Номер телефона</p>
            <p className="infoLine_text">{operatorProfile?.phoneNumber}</p>
          </div>
          <div className="infoLine">
            <p className="infoLine_text">Email</p>
            <p className="infoLine_text">{operatorProfile?.email}</p>
          </div>
          <div className="infoLine">
            <p className="infoLine_text">Логин</p>
            <p className="infoLine_text">{operatorProfile?.login}</p>
          </div>
          <div className="infoLine">
            <p className="infoLine_text">Права</p>
            <p
              className="infoLine_text"
              style={{ width: "50%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
            >
              {JSON.parse(privileges)
                ?.map((right: any) => right.name + ", ")
                .join("")}
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        {!passwordFormOpen ? (
          <div className="operatorProfile_block">
            <div className="operatorProfile_block__header">Безопасность</div>
            <div className="operatorProfile_block__body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p className="title">Изменить пароль</p>
                  <p className="title date">Последнее изменение: 15.01.2020 12:56</p>
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
          <PasswordEditCard lastPasswordChange={"awd"} setPasswordFormOpen={setPasswordFormOpen} />
        )}
      </div>
    </div>
  );
};
