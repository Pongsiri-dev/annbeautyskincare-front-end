import { useContext, useEffect, useState } from "react";
import axios from "src/utils/axios";
import lodash from "lodash";
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
import { UserContext } from "src/contexts/UserContext";

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
  const { userList } = useContext(UserContext);
  const [userFriend, setUserFriend] = useState([]);
  const [userAbout, setUserAbout] = useState<UserAbout>({});
  const [currentTab, setCurrentTab] = useState("profile");
  const [findFriends, setFindFriends] = useState("");

  useEffect(() => {
    fetchAbout();
  }, [user]);

  useEffect(() => {
    if (user?.role[0].name === "ROLE_USER") {
      const data: any = lodash.filter(userList, (v) => {
        return lodash.startsWith(v.team, user.team);
      });
      //compose data
      setUserFriend(data);
    } else {
      const data = lodash.cloneDeep(userList);
      data.forEach((o: UserManager, index: number) => {
        o.name = `${o.firstName} ${o.lastName}`;
        o.avatarUrl = `https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_${
          index + 1
        }.jpg`;
      });
      //compose data
      setUserFriend(data);
    }
  }, [userList]);

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
    <Page title="โปร์ไฟล์">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="โปร์ไฟล์"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: `${user?.firstName} ${user?.lastName}` || "" },
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
