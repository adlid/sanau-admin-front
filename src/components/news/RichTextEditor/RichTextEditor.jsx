import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box } from "@material-ui/core";
import { useRichTextEditorStyles } from "./RichTextEditorStyles";
import "./RichTextEditor.css";
import { CustomUploadAdapter } from "./UploadAdapter";

const RichTextEditor = (props) => {
  const classes = useRichTextEditorStyles();

  return (
    <Box className={classes.root}>
      <CKEditor
        editor={ClassicEditor}
        data={props.data}
        onReady={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
            return new CustomUploadAdapter(loader);
          };
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.onChange(props.fieldName, data);
        }}
        config={{
          placeholder: props.placeholder,
          removePlugins: ["MediaEmbed"],
          ckfinder: {
            uploadUrl: process.env.REACT_APP_API_BASE_URL + "/api/v1/news/image/upload",
          },
        }}
        disabled={props.disabled}
      />
    </Box>
  );
};

export { RichTextEditor };
