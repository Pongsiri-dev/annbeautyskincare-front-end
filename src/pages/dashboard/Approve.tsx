import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "src/utils/axios";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  Table,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// @types
import { UserManager } from "../../@types/user";
// components
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "ชื่อ", alignRight: false },
  { id: "email", label: "อีเมลล์", alignRight: false },
  { id: "telephone", label: "เบอร์โทรศัพท์", alignRight: false },
  { id: "level", label: "ระดับ", alignRight: false },
  { id: "", label: "", alignRight: false },
  //   { id: "" },
];

// ----------------------------------------------------------------------

export default function Approve() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>({});

  const [userList, setUserList] = useState<any>([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/api/auth/review");
    data.forEach((o: UserManager) => {
      o.name = `${o.firstName} ${o.lastName}`;
    });
    setUserList(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  // const handleDeleteUser = (userId: string) => {
  //   const deleteUser = userList.filter((user) => user.id !== userId);
  //   setSelected([]);
  //   setUserList(deleteUser);
  // };

  // const handleDeleteMultiUser = (selected: string[]) => {
  //   const deleteUsers = userList.filter(
  //     (user) => !selected.includes(user.name)
  //   );
  //   setSelected([]);
  //   setUserList(deleteUsers);
  // };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
    getComparator(order, orderBy),
    filterName
  );

  const handleClickOpen = (data: any) => {
    setUser(data);
    setOpen(true);
  };

  const handleClose = (isApprove: any) => {
    setOpen(false);
    if (!isApprove) {
      return;
    }
    const formData: any = new FormData();
    formData.append("id", user.id);
    const config = { headers: { "Content-Type": "application/json" } };
    axios.put("/api/auth/approve", formData, config);
    setUserList(userList.filter((o: any) => o.id !== user.id));
  };

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
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
                rowCount={userList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      name,
                      email,
                      telephone,
                      level,
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
                        {/* <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                          </TableCell> */}
                        <TableCell
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{telephone}</TableCell>
                        <TableCell align="left">{level}</TableCell>
                        <TableCell align="left">
                          {/* <Label
                            variant={
                              theme.palette.mode === "light"
                                ? "ghost"
                                : "filled"
                            }
                            color={(!status && "error") || "success"}
                          >
                            {status ? "ใช้งาน" : "ไม่ใช้งาน"}
                          </Label> */}
                          <Button
                            size="small"
                            variant="contained"
                            color="info"
                            onClick={() => {
                              handleClickOpen(row);
                            }}
                          >
                            Review
                          </Button>
                        </TableCell>

                        {/* <TableCell align="right">
                          <UserMoreMenu
                            // onDelete={() => handleDeleteUser(id)}
                            userName={username}
                          />
                        </TableCell> */}
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
            alignItems="center"
            mt={2}
          >
            <Stack justifyContent="center" width="100%">
              <img
                src={user.url}
                height="200px"
                style={{ objectFit: "contain" }}
              />
              <Typography
                component="span"
                variant="body1"
                sx={{ color: theme.palette.grey[800] }}
                style={{ textAlign: "center", display: "block" }}
              >
                รูปประจำตัว
              </Typography>
            </Stack>
            <Stack justifyContent="center" width="100%">
              <img
                src={user.urlCard}
                height="200px"
                style={{ objectFit: "contain" }}
              />
              <Typography
                component="span"
                variant="body1"
                sx={{ color: theme.palette.grey[800] }}
                style={{ textAlign: "center", display: "block" }}
              >
                รูปบัตรประชาชน
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
            mt={2}
          >
            <TextField
              fullWidth
              label="ชื่อจริง"
              value={user.firstName}
              disabled
            />
            <TextField
              fullWidth
              label="นามสกุล"
              value={user.lastName}
              disabled
            />

            {/* <Image src={user.img} /> */}
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
            mt={2}
          >
            <TextField
              fullWidth
              label="วันเกิด"
              value={user.birthDay}
              disabled
            />
            <TextField
              fullWidth
              label="เลขบัตรประชาชน"
              value={user.cardid}
              disabled
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
            mt={2}
          >
            <TextField fullWidth label="Email" value={user.email} disabled />
            <TextField
              fullWidth
              label="เบอร์โทรศัพท์"
              value={user.telephone}
              disabled
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
            mt={2}
          >
            <TextField
              fullWidth
              label="Address"
              value={`${user.address} ${user.province} ${user.amphur} ${user.tombon} ${user.postCode}`}
              disabled
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
            mt={2}
          >
            <TextField
              fullWidth
              label="รหัสแม่ทีม"
              value={user.team}
              disabled
            />
            <TextField
              fullWidth
              label="จำนวนสินค้า (ชิ้น)"
              value={user.bill}
              disabled
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
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleClose(true)}
            >
              Approve
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
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
