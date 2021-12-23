import * as Yup from "yup";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { useLocation } from "react-router-dom";
// @mui
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import SignatureCanvas from "react-signature-canvas";
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
// utils
import { fData } from "../../../utils/formatNumber";
import axios from "src/utils/axios";
//hook
import useAuth from "../../../hooks/useAuth";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// @types
import { UserManager } from "../../../@types/user";
// components
import Label from "../../../components/Label";
import { UploadAvatar } from "../../../components/upload";
import { string } from "yup/lib/locale";
import { type } from "os";
import ReactSignatureCanvas from "react-signature-canvas";
import Image from "src/components/Image";

// ----------------------------------------------------------------------
type initialValues = {
  imgCardID: object;
  imgProfile: object;
  firstName: string;
  lastName: string;
  birthDay: string;
  cardid: number;
  username: string;
  password: string;
  email: string;
  telephone: number;
  address: string;
  provinceCode: string;
  province: string;
  amphurCode: string;
  amphur: string;
  tombonCode: string;
  tombon: string;
  postCode: string;
  signID: string;
};

interface IProvince {
  id: number;
  provinceCode: string;
  provinceName: string;
  geoId: number;
}

interface IAmphur {
  id: number;
  amphurCode: string;
  amphurName: string;
  geoId: number;
  provinceId: number;
}

interface ITumbon {
  id: number;
  districtCode: string;
  districtName: string;
  amphurId: number;
  provinceId: number;
  geoId: number;
}

interface IFile {
  id: number;
  districtCode: string;
  districtName: string;
  amphurId: number;
  provinceId: number;
  geoId: number;
}

