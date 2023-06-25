import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { useForm } from "react-hook-form";
import { Container, Stack } from "@mui/material";
import Logo from "../../components/Logo";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    password: Yup.string().required(),
  });

  const methods = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      login(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <Stack
          spacing={2}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Logo />
          <RHFTextField name="name" label="Tên" />
          <RHFTextField name="password" label="Mật khẩu" />

          <LoadingButton loading={loading} type="submit" variant="contained">
            Đăng nhập
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}
