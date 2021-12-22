import { Link as RouterLink } from "react-router-dom";
// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Grid, Button, Container, Typography } from "@mui/material";
// routes
import { PATH_PAGE } from "../../routes/paths";
// components
import Image from "../../components/Image";
import { MotionInView, varFade } from "../../components/animate";
import axios from "axios";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------
const Product = [
  {
    id: 1,
    src: "https://live.staticflickr.com/65535/51759521225_2225cfc968_z.jpg",
  },
  {
    id: 2,
    src: "https://live.staticflickr.com/65535/51757821752_1ea1acc8f6_z.jpg",
  },
  {
    id: 3,
    src: "https://live.staticflickr.com/65535/51758657166_9213750dc7_z.jpg",
  },
];
const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(24, 0),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
    marginBottom: 0,
  },
}));

const ScreenStyle = styled(MotionInView)(({ theme }) => ({
  paddingRight: 2,
  paddingBottom: 1,
  maxWidth: 160,
  borderRadius: 8,
  backgroundColor:
    theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  [theme.breakpoints.up("sm")]: {
    maxWidth: 320,
    paddingRight: 4,
    borderRadius: 12,
  },
  "& img": {
    borderRadius: 8,
    [theme.breakpoints.up("sm")]: {
      borderRadius: 12,
    },
  },
}));

const COMMON = {
  scaleX: 0.86,
  skewY: 8,
  skewX: 0,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  opacity: 0,
};

const variantScreenLeft = {
  initial: COMMON,
  animate: { ...COMMON, translateX: "-50%", translateY: 40, opacity: 1 },
};
const variantScreenCenter = {
  initial: COMMON,
  animate: { ...COMMON, opacity: 1 },
};
const variantScreenRight = {
  initial: COMMON,
  animate: { ...COMMON, translateX: "50%", translateY: -40, opacity: 1 },
};

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const isRTL = theme.direction === "rtl";

  const screenLeftAnimate = variantScreenLeft;
  const screenCenterAnimate = variantScreenCenter;
  const screenRightAnimate = variantScreenRight;
  const [province, setProfile] = useState();
  useEffect(() => {
    axios.get("api/filestest").then((res) => setProfile(res.data));
  }, []);

  return (
    <RootStyle>
      <Container>
        <Grid container spacing={5} justifyContent="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ContentStyle>
              <MotionInView variants={varFade().inUp}>
                <Typography
                  component="div"
                  variant="overline"
                  sx={{ mb: 2, color: "text.disabled" }}
                >
                  Interface Starter Kit
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  Huge pack <br />
                  of elements
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? "text.secondary" : "common.white",
                  }}
                >
                  We collected most popular elements. Menu, sliders, buttons,
                  inputs etc. are all here. Just dive in!
                </Typography>
              </MotionInView>

              <MotionInView variants={varFade().inUp}>
                <Button
                  size="large"
                  color="inherit"
                  variant="outlined"
                  component={RouterLink}
                  to={PATH_PAGE.components}
                >
                  View All Components
                </Button>
              </MotionInView>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={8} dir="ltr">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                justifyContent: "center",
              }}
            >
              {Product.map((_, id,src) => (
                <ScreenStyle
                  key={id}
                  threshold={0.72}
                  variants={{
                    ...(id === 0 && screenLeftAnimate),
                    ...(id === 1 && screenCenterAnimate),
                    ...(id === 2 && screenRightAnimate),
                  }}
                  transition={{ duration: 0.72, ease: "easeOut" }}
                  sx={{
                    boxShadow: `${isRTL ? -80 : 80}px -40px 80px ${alpha(
                      isLight
                        ? theme.palette.grey[600]
                        : theme.palette.common.black,
                      0.48
                    )}`,
                    ...(id === 0 && {
                      zIndex: 3,
                      position: "absolute",
                    }),
                    ...(id === 1 && { zIndex: 2 }),
                    ...(id === 2 && {
                      zIndex: 1,
                      position: "absolute",
                      boxShadow: "none",
                    }),
                  }}
                >
                  {/* <Image
                    alt={`screen ${index + 1}`}
                    src={`https://minimal-assets-api.vercel.app/assets/images/home/screen_${
                      isLight ? "light" : "dark"
                    }_1.png`}
                  /> */}

                  <Image
                    alt={`screen ${id + 1}`}
                    src={province}
                  />
                </ScreenStyle>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
