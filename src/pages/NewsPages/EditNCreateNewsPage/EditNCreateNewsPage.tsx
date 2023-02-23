import * as yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import * as queryString from "querystring";
import { Button, Form, Spinner } from "react-bootstrap";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
// components
import { RichTextEditor } from "../../../components/news/RichTextEditor/RichTextEditor";
import { createNewsThunk, editNewsThunk, detailNewsThunk } from "../../../store/slicesAndThunks/news/news.thunks";
// redux
import { useAppDispatch, useDidUpdateEffect, useTypedSelector } from "../../../utils/hooks/reduxHooks";
// icons
import { AddImageIcon } from "../../../assets/imgs/AddImageIcon";
import { MainButton } from "../../../components/uiKit/Buttons/MainButton";
import { FormHelperText } from "@material-ui/core";
import { resetNewsState } from "../../../store/slicesAndThunks/news/news.slices";

interface IEditNCreateNewsPageProps {}

export const EditNCreateNewsPage: FC<IEditNCreateNewsPageProps> = (props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [detailInfoLoading, setDetailInfoLoading] = useState<boolean>(false);

  // IMAGE HANDLERS
  const [imageTouched, setImageTouched] = useState<boolean>(false);
  const [previewFile, setPreviewFile] = useState<any>(null); // image preview handler
  const [files, setFiles] = useState<File[]>([]); // image to send handler

  const { newsId }: any = queryString.parse(history.location.search.substring(1));
  const detailNews = useTypedSelector((state) => state.news.detailNews);

  const [prevImage, setPrevImage] = useState<string>("");

  useEffect(() => {
    setPrevImage(detailNews?.titleImageURL || "");
  }, [detailNews]);

  // FORM HANDLERS
  const form = useFormik({
    initialValues: {
      title: detailNews?.title,
      body: detailNews?.body,
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Обязательное поле"),
      body: yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      if (!newsId && files.length === 0) {
        setImageTouched(true);
        return enqueueSnackbar("Выберите изображение", { variant: "error" });
      }
      const form = new FormData();
      const request = { title: values.title, body: values.body, imagesName: [] };
      const requestJSON = JSON.stringify(request);
      files.length !== 0 && form.append("file", files[0]);
      form.append("request", requestJSON);
      dispatch(!newsId ? createNewsThunk(form) : editNewsThunk({ id: newsId, values: form }));
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  // FORM ON CHANGE HANDLERS
  const handleChangeFieldByName = (field_name: string, value: any) => form.setFieldValue(field_name, value);
  const checkBody = () => form.setFieldTouched("body", true);
  useDidUpdateEffect(checkBody, [form.values.body]);

  // ADD IMAGE
  const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      // set image preview
      setPreviewFile({ file: URL.createObjectURL(e.target.files![0]) });
    }
    const fileList = e.target.files;
    if (fileList) {
      const fileCount = fileList.length;
      let files: File[] = [];
      for (let i = 0; i < fileCount; i++) {
        // set image for sending
        files.push(fileList[i]);
      }
      setFiles([...files]);
      setImageTouched(false);
    }
    e.target.value = "";
  };

  // DELETE IMAGE
  const handleRemoveFile = () => {
    setPrevImage("");
    setFiles([]);
    setPreviewFile(null);
    setImageTouched(true);
  };

  // GET DETAIL NEWS INFO
  const getDetailNewsInfo = async () => {
    setDetailInfoLoading(true);
    await dispatch(detailNewsThunk(newsId));
    setDetailInfoLoading(false);
  };

  useEffect(() => {
    newsId && getDetailNewsInfo();
  }, [newsId]);

  useEffect(() => {
    return () => {
      dispatch(resetNewsState());
    };
  }, []);

  useEffect(() => {
    (form.values.body || detailNews?.body) && form.setFieldTouched("body", true);
  }, [form.values.body, detailNews?.body]);

  return (
    <Form className="edit_create_news" onSubmit={form.handleSubmit}>
      <input
        id="file-upload"
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
        style={{ display: "none" }}
        onChange={handleAddFiles}
      />
      <div className={imageTouched ? "edit_create_news__dropzone error_dash" : "edit_create_news__dropzone"}>
        {previewFile || prevImage ? (
          <>
            <img style={{ display: "block", height: "100%" }} src={previewFile?.file || prevImage} alt="news image" />
            <Button onClick={handleRemoveFile} className="edit_create_news__dropzone__deleteImageBtn">
              <p>Удалить</p>
            </Button>
          </>
        ) : (
          <label htmlFor="file-upload" className="edit_create_news__dropzone__uploadZone">
            {detailInfoLoading ? (
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                <AddImageIcon />
                <p className="edit_create_news__dropzone__title">Добавить изображение к новости</p>
              </>
            )}
          </label>
        )}
      </div>
      <div className="mb12px">
        <Form.Control
          className="edit_create_news__input"
          placeholder="Заголовок новости"
          name="title"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.title}
          isInvalid={!!form.errors.title && !!form.touched.title}
        />
        {form.touched.title && form.errors.title && (
          <Form.Control.Feedback type="invalid">{form.errors.title}</Form.Control.Feedback>
        )}
      </div>
      <div style={{ position: "relative" }}>
        <RichTextEditor fieldName="body" data={form.values.body} onChange={handleChangeFieldByName} />
        {form.touched.body && (
          <FormHelperText className="edit_create_news__errorText">{form.errors.body}</FormHelperText>
        )}
      </div>

      <div className="edit_create_news__btns d-flex">
        <MainButton title="Опубликовать" style={{ width: 139, height: 40, fontSize: 14 }} />
        <div className="mr16px"></div>
        <MainButton
          title="Отмена"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => history.push("/admin/news?page=1")}
        />
      </div>
    </Form>
  );
};
