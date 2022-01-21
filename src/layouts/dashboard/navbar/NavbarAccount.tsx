import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
// hooks
import useAuth from "../../../hooks/useAuth";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));
// ----------------------------------------------------------------------

type Props = {
  isCollapse?: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const { user } = useAuth();
  
  return (
    <Link
      underline="none"
      color="inherit"
      component={RouterLink}
      to={PATH_DASHBOARD.user.account}
    >
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: "transparent",
          }),
        }}
      >
        {/* <Image 
        style={{width: '150px',height:'95px',borderRadius: '50%',objectFit:'cover',objectPosition:'center right' }}
        alt="profile cover"
        src={user?.url}
        sx={{ position: "relative", top: 0, left: 0, right: 0, bottom: 0 }}/> */}
        {/* <MyAvatar image={user?.url} firstName={user?.firstName} /> */}

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            คุณ {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
            {user?.level}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
