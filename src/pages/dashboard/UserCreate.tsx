import { paramCase, capitalCase } from "change-case";
import { useParams, useLocation } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Page from "../../components/Page";
// sections
import RegisterForm from "../../sections/auth/register/RegisterForm";

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name = "" } = useParams();
  const isEdit = pathname.includes("edit");
  // currentUser.find((user) => paramCase(user.name) === name);
  return (
    <Page title="แก้ไขข้อมูล">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="แก้ไขข้อมูล"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? "New user" : capitalCase(name) },
          ]}
        />
        <RegisterForm isEdit={isEdit} currentUser={JSON.stringify(window.localStorage.getItem('userSelected'))}/>
      </Container>
    </Page>
  );
}

// import { paramCase, capitalCase } from 'change-case';
// import { useParams, useLocation } from 'react-router-dom';
// // @mui
// import { Container } from '@mui/material';
// // routes
// import { PATH_DASHBOARD } from '../../routes/paths';
// // hooks
// import useSettings from '../../hooks/useSettings';
// // _mock_
// import { _userList } from '../../_mock';
// // components
// import Page from '../../components/Page';
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// // sections
// import UserNewForm from '../../sections/@dashboard/user/UserNewForm';
// // ----------------------------------------------------------------------

// export default function UserCreate() {
//   const { themeStretch } = useSettings();
//   const { pathname } = useLocation();
//   const { name = '' } = useParams();
//   const isEdit = pathname.includes('edit');

//   const currentUser = _userList.find((user) => paramCase(user.name) === name);

//   return (
//     <Page title="User: Create a new user">
//       <Container maxWidth={themeStretch ? false : 'lg'}>
//         <HeaderBreadcrumbs
//           heading={!isEdit ? 'Create a new user' : 'Edit user'}
//           links={[
//             { name: 'Dashboard', href: PATH_DASHBOARD.root },
//             { name: 'User', href: PATH_DASHBOARD.user.list },
//             { name: !isEdit ? 'New user' : capitalCase(name) },
//           ]}
//         />

//         <UserNewForm isEdit={isEdit} currentUser={currentUser} />
//       </Container>
//     </Page>
//   );
// }
