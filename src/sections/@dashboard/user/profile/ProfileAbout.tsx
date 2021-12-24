// @mui
import { styled } from "@mui/material/styles";
import { Link, Card, Typography, CardHeader, Stack } from "@mui/material";
// @types
import { UserAbout } from "../../../../@types/user";
// components
import Iconify from "../../../../components/Iconify";

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

type Props = {
  profile: UserAbout;
};

export default function ProfileAbout({ profile }: Props) {
  const {
    firstName,
    lastName,
    level,
    email,
    address,
    amphur,
    tombon,
    province,
    postCode,
  } = profile;

  return (
    <Card>
      <CardHeader title="ข้อมูลส่วนตัว" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{`ชื่อ: ${firstName} ${lastName}`}</Typography>
        <Typography variant="body2">{`ระดับ: ${level}`}</Typography>
        <Typography variant="body2">{`อีเมลล์: ${email}`}</Typography>
        <Typography variant="body2">{`ที่อยู่: ${address} ${amphur} ${tombon} ${province} ${postCode}`}</Typography>

        {/* <Stack direction="row">
          <IconStyle icon={"eva:pin-fill"} />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={"eva:email-fill"} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={"ic:round-business-center"} />
          <Typography variant="body2">
            {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={"ic:round-business-center"} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack> */}
      </Stack>
    </Card>
  );
}