export default function UserNewForm() {
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");

  const { register, update } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const sigPadRef = useRef<ReactSignatureCanvas>(null);
  const [amphurList, setAmphurList] = useState<IAmphur[]>([]);
  const [tumbonList, setTumbonList] = useState<ITumbon[]>([]);

  const [province, setProvince] = useState<IProvince[]>([]);
  const [amphur, setAmphur] = useState<IAmphur[]>([]);
  const [tombon, setTombon] = useState<ITumbon[]>([]);

  const EditUser = {
    imgProfile: Yup.object().required("กรุณาใส่รูปประจำตัว"),
    firstName: Yup.string().required("กรุณากรอกชื่อ"),
    lastName: Yup.string().required("กรุณากรอกนามสกุล"),
    birthDay: Yup.string().required("กรุณากรอกวัน/เดือน/ปีเกิด"),
    cardid: Yup.string().required("กรุณากรอกเลขบัตรประชาชน"),
    email: Yup.string().required("กรุณากรอกอีเมลล์").email(),
    telephone: Yup.string().required("กรุณากรอกเบอร์โทรศัพท์"),
    address: Yup.string().required("กรุณากรอกที่อยู่"),
    provinceCode: Yup.string().required("กรุณากรอกจังหวัด"),
    amphurCode: Yup.string().required("กรุณากรอกอำเภอ"),
    tombonCode: Yup.string().required("กรุณากรอกตำบล"),
    postCode: Yup.string().required("กรุณากรอกรหัสไปรษณีย์"),
  };

  const CreateUser = {
    ...EditUser,
    imgCardID: Yup.object().required("กรุณาใส่รูปบัตรประชาชน"),
    signID: Yup.string().required("กรุณากรอกลายเซ็น"),
  };

  const UserSchema = Yup.object().shape(isEdit ? EditUser : CreateUser);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      imgCardID: "",
      imgProfile: "",
      firstName: "",
      lastName: "",
      birthDay: "",
      cardid: "",
      username: "",
      password: "",
      email: "",
      telephone: "",
      address: "",
      provinceCode: "",
      province: "",
      amphurCode: "",
      amphur: "",
      tombonCode: "",
      tombon: "",
      postCode: "",
      signID: "",
      allow: false,
      status: 0,
    },
    validationSchema: UserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const res = province.find((o) => String(o.id) === values.provinceCode);
        if (res) {
          values.province = res.provinceName;
        } else {
          values.province = "";
        }
        const res2 = amphur.find((o) => String(o.id) === values.amphurCode);
        if (res2) {
          values.amphur = res2?.amphurName;
        } else {
          values.amphur = "";
        }
        const res3 = tombon.find((o) => String(o.id) === values.tombonCode);
        if (res3) {
          values.tombon = res3?.districtName;
        } else {
          values.tombon = "";
        }
        values.username = values.cardid;
        values.password = values.cardid;
        const imgCardID = values.imgCardID as any;
        const imgProfile = values.imgProfile as any;
        const formData: any = new FormData();
        formData.append("imgProfile", imgProfile.path);
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("birthDay", values.birthDay);
        formData.append("cardid", values.cardid);
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("telephone", values.telephone);
        formData.append("address", values.address);
        formData.append("provinceCode", values.provinceCode);
        formData.append("province", values.province);
        formData.append("amphurCode", values.amphurCode);
        formData.append("amphur", values.amphur);
        formData.append("tombonCode", values.tombonCode);
        formData.append("tombon", values.tombon);
        formData.append("postCode", values.postCode);
        if (isEdit) {
          try {
            formData.append("imgCardID", null);
            await update(formData);
          } catch (error) {
            console.log(error);
          }
        } else {
          formData.append("password", values.password);
          formData.append("signID", values.signID);
          formData.append("imgCardID", imgCardID.path);
          await register(formData);
        }
        resetForm();
        setSubmitting(false);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.profile);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  let { values } = formik;

  const fetchData = async () => {
    await Promise.all([
      axios.get("api/province").then((res) => setProvince(res.data)),
      axios.get("api/amphur").then((res) => setAmphur(res.data)),
      axios.get("api/tombun").then((res) => setTombon(res.data)),
    ]);
    if (isEdit) {
      const ID = "6504651406546";
      const { data } = await axios.get(`/api/user/username/${ID}`);
      const list: any = [];
      Object.keys(data).map((o) => {
        if (
          !["provinceCode", "amphurCode", "tombonCode", "image"].includes(o)
        ) {
          list.push(setFieldValue(o, data[o]));
        }
      });
      await Promise.all(list);
      const imgProfile = {
        path: null,
        preview: data.image.url,
      };
      setFieldValue("imgProfile", imgProfile);
      setFieldValue("provinceCode", data["provinceCode"]);
      setFieldValue("amphurCode", data["amphurCode"]);
      setFieldValue("tombonCode", data["tombonCode"]);
      setFieldValue("allow", true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const list = amphur.filter(
      (o) => String(o.provinceId) === values.provinceCode
    );
    setAmphurList(list);
    setFieldValue("amphurCode", "");
  }, [values.provinceCode]);

  useEffect(() => {
    const list = tombon.filter((o) => String(o.amphurId) === values.amphurCode);
    setTumbonList(list);
    setFieldValue("tombonCode", "");
  }, [values.amphurCode]);

  const handleDrop = useCallback(
    (acceptedFiles, type) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue(type, {
          path: file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  const setSignature = () => {
    const { current } = sigPadRef;
    if (!current?.isEmpty()) {
      setFieldValue(
        "signID",
        current?.getTrimmedCanvas().toDataURL("image/png")
      );
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={12} sm={8} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={values.status ? "error" : "success"}
                  sx={{
                    textTransform: "uppercase",
                    position: "absolute",
                    top: 24,
                    right: 24,
                  }}
                >
                  {values.status ? "ไม่ใช้งาน" : "ใช้งาน"}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.imgProfile}
                  maxSize={3145728}
                  onDrop={(file) => handleDrop(file, "imgProfile")}
                  error={Boolean(touched.imgProfile && errors.imgProfile)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {touched.imgProfile && errors.imgProfile}
                </FormHelperText>
              </Box>

              <Typography
                component="span"
                variant="body1"
                sx={{ color: theme.palette.grey[800] }}
                style={{ textAlign: "center", display: "block" }}
              >
                รูปประจำตัว
              </Typography>

              {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) =>
                        setFieldValue("status", event.target.checked ? 1 : 0)
                      }
                      checked={values.status === 1}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{
                    mx: 0,
                    mt: 3,
                    width: 1,
                    justifyContent: "space-between",
                  }}
                />
              )}
            </Card>

            {!isEdit && (
              <Card sx={{ py: 10, px: 3, mt: 3 }}>
                <Box sx={{ mb: 5 }}>
                  <UploadAvatar
                    accept="image/*"
                    file={values.imgCardID}
                    maxSize={3145728}
                    onDrop={(file) => handleDrop(file, "imgCardID")}
                    error={Boolean(touched.imgCardID && errors.imgCardID)}
                    caption={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: "auto",
                          display: "block",
                          textAlign: "center",
                          color: "text.secondary",
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
                  <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                    {touched.imgCardID && errors.imgCardID}
                  </FormHelperText>
                </Box>

                <Typography
                  component="span"
                  variant="body1"
                  sx={{ color: theme.palette.grey[800] }}
                  style={{ textAlign: "center", display: "block" }}
                >
                  รูปบัตรประชาชน
                </Typography>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <Card sx={{ p: 3 }} style={{ height: "100%" }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="ชื่อจริง"
                    {...getFieldProps("firstName")}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    fullWidth
                    label="นามสกุล"
                    {...getFieldProps("lastName")}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="วัน/เดือน/ปีเกิด"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.toString().slice(0, 10);
                    }}
                    {...getFieldProps("birthDay")}
                    error={Boolean(touched.birthDay && errors.birthDay)}
                    helperText={touched.birthDay && errors.birthDay}
                  />
                  <TextField
                    fullWidth
                    label="เลขบัตรประชาชน"
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.toString().slice(0, 13);
                    }}
                    {...getFieldProps("cardid")}
                    error={Boolean(touched.cardid && errors.cardid)}
                    helperText={touched.cardid && errors.cardid}
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Email ติดต่อ"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="เบอร์โทรศัพท์"
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.toString().slice(0, 10);
                    }}
                    {...getFieldProps("telephone")}
                    error={Boolean(touched.telephone && errors.telephone)}
                    helperText={touched.telephone && errors.telephone}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Address"
                  {...getFieldProps("address")}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    select
                    fullWidth
                    label="จังหวัด"
                    placeholder="provinceCode"
                    {...getFieldProps("provinceCode")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.provinceCode && errors.provinceCode)}
                    helperText={touched.provinceCode && errors.provinceCode}
                  >
                    <option value={""} />
                    {province.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.provinceName}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="อำเภอ"
                    placeholder="amphurCode"
                    {...getFieldProps("amphurCode")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.amphurCode && errors.amphurCode)}
                    helperText={touched.amphurCode && errors.amphurCode}
                  >
                    <option value={""} />
                    {amphurList.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.amphurName}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    select
                    fullWidth
                    label="ตำบล"
                    placeholder="tombonCode"
                    {...getFieldProps("tombonCode")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.tombonCode && errors.tombonCode)}
                    helperText={touched.tombonCode && errors.tombonCode}
                  >
                    <option value={""} />
                    {tumbonList.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.districtName}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="รหัสไปรษณีย์"
                    {...getFieldProps("postCode")}
                    error={Boolean(touched.postCode && errors.postCode)}
                    helperText={touched.postCode && errors.postCode}
                  />
                </Stack>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {!isEdit && (
                    <>
                      <div
                        style={{
                          width: 320,
                          border: "1px solid rgba(0, 0, 0, 0.18)",
                        }}
                      >
                        <SignatureCanvas
                          canvasProps={{
                            width: 320,
                            height: 200,
                            className: "sigCanvas",
                          }}
                          ref={sigPadRef}
                          onEnd={setSignature}
                        />
                      </div>
                      <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                        {touched.signID && errors.signID}
                      </FormHelperText>
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{ color: theme.palette.grey[800], mt: 1 }}
                        style={{ textAlign: "center", display: "block" }}
                      >
                        ลายเซ็นต์ผู้สมัครตัวแทนขาย
                      </Typography>
                      <FormControlLabel
                        sx={{ mt: 1 }}
                        control={
                          <Checkbox
                            checked={values.allow}
                            onChange={(e) =>
                              setFieldValue("allow", e.target.checked)
                            }
                          />
                        }
                        label="ข้าพเจ้าได้ตรวจสอบข้อมูลครบถ้วนแล้ว และยืนยันว่าเป็นข้อมูลจริง"
                      />
                    </>
                  )}

                  <Box
                    sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      disabled={!values.allow}
                    >
                      {!isEdit ? "Create User" : "Save Changes"}
                    </LoadingButton>
                  </Box>
                </div>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useSnackbar } from 'notistack';
