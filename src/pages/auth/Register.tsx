import { capitalCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography, Tooltip } from "@mui/material";
// hooks
import useAuth from "../../hooks/useAuth";
import useResponsive from "../../hooks/useResponsive";
// routes
import { PATH_AUTH } from "../../routes/paths";
// components
import Page from "../../components/Page";
import Logo from "../../components/Logo";
import Image from "../../components/Image";
// sections
import { RegisterForm } from "../../sections/auth/register";
import UserNewForm from "../../sections/auth/register/RegisterForm";

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
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            ลดความระเอียดภาพ {""}
            <a
              href="https://imagecompressor.io/compress-to-exact-size"
              target={"_bank"}
            >
              ลิ้งค์
            </a>
          </Typography>
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              เข้าสู่ระบบด้วยบัญชีที่มีอยู่แล้ว {""}
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.login}
              >
                เข้าสู่ระบบ
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {/* {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Manage the job more effectively with Minimal
            </Typography>
            <Image
              alt="register"
              src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_register.png"
            />
          </SectionStyle>
        )} */}

        <Container>
          <ContentStyle>
            {/* เรียกใช้ Form */}
            <UserNewForm isEdit={false} />
            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                เข้าสู่ระบบด้วยบัญชีที่มีอยู่แล้ว{" "}
                <Link
                  variant="subtitle2"
                  to={PATH_AUTH.login}
                  component={RouterLink}
                >
                  เข้าสู่ระบบ
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
