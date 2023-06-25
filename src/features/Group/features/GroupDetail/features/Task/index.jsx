import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Grid, Stack, TextField } from "@mui/material";
import FormProvider from "components/hook-form/FormProvider";
import RHFEditor from "components/hook-form/RHFEditor";
import RHFTextField from "components/hook-form/RHFTextField";
import { useCustomQuery } from "hooks/useQuery";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function Task() {
  const { id: group } = useParams();

  const { data, isLoading } = useCustomQuery(`/groups/${group}`, "get", {
    enabled: !!group,
  });

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });

  const defaultValues = {
    group,
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(handleSubmit)}
    >
      <h1>
        {data?.name} - {data?.tasks?.length} nhiệm vụ
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={5}>
          <Stack spacing={2}>
            <RHFTextField name="name" label="Nhiệm vụ" />
            <RHFEditor name="description" label="Mô tả" />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Stack spacing={2}>
            <Controller
              name="members"
              control={methods.control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  options={data?.members || []}
                  getOptionLabel={(option) => option.user.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Thành viên" />
                  )}
                />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
