import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
// @mui
import { Stack, Card, TextField, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// @types
import { UserAbout } from "../../../../@types/user";
// components
import Iconify from "../../../../components/Iconify";
import axiosInstance from "src/utils/axios";

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    value: "facebook",
    icon: <Iconify icon={"eva:facebook-fill"} width={24} height={24} />,
  },
  {
    value: "instagram",
    icon: (
      <Iconify icon={"ant-design:instagram-filled"} width={24} height={24} />
    ),
  },
  {
    value: "tiktok",
    icon: <Iconify icon={"logos:tiktok-icon"} width={24} height={24} />,
  },
  {
    value: "youtube",
    icon: <Iconify icon={"bi:line"} width={24} height={24} />,
  },
] as const;

// ----------------------------------------------------------------------

export default function AccountSocialLinks() {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      facebook: "",
      instagram: "",
      tiktok: "",
      youtube: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      //call api
      let myId = localStorage.getItem("me");
      await axiosInstance
        .put("/api/auth/social", {
          id: myId,
          facebook: values.facebook,
          instagram: values.instagram,
          tiktok: values.tiktok,
          youtube: values.youtube,
        })
        .then((res: any) => {
          if (res?.statusCode === "ok" || res?.statusCodeValue === 200) {
            console.log(res?.body);
          }
        });
      // .finally(() => {
      //   window.location.reload();
      // });

      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(values);
      setSubmitting(false);
      enqueueSnackbar("Save success", { variant: "success" });
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            {SOCIAL_LINKS.map((link) => (
              <TextField
                key={link.value}
                fullWidth
                {...getFieldProps(link.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {link.icon}
                    </InputAdornment>
                  ),
                }}
              />
            ))}

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
