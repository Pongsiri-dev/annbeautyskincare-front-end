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

  const handleClose = () => {
    setOpen(false);
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
                      status,
                      username,
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
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 2 }}
            alignItems="center"
            mt={2}
          >
            <Stack justifyContent="center" width="100%">
              <img
                src="https://mpics.mgronline.com/pics/Images/564000011414801.JPEG"
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
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGCBUVExcVFRUXFxcZGhkcGhoXFxofHBwZIBocGhocHB8aHysjGiAoIBcaJDUkKCwuMjIyGSM3PDcxOysxMi4BCwsLDw4PHRERHTEpIygxOTQ0NDMxMTExMzEuMTExMTExMzExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAKEBOAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xAA+EAACAQIEAwUFBgYBBAMBAAABAhEAAwQSITEFQVEGImFxgRMykaGxB0JSwdHwFCMzYnLhFYKisvFDU8LS/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QALBEAAgIBBAEDAwIHAAAAAAAAAAECEQMEEiExQSIyURNhcbHxBTNCgZGh8P/aAAwDAQACEQMRAD8A8qVABrUNwSegH1qe5y86ZfGk+NWEIIroFIGn2644lspmqyEOQfvwpYBNCTzqxw0SD5/pRAV8lXrKmPHlT2sksAo73pp0mfGpkNu1cZLim6w+7bcRPPMwB05aR4GjdC02FcFgbV+LdpFtZcua9duAEeMAnNMExtpy0pYzgmFtXUD3Lt4QA3slChmkyFJkgbHnIJ1rnD+NMt1Lj21GQEIiEBQNSs/jgk7nmau8N43bVhbYDK4Ad3X3IOmsGNzqBAn4ZsksifC4N2HHhcfU+QWON27cDD4e2hAK5yCzxpIzXBMzOsdKGYrFvdZmfd2zHxY6T084iYFem9oOxlnFTcsn2V3c6DI3QlRpJ/Eu8zBrz3jHBLuGYLdTLPusDKt/i35GD4U2OcJfkhljJfgGItX+H3ArZo1/etQKlILVzOajC4wGiVjFeNY/D3Iolh8VRAau1iql/i/GsthMfKjXWNdagxOL5K9yfB9B6nX4TQbSKQxSlLb5Na2LoLhuIH+JcsdCMg8Mp7vx19TWb/5FlOjqW2j2up8DIphxhNwrcDIz+6TlImAuhGk7aH86RzRshplFtSfar8M2nEuKC3bNxthE+AJifLWhh7WWZCljJ6At/wCNZ/DcWzFsPeBUmUOsqZ05+7PKhvEMLcwxlDKNzIGh6GKVzfgRaWot9r/u0bccTRj70DqVbX0An4gVQx+KJByanlMgD4b1lcJxggxcAjqOXpRc3EuLlYyjbweXgaO9nRww8FS09xZzXQf7VIGn1PwpuJuADM4gH70xJ5770YvfZxddBcwlxXPO28KwI2Ab3W665a0XYnsfctLdxmLWLyAiylyGyBRJcQYnkvSJjURP6katAljlu2sAWuzd23aXEXRaRD3gmJZkkfiYICcoJXuyCZ2pcJvvjXOYqiDuqRuVGgyCFVF6DKI8I1pfaVxN7l4W3hUH80gAaswglfQfGZ2oLwjHFFJBgzGnLYD8q5SlJWw7VGVI23DOxdzFXXGZUw6HJmYSXb72WTyJjMeYMUu1HYi9gkW57X2+H0S4CgV0nRX0mVzQJmRI8x6Z2bt5sFZ9mwUm0hzZc+pUFpUEZtZkTNDUNxsLjUxOU2DacpdEKhU22W5oD3AGEgT940ilK7DOl0eM47hz27dq40RcDEbyMrsneBGklSR1E9KoexLEKoLMTACgkk9ABqTRrE8Ru3bFtLjAqve90AlssSxGrEDQTtJ61J2PKrjLWYxJZVPS4yMqH4tHmRWt3ttmSlvpdAHiXDrtrL7W29vNOXMImInyiR8apFa9D+0nDLbthTn7wGU6FM6kSNsykqzc4OUV59SRdqxpJJ0iPLSNPNMNEAw10TSJritEHoZoWEc9wmlXG1MxE0qIxatmm3jrT9qiY1wg0CpcNazHw5mm2kk61eSAAAYMwP8AXpROIrTNcbKDlXp0FE2wptLnLpDEQmaXOmrQNuW/+6itoiABDmY+8xEAEmABrLRO+g86lwtkNMc92O5HQdNq44kNs3IOX2SjSFJzMRuzEkwT4eW0VKMCQpNqFiBrsSZieeuVtR+E0R4Tw25ddsoy2x7zn8UbL1O09PqWxfBGN0MrD2YVQRrrH3Y6evOllOMeC2OG5N/4Me2JyT7UZDy3IbxBA/fhVi3bBEggg8xz+FE+O4S2igPqAsHNqztmJmAAFhSo06eNATw+5b79gl11JTcwNzA3geoFBTTQHjp00emfZv2gVV/hbrgR/RLHcc7cnmNwOhI5Vpe0+Ht3LDrcTOpE5RvI1BXo3Q1512E7X2LGe3etFbhJBaO9I0yENsJ5bzuDvWh4/wAdC2kFvKHuCR7MiF03kdOvhWLLF7/SuzZhjat9Lsw/EsKLd25bUlgjFQTHLrGhjaR0qsUq8bNRm3W+K4PPn2VMlPU1273TqNKVu5zhoH4VLH4KDRckhsWCU3x18j0tDLDgQPxRtymaF4y8CStvEIvgVyj0cCPpS47xG4cqIj21OxYFWby6Cglyw0TuNs3InmAT73pUjflyr2x5ryTcQwl1Ya4GIOzE5lPkwJHzq3w6+btt7L6whdGO6somJ6ESKq4LF3LQkGVO6yCp8xOhrt5gz5rSHvKRlUbEjKYA8/nSkU12v7otYi6t7D5jpdtZQT+NCYE/3A1Yt443LdpT3mIdGnmmkMfFeR8DVDG8Lv2VAuIyZ9YbQmI5eGb51HgkIuKrSsldCCMwmVHkTz2rrDuknz54ZHiUAZgDIBIB8JqTBYs2z1XmP0p+Kt948vOoWsjcuB5an4UFIEoOJo8P2zxOGINooVIEEqxmOTd6JHlRbD9v8XfXLcFsLroispYCNzmPPlWJwlptW1W394sNCPI6MasDEC2ytEAoxC+ZlR/2ifM122PwK5yu2w3xjtHiNFQLbJ0zr70E+7rMCeflWew+HcOgbd2B3BMK0kmD5/CiWDsNctBn1Jzb9CdI+AiiHBOH5sSzGSgLKhI95V3I84+FGlFcBrdy+w0LGLt2F9kbpiXItXGBHQwsEwD1O1GO0HagY3h13DqiteJXuOcrSGBLCCodgdR1O4Os4vjnafEW8SfZObXszlEaydCSwIg9PDXrQrjXHL2Kve1uFQzRPs1CiBpIA56HWSflCRi+2LlluYSU2zaULOYFlM9NMvqJIPiKv8C7P3cVd7k27aEFrse6RBAX8T+HLc+IXhzMAob3ZBbLocpMsARqNJ1Gtepce7R2cJhF9moUwEtoAMoJ2gcwN60PJSUUTeJv1GU+1DiYuMMOmvsyGc/3QQF9AZPmOhrBEURxGaSzGc5JJ8SZk9ZmqN20RrypttKiN27ITTD5xUptmJ3FQPQChBd9No9KedRU2FIgjnrPiP8AVRFSpjX/AFXBscighZOxjXpypVJhFEnkdI/P6ClRoFlj2HxqG8kbjWrNzDPbBYur5YzqCSVnbepbWGFw+8FAEzGpPIAfPUgAAk0DiGxgzAcAxMSdpjr+9x4Vdu3u4FhQo1MDVjzJPPpG30DMTigQqKxKoDryJ55R038/lTLazqfQfrRA2RZnIzkqvRSdx+dWMLjXZkRQoLMqg8hmIUfWmNbzXCSJCr00JgwP34UWHDLUpczMVJEAEATGkEbbeG29BuimPFLJ14C2OcZzaYsLYy5MokZFkFWExrmBk6STMUY7NWGCvduZlzsSFeZAnTQ6ifHoKpY3jiWwAqlnykAbZdoZvUaDzoZie0l51ynKvUrM+munzrPKUpJI0xhtkzvbC6DcKjQDwGvjM0b+zTDzhrpCxN1JMe8qspZZnUROmm9YnEXSxkkk+O9eh/ZoFWyR3SzSxKz7uiiZ21B08DUcvEUjTjXbKf2j4CziL+TIqXV3ujQmVUgN+MDXfXYCsMWvYVu+MybBxrp0PTyPoa2Xby238RnE94owjfuAT84qKyVuJqAQdGBEjyg7j9afTytdk9VHYk4rjz+QdgcZbuCVInp4/vlUz2qG8S7PMh9phzB/AT8lJ/8AE6VzhfGdfZ3RlYaGdNehn3T4HTx5VrRgaUvaXLlmg/EOI/wxISCx2B1y+Pl4fpFaZlBEg/Lb0oDx3hiPb/lhC7uJcsNBqSSxOg5QPQUZ9BwTlF8XYGew73VDsWd1DuxPuoRmgdO76agDxgS1cxN4Kq7xlXkicvIAEec+NGkvoz4tlhsyraQ9AVyAjzKgVrPs34UjXb10AEBlRekKoA+Yb4VmnLarN6xqTXPFjuzfYCzo1xSx/uP5CBW54X2ew9k5rdlEYgAlUAJjXcDrVnh1+0zFEdGdfeVXUsvmAZFE1GlZXKT7KScV7Uedfajwm0EW6f6jMqCTvbCsSI8CZn+6sJ2o4TiTaS+1shAuZWAAgEyOc7LPgIPOvXu31nDexW7ifctljAPeaUaEWOZbKf8Ao10ms5j8WMRw3Eu9p1uNZd87IwWANFtErGURGWQeZEkmqwk0kJKacGmeY/wzlA9wgArKsI36N06+hoa2h8qInEo6gBthAB3HhH6aVFhsA91sqDzJ2HnTbmn6in01OK2c/qV7l5rhVCYWdqJLYzNnNsaAAe0bQAbd1QZ9TVkdljv7YD/pP/8AVR8Yv27aqitnb77CJ8BpoOdPHJFukQnglBNyVf4LCXyYBI3EkAjSehOg9a9O4MMNcsIlvI5TKVDaEGQGYhSCBGkc5A2rEcF4ajYC5i/aWlKExZaGZhIVS0EMhZjAPTWYNd4bi0Di7Zm266my0nNuSEbWZAgAnfahPk7G0l6k/wAlT7QOFqt9go95Fbb72oJ8yV+dZNCS5dRKpGg/Bt9BPrWkxfHVxF925AKF8QBH1+tCbNxbN9p9x4IPTXn4TPyqsfaQyVu4DGFRSoYagiqvHsE97Kc57iwqnYD025a67CrCj2REf0ydR+E+Hh++lEbmEcjQA+oouUV7h1CU1wjMsrAKrbxt4xBH51DcEDXbxojjbcmCNRPmDVLEJp8KuuUYpqpUVLLAbyK49ifnr9KlKb6VGiaGOX0pKOspyQfEVYvYnOADoRz5RUN45iTHwFR5aW6G7LmDMvp0j6V2q+HfK3pH7+VdprBtCj53U2wVAJloBBaNZbU/ICmYvE90KIGkGOf+vqY6ACKzfYSB94QfKdY84rirObrNIcOwg0mrtuqmGUjerVumQGWbVWuHwkgmV1hSCVII908t4IJ8arWqnCA6Hbp1/f5UWrGx5HjlaIXdmLMxBPnofBf0/Wqr3aO2hArUcH4BhRbtO9tnuEC4Qi5ozKNGA0CjSJ1kSNzMMrUOTThnLI3ZgeG4G5eYZUZlnXKD6wYgnwr1vhmEWxagTJAktGaANAY0019SamwK2NbloCfdO4IK6Zcp9yI2gVme0l92vOiu5WASubQabR8D61hySc3R6OKN8FDtLjBcuaGQgIkdSdfoKGYbG+zOuoO/5H01858Kkxl1G0RcuknMfp+xQi881bEtvQcqjJbX0Xxx65JlEjoM31J/KhHGsWbrAsqgjQFRrHQyTNSW10qniX5flVt8jMsEF0iXh3E3td0yV6Tt/iTt/idK7xpw1vOpYqdGZBEE/wD2LPdn4HkarowgzqBuK7hrVxZuW5AAMnlHNddGHhrVIy3dmfNWHz2UeEPDsgPvL3SB99SHX5rHrXov2Q4xCuIsuVzhi4VjoVO5A5gEztzrH8Oa2blt1VbbCQyCArg7lGJ7r9FYwdgRtR3ivA3tsuJwjtcyAOLlpSHtmSMty2dSeqxMHUETU5xtUw450rCfb3jd3OLf8PlVEN0fyybi25yC4wDAWlJ2GrQQSVmK0fYS3jgVz3na0VtupcG4j2nAZWRmi5bYgkQxIBXUHQ1Dw6x/yIR8VhU9oqBPapcGVkBnUTmKyT3Y0/FtW8w9sIioICqoVQBAVQICgcgB5+dSlKKjSG5fZl+3fZx8VhUs23ym2WuAsYGYAhVk7CHMdMooLZ4WcJwnHqQqi4LrlLZJt25thBbVmY5j1MnYc9t7jGgqxYqqZi+0ZcpJnmeW3jWa+1LFKmCuWyYN1ktgcyCwLx5IrGhCT4iLPaotnm3ZvsotxFve0Vra+8CpU8pEnQhZ1PhUHH3bCn2NsRzkjUTPo0gSG6aEAijvBb6YW3clwbSRlHPNAMKNtc3x9azmBLYy5iAdblxGZAPx2++FH/Qjr61qlCMo89nnaTW5Fmco2o9P72ZzEOzHvMWPiSa0nYHsY+Pa5NwWktxJK5izGYUCR01PKRUPB8AC4BGg97TX19eVbW3wj2bgBM0gFXtsFOU7RJBGmsT1qN0j3npd3LZa4Zw+3g77Wb97De1CDJnQlHttIK3GZcqHuroeR3rP9ruMW7WHxFpLOHQ3WVWVGYtbuoxkoSSGXKCO7ABbQ8qLcS7OJdcv7S4twxmzksGiFAltdgBo0Csx9sHEPa4m0vsVtBLSjux3pJ1zAAlQFUCRpBopK+COoW1c83x9jEKSNQYPhVtbhuLlOrrqvUjmPE/pVOrXCbTNetqk5iyxHnJPoKsjBYS4XxYKuS5qBoDE6dCKLYfi+YRbuTHLw8mE1osZhLTHMbVsk7kos/SaH4nA2z/8aaf2j5HlV5ae+6Ehq2uiicUl3RwFuRAYbHbQ/L96VRvWo0O4ogcOimQon1n5+QpuIQN3gZk7cwaSMNj2+GHJL6kdy7X6AprQ8aTYcQY5zVhhBrrAb1WiFg2xYYFjESdPL/0flUGPtjMY5R9PCiN1iNfQeXX6VSdam0OmNt2gVQiQwOo6ydaVWbTzlnlP6fnSrqDZRtGNT8asWBA6zzpKK4tvWRoOdKEnWprdQCprZogZat1as1SR6sI2lEUMcHsC5cyn3FBd4/Cu4HiTA9fCt5xDHLh7KqqqHIAVBAEx8lHM9BWc7KcOuJh7tx1Cm6ECZjHdEkk9JmfSgvGsW9y4+ZpIJBPWDqPBdNv/AEMc08k9q6Rux7cePdI5aLK7urtmY6upZS2p6EaSSY8ajxVwasWaSdNZLMdefr8KVh9B4/P9a7dsfeaBA26T18dNPXeqz2QjVCYPq5J2m68g+7fkAHl4HnUQUnyqziYU6+fpVO5iAQQN+VQiejKVcs7ecAHUA+OlDwrOe4rOeigk/wDbRXhnFRYfMyW7rHSHUmBzC66V6F2a4y+IQFMI9saw0D2ZjQwdDy6etXhBPtnkar+JzxW4QtfN1/o8xPC7wNtGtOhuMAmdCs6yTr0Ak0e7QYcW7GRdhA+e/qa1/EC5uqtxSDJMlrcABTsFYsPeG4rzjth2i9o5t2wMg3Y/eIPLoKbaoo8mWqz63NFuKSXL+P3LdvA8P/hXd8UWv93KiKcyttlyNAuid2lYgbayK4fxEoy+0BJWMrg/zEgyIP3gDsJ05EU/s7dw7Am8DnB0jOdIHSY50UxeMwZUg2M3QorrcHiCdKFmx6iUJ7FFv7+Dedlu2NooBdKqf/tA7jefND1HLoBWk4vibzJafCNaYZiWz95GQowB0YBgCQd4kCvn/C3riZnRWCAwQw0I8fH6TR/svxllY+yutaJ+4CAJ5k5jkYeJE9epj9FXcT0o5rVM9LupibhIxOKRLY7z2rWVAVGpLFSSV2kFoietefdt+0oxmJJE+zQRZHUH3nI5FoGnQDxofxztNi8QWs3CuWe8LagG4B7oZge8NtoFAeJ2DbALMM7GYHIR+/8AdUhBrmQmapxpcD+JYhmCqpJza6fCa2XYXh1uwntWb+YwOTK0FORM8zB2Gg6msJh7uVQYEnQdTRe1j2tppq7DSdlHM+Qp06dnm6jFNw2QdB7hzF8VigXZwpQZmPeMgzJAHiK2OBRbltbNxmQiPZXVaCP7G+Ma7yOdeYcHwl4OtxPaKrMM9zXKQTqST3TE85FbzA3mC5H99ZVtOY0kf2kajwYVKUXdnv6DNCeJYU/UkFbGFxKuUN5SViQySwHJoGsHkwMHbcECl2g7GLjDbd7wUqpE27cBl3G7HWZ18fCi+DxpOQuA5UaEzmXycEMPnRRsUgsC86LDhiO+rSgUsGzOhJkDqR3hBM11DZZV6ZKzAn7M8Pp/NvHwGST5d060a4d2Jt29bJVOU+zuXGjxZZA5aSPKiWG7VWyo9lZkke9cZSI5aKII8oopgsDevw+IuNk5WlOUHzA5ecmisji+DNkxRfapGf4hwAIv9Us06gJb08wbwb5elZjGoVMEczB/EBuRPmPjXsKWFRcqgKBsFED5UC7QcItXgQ668nWAwPWefkZFWhqZX6jLPTxr0nld4VTuCiXEcMbTsh3UkSNj4+EiDHjVBhWp8qzIuCo6kyd6iG4jnP8AurhqDKOlK0MhG3qCeW37FUWSTHi0elXSOlVvZGV12mfWkY6IbG8gabHzpVLZUAHxJMV2loJUVqcGqEGng0oxKr1KrVXWpkrkcWrbUW7O4QXcRbQiVnM3+K66+BMD1oPaBOgrXYa0MJYLKxe7dAVcq7Dfu8zv66aUmWe2NeWPhxuUvsg12l4oLQIJksIRP7ebN0BOnjGnMjF6swmWknlMtpPmddvGr1sC7fH/AMt12M5v6emu2+UKsanaNKO2LhtqFVbhnKpuC3AA92VyzC8xO5E6zpneWOFUlbZd45Zny6SMq3DcVdeLNq4VX3iYQBugzkSfDxpp4TjA4DWboI1lxC8tczd08uZ2r0PhNvcty920uotj+4Ddj8aL4jGWjYKsQBrG+XToV0U+ZFZHqpTnwi6isMavg8NxmIOZs51kgg8oMR6EV25KqDtJ18oOnhyrbjhuDN8XsjMwJaAWys0yGYOdSN4EDXWapdo+HrdYuEVFA2UAacySOdbYtJHmajXxcti6+TJe2OwhR4Ub7L9pruGeMzG23vqPhmXx+o9IA3AAxAMxsRzqbB4W5dOW2jOeiiY8zsPWqWRyRhKFS6NL2p4uRddkbMr2sltht38rFvOAw8wKyXC+B3sS8KAM2snkvWBy2+IopxPhl7DoDdQFHB7oaSrDXcaAmeRO1ansphVs4XNcuBHugMzSoyrHcUToAB82NFcvkyfUjp8N46b6Xk89NwWyUIIZSVK88wMGno15vctwPH/daCxh8Lcv3iLyggiGfZxEMwIPUeuhozgeFW292/bP+LA/nXUys9Xs/pd/cC9lsXiMNcZygdGWHtZiM2ndIkEAg8+hIoNx/iVm/c9pbtfw7cwpOp66CAfICtfxS7h7I711WPRRJnppIrGcVxVl2JW2R46AnxgfnXK+immbySc9vPz0RYTHQSSQrkRnjTluNp03/wDdJ8GGktcbNv7oMnqSWHxqjk17sx0P+qsZXRRmRsp2mQQeqnl5bGjyehzRcvcDuhFuKVe3pqhPd/yBAI8amt2Udgd1XQ9GYEkk+GsR4U/s9fu2yWtXQQd1In4qduY8RVo3Ek5rYtySZtTlnn3G2/6WA8K5IzzjP9jVY26n8BcllWbbASQJbKcoE7mY0rPdmuLxGbvgKAVJiI2I8BzHTyg5ziN1nc5jMaLvAHhNOwOdQXXUKe8BuB18Rv8ACmatB0uF4PUnz2evYDDoVzX2Vl3KDS3G+oHvfuZo3hn9swdx3R/TQjQDeSOpgGOUDnXlnCscJUPmIUjuySBHQdP/AFXpHBMejjusD4TqPMb1KS8HqcSW4XaLg7W1OJwtsNcTvNaGmeNSUEEZueWO9575w/a5kUD+EZnIU/1QAcwBH3SedeiYa9Xk/wBpfAza4hbu20Jt3lYwik5XBh5AGgl1M/3HpQjFN0QySkvPBuuCdpLmJtqxNq0WE5SCxnXu6sAYjwoljcUqrLsoA3J0HzOleaYP2ioFmN+QJ+enWmYsltWJPSTp8NhVo6aXkhk1MFxHljeLYn2t17n4mJH+Oyz4wBVFjTroqJ5rVVKjFdsjcVGwp5mo2NKx0MYVDdNSEVG60jGRwCBSrhFKlHBYang121hXIkjKBuW00+tSlEUTmzE7AcvPkPKSfAUo41DUozRIXTkTsfLrUftQQAAB1MmT+Q9B8akRq4Rj7doyCXOhmBoJGoo2eI3CqrOoXLm5x0Ee7oNeZ6xpQm2anQ12yLds7fJJpM0XZHDktduBQQqZdebMRCjqSFI8Aa1mETIjC4xaT/MbY521PunuqAVA6CJ50I7G37S4ZhmGclmJ1hTkygkcsobXrv0o9Yv21e4LsC3dCspnTVVRkY7A6Ag7EEnlXkapuU3/AN0ehgW2CRPw62VULbZWXXLIg+RI9dYnTUaE0O4n2cLAvcvXM+5VkUjzUqYP120FNw+PXB34Qm7Yffm1s9R1G22/mJMvGeM5iWBlY0/KPjv41CO+DuPkrLD9V1JcAluGm2FY3JU88uwmJME7b+lZnttYxVth7VQLLH+W1szbY+Lfi02IGxiYmj2Nx8ZJJRmIgMdxGYDXflvvr5DbW7lvE2IuBWV17yMJAMkRrvtv1q8c8ocy5I5/4dijTguTwYHUHTQzrt6+Feg9n+P2nthYW0y7oIC+a8vTcfOqPavsratXVNvOlti2hbNEScsnWYgA6zz2JNhMJbNsWzbAVdhqCDG87g67761sjljLmJ5Gv0/oSkn+UV+0nEFuDJvBmfHb86yvErhCiFZmiJgkKBpP6VYdGXZifBtf0NBcdjmeVGg205/vpVaJ6bTqHC6K2GvFGDDl8xzFHsJjbbEgAE8s35Dn66eBoHawrkSB8TUycNub6D4/kKZGyWOMnyXMfhWYlgxY9G+g5R4VRUZW76/H960RtWrgAlp8/wDYmkqlvebSKYrC0U1xzD3Qq+lK5i7jCC5I6aRUWMVQ3d9a4F9fIz8RXFE2ctuynMpg/vfrVq3eZzCswb8Mkz/j18t/OncIsJcuqlxsqnn1PITymj3FsabGIdLKJktkWwGWQcoCkkMDMsCf2aKXkD46BVnCi4622YqWYLmMEBiYEqADG3Pr0olxLspjMIPbBPa2Qof2lvVchE99T3kEbyIHWqV/F3r14OVzXHKgBRBZhGX/AC3Ek9ADyr0XjGFxVvA4e275lHcZEtuH0RtH1OcAI+ugOh13pJzpqiuOG5GPwFlHZH3ET8tPn9K2PDnXLlyiDuIrB2bVywGEELM22ZdGBEldd+voajxGOu3B7OSZ3A0B8NNIquxzZ29QTPTbfaXCWFyviU7vLPnYeELLH11rz/tb2zuYm/mtBhbtgqk7wdWZhqO9A0OwUeNV14GiWzcuMDAk8lH5n96UJx7QBmGUbrb2kcmboPCqxxKPJmnNy4YVwfadiP5luf7lYCfINv8AGrq8asuNHA8H0PzrI27Rdtd+nQePQeFNxSgHIu/M+PSueSSIvFFmu/iUb3XVvJgfpTWNZLCtluKRyYfCRWpL0Yz3CShtEWqJjXS1RM4rmFCZqazU1mphepMdIeTSqIvSoBBlzEuwhnYjoTpO8xtTVNRU4GkKE6NU6tVZKlVq4BctvVi09R8O4fcuDMltmUGCQJj050a/4EWw3tLqqQVAyEGNSCSpE7ZSCDzOmmrWJsbIuD4wWnLEbjLp0mTpz2o/g8U11nRWS4jS0MxBAiSEgGeuU6/A1m8Xat20Oa4pcHXLOUabDm2pHe8oG8azsGiPYfQN/NnXqEtkRGo33051k1MYJb2a9POS9LDXAeD3AobKgIMEXQ0lhoGkEyo5AAbb86k4/g7Vi2bhYB9lAEK90mVOWdhqcoOynenniNy20FSVnu6gA6bSBGYk7HppNYztdcxd9vbB4VTlFsAdw76EjUmNZicvgBWWLjJm1KfuQD7R403pJbOcz69cqksR5npyArcdlsQ2Hwz3Lh/klh7IEy7NswSdxpzMCG1rzq3dzXAWVc2Y5iAwOxBBUd313oxxbi7G2ua5mKLktrI7o5CBty33geFWlCMltaEUny2zQcf7TYa6mRCTcRw8FCG7uhUEjLtOk7+dZ3/lrl1muIjTzZjM+YFDOHYO66EW7bO7ak/dReRZj3VnfUitbw3haLYtW3XLcKMzMxUEFcsqIMkDNv8ArQjCMAr1x2tcP7GTxOKzFiBBM89j8OtC2wiqh5nTU/l0ozxXAOl1lKmN80iCDz+o9KixdlUtktzEAcyYq292gQ0+KEZNIC2r7L7p+IB+tWRxZuaqfKR+tUctNIrRZiovXOJNGiwd9Ty+Aqq2IYg6/Dz+mtRMKS8/L8xXWcPAHoRv05UoKnof3tXUEgjmNR+f6+lJWkQfQ9PDyoDD8yn3hr1A+o5+lWcKMzw7yDs0zrtqSJ261QOlPVTR7OVWa/D4VEJykOdiwMyPAkCB4QKO2+P4m2ltBc0tklZAJiIykndYnynfasJg+LPbgE5lA0E7esUcw2P9rbbJCNt3xInTXTlrv8qi4vybIzg40j0TgXsuI4a5ZuowZDBIZoRmGZWSTCkSGyxA0rzjjXDrmDvGy5V3AVgy+6ysJVvDpHIg+dar7N74w6XLF1iXvsxDDUZikRJ1zEzrGulS/a7irf8AJELmBcAxrlgALPISjaeVWwycZ7fBkzw9O4xL43KAz98jVVOxb8RHQch67nShZwj3SbjkSxnM3ugc2bwGwX8hqkuksWOw1Og9AKZ/yjqfdBOkb+lei0q5MCk2yxfwLqpyAqgktcfQt1IB19aCW9MzdNp5k7fmaK8Z4m7qEJgaZz1I+6OoH1oVeaQIEKJA8TzJ6n/QrJkauisbojb3R5n8q0wuSJ61m7x90DkNfMkk/CY9KO2u6oEzAAn0pcb5YuTwTF6gZ6V16gzU7BFD2eml6YWpjNUmx0h5eu1AWpULGKdIVyu0AkiGp8OuZgsgSQO8YHqeVVgaI8Dj29uSwhge6AdteZ0G+u9cckay3iLWCTKgm43vSQSOozKqsQCdCROtZ3H8RuXGLMZ6GeXTzqV7isHMS7NoTsq7zpuTt6VQxJVdgT11H5bUu5Lg1x08nDf0ih/FtJOhnqNB5Vtvsm4j37ttm1bK6z1Eq0fFfhWNuXwB3RHn/oCp+zl51vrcRoZZbz8PWallW6DQkI7ZpJ2e7e0zABhmAEQQIjoevrO5oHx7h2mZGykj3DqGA1ME+6IAMkwIG1VuHdo0KD2isG6rBUiOkSDMc6r8YxbX8oUmApBk6KMwaNfHkN4HLbzFBp3JnpY4TTSSAGO4Ilzve2W2W1Ilm/7UkfMb1BZ4Fhxu967EFsiqiiTGvvmJgTpM1Pxxhh7YK6uWA73JYLEhTtyAJ686rdmeJvF4ZtbgXMD+EHMInxG9bMblKNroTLGCnUu/9Bj+JbIttE9mg90CIG0k82c9TVXi3abvFTm0P3dZhQpJ8+8fWg/FeNNJW3prvoaBM0meZ1NVhD5JZc64UfAYx3HblwzptGoBMfs069fF3DQffRlj1MA+UEj0oLVrhyEk9ANfiAP34U7hdfYhHI22vkrnC9daiu24IHWirpVIib0dB+X+6qJKKRXa3TGSiZtVFftQCfCuOcAdbaCCKTjXSlFdQSY6kD41xM4CaltW5qVcKykyDA3I/fgavYWwp2Oo+I8xRHjGyvawU9as2MK9syjeYOxq5bOXRtD8j5fpUhcRpTJJjuKXRWs8cZXGZcpUgg5tQRqNY118qj7TcZfEEG4BOkRyAkAL0GtVOKup8+VD6akiMpN8MvBxlUcoDN46bfSo0cLLt7x2H5+FVi+kfH8qJdk+DnF4j2QbL3HaehAhZ8MxWfCatLJSM6iGuyfZtcRZbEuc2VmC2/dU5QDqRrz/AFmaqcbwge6VAKZRkFtiAbZ0aWA3Uy0ZSRoonWBufs5w7WsDlcZWF66rA8iIBHyqLtJgFWzde2ua60kMRLKpUIQvWFnT61DiQ9NHk+HtZjAMaE60UtMcsNuNPPxqnhkKPB6GD1/cVbZqMFSEk7Ez0wtTS1MY0GwpDi9Rs1ImmE0rGOlqVR0qUIwV2uUpoBOiprF0qQw3H7NQCrOAtK1xVckKZkiJ2J0nyo2FF6y4yBjzqpiHHvLvzH6VZ4hai1bjcb+USZ/fOg+fWaRJdm7UZZRrG+kl+hI9zy9B9a1fZHhdsBXuhiG3CmCF5R47Gsk7+Aotwrj15CqgK4GysDr4SpBpMkZNVElgyQjO58/FG0w+AUsO/kWdcxEAeLfs0sVj4GW3ooMT68p2HzoUvHEuGLqm3JJAUyh8JiRHjVmzxOwuqtb0/Flb1Abn6VheJ36kexDPBq4tfhgrjouXXRFDOxzMdydYAJPoaF43Cm0xRm78d4AHTnBnntyrT3e2XsrLW7CD2jTN0/dnbKI3A25c9ayFxjuSSWJJJMk+JJ5kya2441FHlaialNtHbTAQSJEkEeGn61y6oBIGngfyNcnu+v1H+qazdaqkZmxGrnCrkMV5MPmP9E1WtWnPuqx8lJq2qXtJtsYIPu6/uJHrTUwRmovsuslBy+W8SfxEHyo2hBE9aB8SWLren0FEvPwwxlpt6wGUg86g4biZSDuND+VWHuVw6poBZIaG5HWruOwsXDkjKe8pHQ6j15elN4lb+/6H8qnW2rWkyN/MVWJWNxmYkDqYINcQqpcljh+OBhXXvSAT1JMLPxIqLjlhkcMoMKACehnn0kR86h4Zba5dUAaZgWI2gRv++daLiTKqkBQWbQfqTvFVjHciWTLtmooztzGvlEgMp2J0PkfGq38aeh+NXHwLwACOe+g11iOdVcVhSu0HyM/X/dJtaHcrRUdyxk1b4ThmuXURULywkAT3Z1nwinYHh7XDuB1H3vQUb4ZZNo57LsjbEgmdNww568jTwjZ2yTVoHf8AEszX2IjK7qBHMEzpy2itT9iWEm5fuEe6qID/AJEsw/7FoXd4qUDG4gzZ5LJodfe7uxljmJEb1W4JiHt5nw1zJczlhrErAgMpmRIO4502SD8EYtXyetceRUQZRGZyxjmYifkKxHanjhQC3bMP97TYconSTUGI7es1sJiLMMhIzWyMrGJEgnTlzO9ZQ3CwzGJbUxtJ1P1qcF8hySqPpGYhsxk6mZnx51Cxp7moTTyZKIiaaTSNMNSY6ETTZpE1ygMKlXKVA4aa7SpUAiqTD+8vmKVKuDHsMcQ/or5H6VnjSpUq6NWu/mf2X6Cq3wv+oPI0qVHwZYdoucR2X1/KqopUqRl/LO067v6L/wCIpUqZCM4Nj5j86n4Z/VX98qVKnQkumapdqkSu0q0o859gVN2/yb/yNB+Lf1T5D6UqVZ/J7D9iFwvdvSr9KlSjw9pW4j7h9PqKscG+55/rXaVFE5+4KcF3ueY/On4/3x5UqVaYdGHJ/NB+L3qncpUq4oS8L/rL6/Q0Ww+9z/P/APK0qVFG7D7QNxn3rn+KfnUfZf8Aqt/h/wDoUqVHyjBL3sbxb/5f8x9Fptn3F8h9K5SpP6hH0NeoTSpUsjkcNRmlSqbKIaa4aVKlYRUqVKgcf//Z"
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
            <Button size="small" variant="contained">
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
