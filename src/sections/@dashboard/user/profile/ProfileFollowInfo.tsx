// @mui
import { Card, Stack, Typography, Divider } from "@mui/material";
// utils
import { fNumber } from "../../../../utils/formatNumber";
// @types
import { Profile, UserAbout } from "../../../../@types/user";

// ----------------------------------------------------------------------

type Props = {
  profile: UserAbout;
};

export default function ProfileFollowInfo({ profile }: Props) {
  const { bill } = profile;
  let billSum = bill || 0;
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(billSum)} ชิ้น</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ยอดซื้อรวม
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
