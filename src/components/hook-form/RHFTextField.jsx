import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import React from "react";

function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default React.memo(RHFTextField);
