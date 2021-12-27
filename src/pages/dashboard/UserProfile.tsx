import { useEffect, useState } from "react";
import axios from "src/utils/axios";
// @mui
import { styled } from "@mui/material/styles";
import { Tab, Box, Card, Tabs, Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// _mock_
import { _userFeeds, _userGallery, _userFollowers } from "../../_mock";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileFollowers,
} from "../../sections/@dashboard/user/profile";
import { UserAbout, UserManager } from "src/@types/user";

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const [userFriend, setUserFriend] = useState([]);
  const [userAbout, setUserAbout] = useState<UserAbout>({});

  const [currentTab, setCurrentTab] = useState("profile");
  const [findFriends, setFindFriends] = useState("");

  useEffect(() => {
    fetchAbout();
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data } = await axios.get("/api/user/userlist");
    data.forEach((o: UserManager, index: number) => {
      o.name = `${o.firstName} ${o.lastName}`;
      o.avatarUrl = `https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_${
        index + 1
      }.jpg`;
    });
    setUserFriend(data);
  }

  async function fetchAbout() {
    const { data } = await axios.get(`/api/user/username/${user?.username}`);
    setUserAbout(data);
  }

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleFindFriends = (value: string) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <Profile myProfile={userAbout} />,
    },
    // {
    //   value: "followers",
    //   icon: <Iconify icon={"eva:heart-fill"} width={20} height={20} />,
    //   component: <ProfileFollowers followers={_userFollowers} />,
    // },
    {
      value: "ลูกทีม",
      icon: <Iconify icon={"eva:people-fill"} width={20} height={20} />,
      component: (
        <ProfileFriends
          friends={userFriend}
          findFriends={findFriends}
          onFindFriends={handleFindFriends}
        />
      ),
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: user?.firstName || "" },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover myProfile={userAbout} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.value}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
