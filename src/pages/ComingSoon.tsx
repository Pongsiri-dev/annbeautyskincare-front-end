// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Stack,
  Container,
  Typography
} from "@mui/material";
// hooks
import useCountdown from "../hooks/useCountdown";
// components
import Page from "../components/Page";
import { Link as RouterLink } from 'react-router-dom';
// assets
import Image from "src/components/Image";
import { MotionInView, varFade } from "../components/animate";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));
const ScreenStyle = styled(MotionInView)(({ theme }) => ({
  maxWidth: 160,
  height: "100%",
  display: "flex",
  alignItems: "center",
  marginLeft: "34%",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  return (
    <Page title="Line Official" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <Typography variant="h3" paragraph>
              Add Line Official
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Scan QR Code สำหรับช่องทาง Line Official
            </Typography>
            <ScreenStyle
                  threshold={0.72}>
              <Image src={'/qrcode/qrcode_light.png'} width="160px" height="90px"/>
            </ScreenStyle>
            <Button to="/" size="large" variant="contained" component={RouterLink}>
                กลับหน้าแรก
              </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
