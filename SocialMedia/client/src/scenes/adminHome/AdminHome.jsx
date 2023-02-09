import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminUsersList from "../../components/Admin/AdminUsersList";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const AdminHome = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <AdminNavbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : "10%"}>
          {/* <UserWidget userId={_id} picturePath={picturePath} /> */}
          <AdminSidebar />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AdminUsersList />
          {/* <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={_id} /> */}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
           
            <Box m="2rem 0" />
           
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminHome;
