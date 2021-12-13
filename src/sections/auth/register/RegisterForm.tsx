import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import { LoadingButton } from '@mui/lab';
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

// ----------------------------------------------------------------------
type initialValues = {
  name: string,
  email: string,
  phoneNumber: string,
  address: string,
  country: string,
  state:string,
  city:string,
  zipCode:string,
  avatarUrl:string,
  isVerified:string,
  status: string,
  company:string,
  role:string
}

export default function UserNewForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      avatarUrl: '',
      isVerified: '',
      status: '',
      company: '',
      role: ''
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
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
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
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatarUrl && errors.avatarUrl)}
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
                  {touched.avatarUrl && errors.avatarUrl}
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

              <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('isVerified')} />}
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="State/Region"
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Company"
                    {...getFieldProps('company')}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                  />
                  <TextField
                    fullWidth
                    label="Role"
                    {...getFieldProps('role')}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {/* {!isEdit ? 'Create User' : 'Save Changes'} */}
                  </LoadingButton>
                </Box>
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