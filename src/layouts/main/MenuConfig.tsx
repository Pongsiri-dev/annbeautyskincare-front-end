// routes
import {
  PATH_AUTH,
  PATH_DOCS,
  PATH_PAGE,
  PATH_DASHBOARD,
  PATH_MAIN_PAGES,
  PATH_ABOUT
} from "../../routes/paths";
// components
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "หน้าแรก",
    icon: <Iconify icon={"eva:home-fill"} {...ICON_SIZE} />,
    path: "/",
  },
  {
    title: "เกี่ยวกับ",
    icon: <Iconify icon={"eva:book-open-fill"} {...ICON_SIZE} />,
    path: PATH_DOCS,
  },
  {
    title: "เงื่อนไข",
    icon: <Iconify icon={"eva:alert-circle-fill"} {...ICON_SIZE} />,
    path: '/policy?p=1',
  },
  {
    title: "เข้าสู่ระบบ",
    path: PATH_MAIN_PAGES,
    icon: <Iconify icon={"eva:log-in-fill"} {...ICON_SIZE} />,
    children: [
      {
        subheader: "เข้าสู่ระบบ",
        items: [{ title: "เข้าสู่ระบบ", path: PATH_AUTH.login }],
      },
      {
        subheader: "สมัครสมาชิก",
        items: [
          { title: "สมัครสมาชิกตัวแทนขาย", path: PATH_PAGE.policy },
          // { title: 'Register', path: PATH_AUTH.registerUnprotected }
        ],
      },
      {
        subheader: "ช่วยเหลือ",
        items: [
          { title: "เปลี่ยนรหัสผ่าน", path: PATH_AUTH.resetPassword },
          { title: "Verify code", path: PATH_AUTH.verify },
        ],
      },
    ],
  },
  // {
  //   title: 'Components',
  //   icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
  //   path: PATH_PAGE.components,
  // },
  // {
  //   title: 'Pages',
  //   path: '/pages',
  //   icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  //   children: [
  //     {
  //       subheader: 'Other',
  //       items: [
  //         { title: 'About us', path: PATH_PAGE.about },
  //         { title: 'Contact us', path: PATH_PAGE.contact },
  //         { title: 'FAQs', path: PATH_PAGE.faqs },
  //         { title: 'Pricing', path: PATH_PAGE.pricing },
  //         { title: 'Payment', path: PATH_PAGE.payment },
  //         { title: 'Maintenance', path: PATH_PAGE.maintenance },
  //         { title: 'Coming Soon', path: PATH_PAGE.comingSoon },
  //       ],
  //     },
  //     {
  //       subheader: 'Authentication',
  //       items: [
  //         { title: 'Login', path: PATH_AUTH.loginUnprotected },
  //         { title: 'Register', path: PATH_AUTH.registerUnprotected },
  //         { title: 'Reset password', path: PATH_AUTH.resetPassword },
  //         { title: 'Verify code', path: PATH_AUTH.verify },
  //       ],
  //     },
  //     {
  //       subheader: 'Error',
  //       items: [
  //         { title: 'Page 404', path: PATH_PAGE.page404 },
  //         { title: 'Page 500', path: PATH_PAGE.page500 },
  //       ],
  //     },
  //     {
  //       subheader: 'Dashboard',
  //       items: [{ title: 'Dashboard', path: PATH_DASHBOARD.root }],
  //     },
  //   ],
  // },
  // {
  //   title: 'Documentation',
  //   icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
  //   path: PATH_DOCS,
  // },
];

export default menuConfig;
