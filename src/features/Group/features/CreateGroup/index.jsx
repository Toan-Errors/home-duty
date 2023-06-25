import { Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFTextField from "components/hook-form/RHFTextField";
import FormProvider from "components/hook-form/FormProvider";
import RHFEditor from "components/hook-form/RHFEditor";
import RHFUpload from "components/hook-form/RHFUpload";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import { useCustomMutation } from "hooks/useQuery";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { useCustomQuery } from "hooks/useQuery";

export default function CreateGroup() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");
  const { data: group } = useCustomQuery(`/groups/${id}`, "get", {
    enabled: isEdit,
  });

  const options = {
    onSuccess: (data) => {
      if (data?._id) {
        if (isEdit) {
          toast.success("Cập nhật nhóm thành công");
          methods.reset(data);
        } else {
          toast.success("Tạo nhóm thành công");
          methods.reset();
        }
      } else {
        toast.error(data?.message || "Có lỗi xảy ra");
      }
    },
  };

  const { mutate, isLoading } = useCustomMutation("/groups", "post", options);
  const { mutate: mutateEdit, isLoading: isLoadingEdit } = useCustomMutation(
    `/groups/${id}`,
    "put",
    options
  );

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });

  const defaultValues = {
    name: group?.name || "",
    description: group?.description || "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEdit && group?._id) {
      methods.reset(defaultValues);
    } else {
      methods.reset();
    }
  }, [group, isEdit, methods]);

  const handleSubmit = (data) => {
    if (isEdit) {
      mutateEdit(data);
    } else {
      mutate(data);
    }
  };

  return (
    <>
      <h1>Tạo mới nhóm</h1>
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5}>
            <Stack spacing={2}>
              <RHFTextField name="name" label="Tên nhóm" />
              <RHFEditor name="description" label="Mô tả" />
            </Stack>
            <Stack mt={5} spacing={2}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                {isEdit ? "Cập nhật" : "Tạo mới"}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
