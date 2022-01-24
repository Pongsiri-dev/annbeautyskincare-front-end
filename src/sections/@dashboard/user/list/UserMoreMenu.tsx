import { paramCase } from "change-case";
import { useContext, useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Menu, MenuItem, IconButton } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../../routes/paths";
// components
import Iconify from "../../../../components/Iconify";

// ----------------------------------------------------------------------
import { UserContext } from "src/contexts/UserContext";
import _ from "lodash";
  
type Props = {
  // onDelete: VoidFunction;
  userName: string;
};

export default function UserMoreMenu({ userName }: Props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { userList } = useContext(UserContext);
  const [data, setData] = useState();
  
  const storage = () =>{
    window.localStorage.setItem('userSelected',JSON.stringify(data))
  }

  useEffect(() => {
    const dt = _.find(userList,{'username':userName})
    setData(dt);
  }, [userName]);
  
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { px: 1, width: 200, color: "text.secondary" },
        }}
      >
        {/* <MenuItem onClick={onDelete} sx={{ borderRadius: 1, typography: 'body2' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2, width: 24, height: 24 }} />
          Delete
        </MenuItem> */}

        <MenuItem
          onClick={storage}
          component={RouterLink}
          to={`${PATH_DASHBOARD.user.editById}/?id=${userName}`}
          sx={{ borderRadius: 1, typography: "body2" }}
        >
          <Iconify
            icon={"eva:edit-fill"}
            sx={{ mr: 2, width: 24, height: 24 }}
          />
          แก้ไขข้อมูล
        </MenuItem>
      </Menu>
    </>
  );
}
