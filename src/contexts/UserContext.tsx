import { createContext, ReactNode, useEffect, useState } from "react";
import { UserManager } from "src/@types/user";
import axios from "src/utils/axios";
// ----------------------------------------------------------------------

const UserContext = createContext<any>({});

function UserProvider({ children }: { children: ReactNode }) {
  const [userList, setUserList] = useState<any>([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/api/user/userlist");
    data.forEach((o: UserManager) => {
      o.name = `${o.firstName} ${o.lastName}`;
    });
    setUserList(data);
    window.localStorage.setItem('userObj',JSON.stringify(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ userList, setUserList }}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
