import * as React from "react";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
// @mui
import {
  TextField,
  Alert,
  Stack,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { TransitionProps } from "@mui/material/transitions";
import Iconify from "src/components/Iconify";
import axiosInstance from "src/utils/axios";

// ----------------------------------------------------------------------
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type InitialValues = {
  email: string;
  oldPassword: string;
  newPassword: string;
  afterSubmit?: string;
};

type Props = {
  onSent: VoidFunction;
  onGetEmail: (value: string) => void;
  chk: boolean;
};

export default function ResetPasswordForm({ onSent, onGetEmail, chk }: Props) {
  const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = React.useState(chk);
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("อีเมล์ไม่ถูกต้อง")
      .required("จำเป็นต้องกรอกอีเมล์ที่ใช้สมัคร"),
    oldPassword: Yup.string().required("จำเป็นต้องกรอกรหัสผ่านเดิม"),
    newPassword: Yup.string().required("จำเป็นต้องกรอกรหัสผ่านใหม่"),
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      // navigate(PATH_AUTH.login);
    }, 3000);
  };

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await axiosInstance.put("/api/auth/processResetExp", {
          email: values.email,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isMountedRef.current) {
          onSent();
          onGetEmail(formik.values.email);

          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Dialog
        open={open || false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Iconify icon="eva:shield-fill" /> {"แจ้งเตือน"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            &emsp;ระบบกำลังส่งข้อมูลเพื่อไปตรวจสอบความถูกต้อง <br />
            &emsp;กรุณาติดต่อแอดมินหลังจากทำการสมัคร
            <br />
            <br />
            &emsp;ท่านจะสามารถเข้าใช้งานระบบได้หลังจากได้รับการตรวจสอบข้อมูล
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ปิด</Button>
        </DialogActions>
      </Dialog>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}

          <TextField
            fullWidth
            {...getFieldProps("email")}
            type="email"
            label="อีเมล"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            {...getFieldProps("oldPassword")}
            type="password"
            label="รหัสผ่านเดิม"
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
          />
          <TextField
            fullWidth
            {...getFieldProps("newPassword")}
            type="password"
            label="รหัสผ่านใหม่"
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />

          <LoadingButton
            disabled={!(formik.isValid && formik.dirty)}
            onClick={handleOpen}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Reset Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
