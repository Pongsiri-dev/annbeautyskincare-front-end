// @mui
import { Grid, Stack } from "@mui/material";
// @types
import { UserAbout } from "../../../../@types/user";
//
import ProfileAbout from "./ProfileAbout";
import ProfileFollowInfo from "./ProfileFollowInfo";
import EmployeeCard from "../../../../components/EmployeeCard";

// ----------------------------------------------------------------------

type Props = {
  myProfile: UserAbout;
};

export default function Profile({ myProfile }: Props) {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <EmployeeCard profile={myProfile} />
        </Stack>
      </Grid>
    </Grid>
  );
}
