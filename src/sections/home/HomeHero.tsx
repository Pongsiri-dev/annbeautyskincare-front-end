import { m } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Button,
  Box,
  Link,
  Container,
  Typography,
  Stack,
  StackProps,
} from "@mui/material";
import FacebookSharpIcon from "@mui/material/Icon";
// routes
import { PATH_PAGE } from "../../routes/paths";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import TextIconLabel from "../../components/TextIconLabel";
import { MotionContainer, varFade } from "../../components/animate";

// Icon
// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props: StackProps) => (
  <Stack spacing={5} {...props} />
))(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: "auto",
  textAlign: "center",
  position: "relative",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    margin: "unset",
    textAlign: "left",
  },
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: "100%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("lg")]: {
    right: "8%",
    width: "auto",
    height: "48vh",
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <HeroOverlayStyle
          alt="overlay"
          src="https://minimals.cc/assets/overlay.svg"
          variants={varFade().in}
        />

        <HeroImgStyle
          alt="hero"
          src="https://minimals.cc/assets/images/home/hero.png"
          variants={varFade().inUp}
        />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ color: "common.white" }}>
                ระบบตัวแทนขาย
                <br />
                <Typography
                  component="span"
                  variant="h1"
                  sx={{ color: "primary.main" }}
                >
                  Ann Beautiful Skincare
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: "common.white" }}>
                ระบบตัวแทนขายผลิตภัณฑ์ภายใต้แบรนด์ของ Ann Beautiful Skincare
              </Typography>
            </m.div>
            <m.div variants={varFade().inRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.lineOfficial}
              >
                @ LINE OFFICIAL
              </Button>
            </m.div>

            <Stack spacing={2.5}>
              <m.div variants={varFade().inRight}>
                <Typography variant="overline" sx={{ color: "primary.light" }}>
                  Available For
                </Typography>
              </m.div>

              <Stack
                direction="row"
                spacing={1.5}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <a href="https://www.facebook.com/ann.sirinapa.92">
                  <m.img
                    variants={varFade().inRight}
                    src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
                  />
                </a>
                <m.img
                  variants={varFade().inRight}
                  src="https://img.icons8.com/fluency/48/000000/instagram-new.png"
                />
                <m.img
                  variants={varFade().inRight}
                  src="https://img.icons8.com/fluency/48/000000/youtube-play.png"
                />
              </Stack>
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: "100vh" } }} />
    </MotionContainer>
  );
}
