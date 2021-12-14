import * as Yup from 'yup';
import { useCallback, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import SignatureCanvas from 'react-signature-canvas';
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
  Checkbox
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { UploadAvatar } from '../../../components/upload';
import { string } from 'yup/lib/locale';
import { type } from 'os';
import ReactSignatureCanvas from 'react-signature-canvas';

// ----------------------------------------------------------------------
type initialValues = {
  imgCardID: string,
  imgProfile: string,
  firstName: string,
  lastName: string,
  birthDay: string,
  cardID: string,
  email: string,
  Tel: string,
  address: string,
  provinceCode: string,
  provinceName: string,
  amphurCode: string,
  amphurName: string,
  tumbonCode: string,
  tumbonName: string,
  postCode: string,
  signID: string,
  allow: boolean
}

export default function UserNewForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const sigPadRef = useRef<ReactSignatureCanvas>(null);

  const NewUserSchema = Yup.object().shape({
    imgCardID: Yup.string().required('กรุณาใส่รูปบัตรประชาชน'),
    imgProfile: Yup.string().required('กรุณาใส่รูปประจำตัว'),
    firstName: Yup.string().required('กรุณากรอกชื่อ'),
    lastName: Yup.string().required('กรุณากรอกนามสกุล'),
    birthDay: Yup.string().required('กรุณากรอกวัน/เดือน/ปีเกิด'),
    cardID: Yup.string().required('กรุณากรอกเลขบัตรประชาชน'),
    email: Yup.string().required('กรุณากรอกอีเมลล์').email(),
    Tel: Yup.string().required('กรุณากรอกเบอร์โทรศัพท์'),
    address: Yup.string().required('กรุณากรอกที่อยู่'),
    provinceCode: Yup.string().required('กรุณากรอกจังหวัด'),
    provinceName: Yup.string().required('กรุณากรอกจังหวัด'),
    amphurCode: Yup.string().required('กรุณากรอกอำเภอ'),
    amphurName: Yup.string().required('กรุณากรอกอำเภอ'),
    tumbonCode: Yup.string().required('กรุณากรอกตำบล'),
    tumbonName: Yup.string().required('กรุณากรอกตำบล'),
    postCode: Yup.string().required('กรุณากรอกรหัสไปรษณีย์'),
    signID: Yup.string().required('กรุณากรอกลายเซ็น')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      imgCardID: '',
      imgProfile: '',
      firstName: '',
      lastName: '',
      birthDay: '',
      cardID: '',
      email: '',
      Tel: '',
      address: '',
      provinceCode: '',
      provinceName: '',
      amphurCode: '',
      amphurName: '',
      tumbonCode: '',
      tumbonName: '',
      postCode: '',
      signID: '',
      allow: false
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        resetForm();
        setSubmitting(false);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    },
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles, type) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue(type, {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  const onSubmit = async () => {
    const {current} = sigPadRef
    if (current) {
      await setFieldValue('signID', current.getTrimmedCanvas().toDataURL('image/png'))
    }
    console.info(values)
  }

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} sm={8} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {/* {isEdit && (
                <Label
                  color={values.status !== 'active' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )} */}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.imgProfile}
                  maxSize={3145728}
                  onDrop={(file) => handleDrop(file, 'imgProfile')}
                  error={Boolean(touched.imgProfile && errors.imgProfile)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.imgProfile && errors.imgProfile}
                </FormHelperText>
              </Box>

              {/* {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) =>
                        setFieldValue('status', event.target.checked ? 'banned' : 'active')
                      }
                      checked={values.status !== 'active'}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )} */}

              <Typography
                component="span"
                variant="body1"
                sx={{ color: theme.palette.grey[800] }}
                style={{ textAlign: 'center', display: 'block' }}
              >
                รูปประจำตัว
              </Typography>
            </Card>

            <Card sx={{ py: 10, px: 3, mt: 3 }}>
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.imgCardID}
                  maxSize={3145728}
                  onDrop={(file) => handleDrop(file, 'imgCardID')}
                  error={Boolean(touched.imgCardID && errors.imgCardID)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.imgCardID && errors.imgCardID}
                </FormHelperText>
              </Box>

              <Typography
                component="span"
                variant="body1"
                sx={{ color: theme.palette.grey[800] }}
                style={{ textAlign: 'center', display: 'block' }}
              >
                รูปบัตรประชาชน
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8} md={8}>
            <Card sx={{ p: 3 }} style={{ height: '100%' }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="ชื่อจริง"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    fullWidth
                    label="นามสกุล"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="วัน/เดือน/ปีเกิด"
                    {...getFieldProps('birthDay')}
                    error={Boolean(touched.birthDay && errors.birthDay)}
                    helperText={touched.birthDay && errors.birthDay}
                  />
                  <TextField
                    fullWidth
                    label="เลขบัตรประชาชน"
                    {...getFieldProps('cardID')}
                    error={Boolean(touched.cardID && errors.cardID)}
                    helperText={touched.cardID && errors.cardID}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Email ติดต่อ"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="เบอร์โทรศัพท์"
                    {...getFieldProps('Tel')}
                    error={Boolean(touched.Tel && errors.Tel)}
                    helperText={touched.Tel && errors.Tel}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Address"
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="จังหวัด"
                    placeholder="provinceName"
                    {...getFieldProps('provinceName')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.provinceName && errors.provinceName)}
                    helperText={touched.provinceName && errors.provinceName}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="อำเภอ"
                    {...getFieldProps('amphurName')}
                    error={Boolean(touched.amphurName && errors.amphurName)}
                    helperText={touched.amphurName && errors.amphurName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="ตำบล"
                    {...getFieldProps('tumbonName')}
                    error={Boolean(touched.tumbonName && errors.tumbonName)}
                    helperText={touched.tumbonName && errors.tumbonName}
                  />
                  <TextField
                    fullWidth
                    label="รหัสไปรษณีย์"
                    {...getFieldProps('postCode')}
                    error={Boolean(touched.postCode && errors.postCode)}
                    helperText={touched.postCode && errors.postCode}
                  />
                </Stack>

                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <div style={{ width: 320, border: '1px solid rgba(0, 0, 0, 0.18)' }}>
                    <SignatureCanvas
                      canvasProps={{ width: 320, height: 200, className: 'sigCanvas' }} ref={sigPadRef} />
                  </div>
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ color: theme.palette.grey[800], mt: 1 }}
                    style={{ textAlign: 'center', display: 'block' }}
                  >
                    ลายเซ็นต์ผู้สมัครตัวแทนขาย
                  </Typography>
                  <FormControlLabel sx={{ mt: 1 }} control={<Checkbox defaultChecked checked={values.allow} onChange={(e) => setFieldValue('allow', e.target.checked)} />} label="ข้าพเจ้าได้ตรวจสอบข้อมูลครบถ้วนแล้ว และยืนยันว่าเป็นข้อมูลจริง" />
                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting} onClick={onSubmit}>
                      {/* {!isEdit ? 'Create User' : 'Save Changes'} */}
                      Create User
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