// @mui
import { styled } from "@mui/material/styles";
import { List, Box, ListSubheader } from "@mui/material";
//
import { NavSectionProps } from "./type";
import { NavListRoot } from "./NavList";
import useAuth from "src/hooks/useAuth";

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavSection({
  navConfig,
  isCollapse = false,
  ...other
}: NavSectionProps) {
  const { user } = useAuth();
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <>
          {group.subheader === "general" && user?.role[0].id != "2" ? (
            <></>
          ) : (
            <List key={group.subheader} disablePadding sx={{ px: 2 }}>
              <ListSubheaderStyle
                sx={{
                  ...(isCollapse && {
                    opacity: 0,
                  }),
                }}
              >
                {group.subheader}
              </ListSubheaderStyle>

              {group.items.map((list) => (
                <NavListRoot
                  key={list.title}
                  list={list}
                  isCollapse={isCollapse}
                />
              ))}
            </List>
          )}
        </>
      ))}
    </Box>
  );
}
