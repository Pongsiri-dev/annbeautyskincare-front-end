// @mui
import { Grid, Stack } from "@mui/material";
// @types
import { UserAbout } from "../../../../@types/user";
//
import ProfileAbout from "./ProfileAbout";
import ProfileFollowInfo from "./ProfileFollowInfo";
import ProfileSocialInfo from "./ProfileSocialInfo";

// ----------------------------------------------------------------------

type Props = {
  myProfile: UserAbout;
};

export default function Profile({ myProfile }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={5}>
        <ProfileSocialInfo profile={myProfile} />
      </Grid>
    </Grid>
  );
}
