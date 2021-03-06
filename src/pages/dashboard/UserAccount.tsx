import { capitalCase } from "change-case";
import { useState } from "react";
// @mui
import { Container, Tab, Box, Tabs } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// _mock_
import {
  _userPayment,
  _userAddressBook,
  _userInvoices,
  _userAbout,
} from "../../_mock";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from "../../sections/@dashboard/user/account";
import { UserAbout } from "src/@types/user";

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState("social_links");

  const ACCOUNT_TABS = [
    {
      value: "social_links",
      icon: <Iconify icon={"eva:share-fill"} width={20} height={20} />,
      component: <AccountSocialLinks />,
    },
    {
      value: "change_password",
      icon: <Iconify icon={"ic:round-vpn-key"} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="ตั้งค่า">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="ตั้งค่า"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "Account Settings" },
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
