import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Box, Stack } from "@mui/material";
import { isString } from "lodash";

function RHFUpload({ name, label, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        const {
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          fileRejections,
        } = useDropzone({
          multiple: false,
          ...other,
          ...field,
          accept: "image/*",
        });
        return (
          <>
            <label htmlFor={name}>{label}</label>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <div
                {...getRootProps()}
                style={{
                  outline: "none",
                  overflow: "hidden",
                  position: "relative",
                  padding: "5px 1px",
                  borderRadius: "4px",
                  transition: "all 0.3s",
                  backgroundColor: "#f5f5f5",
                  border: "1px dashed #d9d9d9",
                  height: "200px",

                  ...(isDragActive && {
                    backgroundColor: "#e6f7ff",
                    border: "1px dashed #1890ff",
                  }),

                  ...(isDragReject && {
                    backgroundColor: "#fff1f0",
                    border: "1px dashed #ff4d4f",
                  }),

                  ...(error && {
                    backgroundColor: "#fff1f0",
                    border: "1px dashed #ff4d4f",
                  }),

                  "&:hover": {
                    backgroundColor: "#fafafa",
                    border: "1px dashed #d9d9d9",
                  },
                }}
              >
                <input {...getInputProps()} />

                <Stack
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  direction={{
                    xs: "column",
                    md: "row",
                  }}
                  sx={{
                    width: 1,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {!field.value && (
                    <>
                      <p style={{ margin: 0 }}>Kéo thả hoặc chọn file</p>
                    </>
                  )}
                </Stack>

                {field.value && (
                  <img
                    src={
                      isString(field.value)
                        ? field?.value
                        : field?.value?.preview
                    }
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </div>
            </Box>
            {checkError && (
              <p style={{ color: "#ff4d4f", margin: 0 }}>{error?.message}</p>
            )}
          </>
        );
      }}
    />
  );
}

export default React.memo(RHFUpload);
