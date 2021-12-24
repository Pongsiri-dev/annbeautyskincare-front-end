// @mui
import { styled } from "@mui/material/styles";
import { Link, Card, CardHeader, Stack } from "@mui/material"; // @types
// @types
import { Profile, UserAbout } from "../../../../@types/user";
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

export default function ProfileSocialInfo({ profile }: Props) {
  // const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const SOCIALS = [
    {
      name: "Line",
      icon: <IconStyle icon={"bi:line"} color="#06c755" />,
      href: "www.myaccount-ink.con",
    },
    {
      name: "Twitter",
      icon: <IconStyle icon={"eva:twitter-fill"} color="#1C9CEA" />,
      href: "www.myaccount-ink.con",
    },
    {
      name: "Instagram",
      icon: <IconStyle icon={"ant-design:instagram-filled"} color="#D7336D" />,
      href: "www.myaccount-ink.con",
    },
    {
      name: "Facebook",
      icon: <IconStyle icon={"eva:facebook-fill"} color="#1877F2" />,
      href: "www.myaccount-ink.con",
    },
  ];

  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
