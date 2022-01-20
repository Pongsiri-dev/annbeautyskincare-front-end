import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
// @mui
import { Stack, Card, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useContext } from "react";
import { UserContext } from "src/contexts/UserContext";
import axios from "src/utils/axios";

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const { userList } = useContext(UserContext);

  const ChangePassWordSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const result = userList.find((o: any) => o.email === values.email);
      if (!result) {
        return enqueueSnackbar("Invalid Email", { variant: "error" });
      }

      await axios.post("/api/auth/reset_password", {
        email: values.email,
        password: values.newPassword,
      });

      // await new Promise((resolve) => setTimeout(resolve, 500));
      // setSubmitting(false);
      enqueueSnackbar("Save success", { variant: "success" });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps("email")}
              fullWidth
              autoComplete="off"
              label="Email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              {...getFieldProps("newPassword")}
              fullWidth
              autoComplete="off"
              type="password"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={
                (touched.newPassword && errors.newPassword) ||
                "Password must be minimum 6+"
              }
            />

            <TextField
              {...getFieldProps("confirmNewPassword")}
              fullWidth
              autoComplete="off"
              type="password"
              label="Confirm New Password"
              error={Boolean(
                touched.confirmNewPassword && errors.confirmNewPassword
              )}
              helperText={
                touched.confirmNewPassword && errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
