import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import AdminDashboardChart from "../../components/Admin/AdminDashboardChart";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const AdminDashBoard = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <AdminNavbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
      
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* <UserWidget userId={_id} picturePath={picturePath} /> */}
          <AdminSidebar />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AdminDashboardChart />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
           
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashBoard;