// import { useFormik, Form, FormikProvider } from 'formik';
// // @mui
// import { Stack, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// // hooks
// import useAuth from '../../../hooks/useAuth';
// import useIsMountedRef from '../../../hooks/useIsMountedRef';
// // components
// import Iconify from '../../../components/Iconify';
// import { IconButtonAnimate } from '../../../components/animate';

// // ----------------------------------------------------------------------

// type InitialValues = {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   afterSubmit?: string;
// };

// export default function RegisterForm() {
//   const { register } = useAuth();
//   const isMountedRef = useIsMountedRef();
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const [showPassword, setShowPassword] = useState(false);

//   const RegisterSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('First name required'),
//     lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
//     email: Yup.string().email('Email must be a valid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const formik = useFormik<InitialValues>({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//     },
//     validationSchema: RegisterSchema,
//     onSubmit: async (values, { setErrors, setSubmitting }) => {
//       try {
//         await register(values.email, values.password, values.firstName, values.lastName);
//         enqueueSnackbar('Register success', {
//           variant: 'success',
//           action: (key) => (
//             <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
//               <Iconify icon={'eva:close-fill'} />
//             </IconButtonAnimate>
//           ),
//         });
//         if (isMountedRef.current) {
//           setSubmitting(false);
//         }
//       } catch (error) {
//         console.error(error);
//         if (isMountedRef.current) {
//           setErrors({ afterSubmit: error.message });
//           setSubmitting(false);
//         }
//       }
//     },
//   });

