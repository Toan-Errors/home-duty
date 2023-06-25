import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

function RHFEditor({ name, label, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <label htmlFor={name}>{label}</label>
          <ReactQuill
            theme="snow"
            {...field}
            {...other}
            style={{
              height: "200px",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          />
        </>
      )}
    />
  );
}

export default React.memo(RHFEditor);
