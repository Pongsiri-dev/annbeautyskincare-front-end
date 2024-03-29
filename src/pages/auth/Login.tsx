import { capitalCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography,
} from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";
// hooks
import useAuth from "../../hooks/useAuth";
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";
import Logo from "../../components/Logo";
import Image from "../../components/Image";
// sections
import { LoginForm } from "../../sections/auth/login";
import _ from "lodash";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  window.localStorage.removeItem("accessToken")
  const { method } = useAuth();

  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");

  //Product 
  const products = [
    'https://annbeautiful-storage.s3.ap-southeast-1.amazonaws.com/products/S__2547956.jpg',
    'https://annbeautiful-storage.s3.ap-southeast-1.amazonaws.com/products/S__2547960.jpg',
    'https://annbeautiful-storage.s3.ap-southeast-1.amazonaws.com/products/S__2547963.jpg',
    'https://annbeautiful-storage.s3.ap-southeast-1.amazonaws.com/products/S__2547965.jpg'
  ]
  var item = _.sample(products);
  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Image src={item} alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            {/* <Alert severity="info" sx={{ mb: 3 }}>

            </Alert> */}
            <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                เข้าสู่ระบบ
              </Typography>
            </Stack>
            <LoginForm />

            {/* {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                  Get started
                </Link>
              </Typography>
            )} */}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