//   const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

//   return (
//     <FormikProvider value={formik}>
//       <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//         <Stack spacing={3}>
//           {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

//           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//             <TextField
//               fullWidth
//               label="First name"
//               {...getFieldProps('firstName')}
//               error={Boolean(touched.firstName && errors.firstName)}
//               helperText={touched.firstName && errors.firstName}
//             />

//             <TextField
//               fullWidth
//               label="Last name"
//               {...getFieldProps('lastName')}
//               error={Boolean(touched.lastName && errors.lastName)}
//               helperText={touched.lastName && errors.lastName}
//             />
//           </Stack>

//           <TextField
//             fullWidth
//             autoComplete="username"
//             type="email"
//             label="Email address"
//             {...getFieldProps('email')}
//             error={Boolean(touched.email && errors.email)}
//             helperText={touched.email && errors.email}
//           />

//           <TextField
//             fullWidth
//             autoComplete="current-password"
//             type={showPassword ? 'text' : 'password'}
//             label="Password"
//             {...getFieldProps('password')}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
//                     <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             error={Boolean(touched.password && errors.password)}
//             helperText={touched.password && errors.password}
//           />

//           <LoadingButton
//             fullWidth
//             size="large"
//             type="submit"
//             variant="contained"
//             loading={isSubmitting}
//           >
//             Register
//           </LoadingButton>
//         </Stack>
//       </Form>
//     </FormikProvider>
//   );
// }
