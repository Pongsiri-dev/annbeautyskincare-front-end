import * as React from "react";
import * as Yup from "yup";
import { filter } from "lodash";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  Table,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Slide,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Alert,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// @types
import { UserManager } from "../../@types/user";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../sections/@dashboard/user/list";
import { UserContext } from "src/contexts/UserContext";
import useAuth from "src/hooks/useAuth";
import { Form, FormikProvider, useFormik } from "formik";
import axiosInstance from "src/utils/axios";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../components/Iconify";
// ----------------------------------------------------------------------

import { TransitionProps } from "@mui/material/transitions";

const TABLE_HEAD = [
  { id: "url", label: "", alignRight: false },
  { id: "name", label: "ชื่อ", alignRight: false },
  { id: "email", label: "อีเมลล์", alignRight: false },
  { id: "telephone", label: "เบอร์โทรศัพท์", alignRight: false },
  { id: "level", label: "ระดับ", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "team", label: "ลำดับลูกทีม", alignRight: false },
  { id: "" },
];

type InitialValues = {
  id: any;
  team: string;
  afterSubmit: string;
};
// ----------------------------------------------------------------------

export default function UserList() {
  const theme = useTheme();
  const isMountedRef = useIsMountedRef();
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  let { userList } = useContext(UserContext);
  const [userData, setUserData] = useState<any>({});
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  let [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleOpen = () => {
    setOpenAlert(true);
  };
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const Schema = Yup.object().shape({
    team: Yup.string().required("จำเป็นต้องกรอกอีเมล์ที่ใช้สมัคร"),
  });
  const formik = useFormik<InitialValues>({
    initialValues: {
      team: "",
      id: "",
      afterSubmit: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setOpen(false);
      try {
        values.id = userData;
        await axiosInstance
          .post("/api/user/updateTeam", {
            team: user?.team + "-" + values.team,
            id: values.id,
          })
          .then((res: any) => {
            if (res?.statusCode === "ok" || res?.statusCodeValue === 200) {
              userList = res?.body;
            }
            // fetchUsers();
            handleClose(true);
          })
          .finally(() => {
            handleClose(true);
            setOpenAlert(false);
            window.location.reload();
          });
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  // const fetchUsers = async () => {
  //   const { data } = await axiosInstance.get("/api/user/userlist");
  //   setFilteredUsers(data);
  // };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = userList.map((n: UserManager) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;
  const isNotFound = !filteredUsers.length && Boolean(filterName);

  const handleClickOpen = (data: any) => {
    setUserData(data);
    setOpen(true);
  };
  const handleClose = (val: boolean) => {
    setOpen(false);
  };

  useEffect(() => {
    if (user?.role[0].name === "ROLE_USER") {
      const data: any = _.filter(userList, (v) => {
        if (v.id !== user.id) {
          return _.startsWith(v.team, user.team);
        }
      });
      setFilteredUsers(data);
      applySortFilter(data, getComparator(order, orderBy), filterName);
    } else {
      let obk = applySortFilter(
        userList,
        getComparator(order, orderBy),
        filterName
      );
      setFilteredUsers(obk);
    }
  }, [userList]);

  // useEffect(() => {
  //   let obk = applySortFilter(
  //     userList,
  //     getComparator(order, orderBy),
  //     filterName
  //   );
  //   setFilteredUsers(obk);
  // }, [filterName, order, orderBy]);

  return (
    <Page title="รายชื่อลูกทีม">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="รายชื่อลูกทีม"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "List" },
          ]}
        />

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            // onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      const {
                        id,
                        url,
                        name,
                        email,
                        telephone,
                        level,
                        status,
                        username,
                        team,
                        teamStatus,
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            {/* <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} /> */}
                            <Avatar alt={name} src={url} sx={{ mr: 2 }} />
                          </TableCell>
                          <TableCell
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{telephone}</TableCell>
                          <TableCell align="left">{level}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant={
                                theme.palette.mode === "light"
                                  ? "ghost"
                                  : "filled"
                              }
                              color={(!status && "error") || "success"}
                            >
                              {status ? "ใช้งาน" : "ไม่ใช้งาน"}
                            </Label>
                          </TableCell>
                          <TableCell>
                            {teamStatus == 0 || teamStatus == "0"
                              ? team
                              : team + "-" + teamStatus}
                          </TableCell>
                          {/* {team != "" && team != "0" && team != user?.team ? (
                            <TableCell>{team + "-" + team_status}</TableCell>
                          ) 
                          : (
                            <TableCell>
                              <Button
                                size="small"
                                variant="contained"
                                color="info"
                                onClick={() => {
                                  handleClickOpen(row.id);
                                }}
                              >
                                ผูกรหัสลูกทีม
                              </Button>
                            </TableCell>
                          )} */}
                          {user?.role[0].id === 2 && (
                            <TableCell align="right">
                              <UserMoreMenu
                                // onDelete={() => handleDeleteUser(id)}
                                userName={username}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        {/* Dialog */}
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit}</Alert>
                  )}

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 3, sm: 2 }}
                    mt={2}
                  >
                    <TextField
                      fullWidth
                      label="รหัสแม่ทีม"
                      value={user?.team}
                      disabled
                    />
                    <TextField
                      {...getFieldProps("team")}
                      fullWidth
                      label="รหัสผูกลูกทีม"
                      error={Boolean(touched.team && errors.team)}
                      helperText={touched.team && errors.team}
                    />
                  </Stack>
                  <Stack
                    direction={{ xs: "row" }}
                    justifyContent="center"
                    spacing={{ xs: 3, sm: 2 }}
                    mt={2}
                  >
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => handleClose(false)}
                    >
                      ปิด
                    </Button>
                    <Button
                      disabled={!(formik.isValid && formik.dirty)}
                      onClick={handleOpen}
                      size="medium"
                      type="submit"
                      variant="contained"
                    >
                      ผูกรหัสลูกทีม
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            </FormikProvider>
          </DialogContent>
        </Dialog>
        {/* End Dialog Form*/}
        {/* ================================================ */}
        {/* Dialog Alert */}
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <Iconify icon="eva:shield-fill" /> {"แจ้งเตือน"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              &emsp;ระบบกำลังส่งข้อมูลเพื่อไปตรวจสอบความถูกต้อง <br />
              &emsp;กรุณารอสักครู่...
              <br />
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClose(true)}>ปิด</Button>
          </DialogActions> */}
        </Dialog>
        {/* End Dialog Alert */}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: UserManager[],
  comparator: (a: any, b: any) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
