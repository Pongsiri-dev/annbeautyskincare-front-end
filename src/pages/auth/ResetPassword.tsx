import * as React from 'react';
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";
// layouts
import LogoOnlyLayout from "../../layouts/LogoOnlyLayout";
// routes
import { PATH_AUTH } from "../../routes/paths";
// components
import Page from "../../components/Page";
// sections
import { ResetPasswordForm } from "../../sections/auth/reset-password";
// assets
import { SentIcon } from "../../assets";
import {TransitionProps} from '@mui/material/transitions'
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  
  return (
    <Page title="ขอสิทธิ์เข้าใช้งาน" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />
        <Container>
          <Box sx={{ maxWidth: 480, mx: "auto" }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  เปลื่ยนรหัสผ่านเพื่อเข้าใช้งานระบบ
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 5 }}>
                  โปรดระบุ <b>อีเมล​, รหัสผ่านเดิม, รหัสผ่านใหม่ </b>
                  เพื่อขอสิทธิ์ในการเข้าใช้งานระบบ
                </Typography>

                <ResetPasswordForm
                  onSent={() => setSent(true)}
                  onGetEmail={(value) => setEmail(value)}
                  chk={sent}
                />

                <Button
                  fullWidth
                  size="large"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                  sx={{ mt: 1 }}
                >
                  Back
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <SentIcon sx={{ mb: 5, mx: "auto", height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  ขอสิทธิ์เข้าใช้งานระบบ
                </Typography>
                <Typography>
                  เราระบบได้ทำการขอสิทธิ์เข้าใช้งานให้กับ &nbsp;
                  <strong>{email}</strong>&nbsp; เรียบร้อยแล้ว
                  <br />
                  กรุณา LOGIN เข้าใช้งานระบบใหม่
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                  sx={{ mt: 5 }}
                >
                  Back
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
