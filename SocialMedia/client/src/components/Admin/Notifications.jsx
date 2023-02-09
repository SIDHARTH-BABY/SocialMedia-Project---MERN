import React, { useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Tabs } from "antd";
import { Box } from "@mui/system";
import AdminNavbar from "./AdminNavbar";
import { Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import {
  markNotification,
  notificationDelete,
  unSeenReports,
} from "../../api/AdminRequest";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const Notifications = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const [unseenNoti, setUnseenNoti] = useState([]);
  const [seenNoti, setSeenNoti] = useState([]);

  const [markSeen ,setMarkSeen] = useState(true);

  const [deleteReport ,setDeleteReport] = useState(true);

  const markAllAsSeen = async () => {
    try {
      const response = await markNotification();

      if (response.data.success) {
        toast.success(response.data.message);
        setMarkSeen(false)
      } else {
        toast.error(response.data.message);

      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      const response = await notificationDelete();

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        setDeleteReport(false)
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const unSeenNotifications = async () => {
    try {
      const response = await unSeenReports();

      if (response.data.success) {
        console.log("set aannu");
        console.log(response.data.reportedUnseenLists);
        setUnseenNoti(response.data.reportedUnseenLists);
        setSeenNoti(response.data.reportedSeenLists);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    unSeenNotifications();
  }, []);

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
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* <UserWidget userId={_id} picturePath={picturePath} /> */}
          <AdminSidebar />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Tabs>
            <Tabs.TabPane tab="unseen" key={0}>
            
              {/* {unseenNoti?unseenNoti.map(()=>(
                  <div className="card p-2 mt-2" >
                  <div className="card-text">{unseenNoti.message}</div>
              </div>
              ))}
               */}
           
              {markSeen?unseenNoti
                ? unseenNoti.map((notification) => (
                    <div className="card p-2 mt-2">
                      <div className="card-text">{notification.message}</div>
                    </div>
                  ))
                : null :null} 

              <Typography
                sx={{ cursor: "pointer", m: "0.5rem 0" , color:"blue" }}
                onClick={() => markAllAsSeen()}
              >
                Mark all as seen
              </Typography>

              {/* <h6 className="anchor" onClick={() => markAllAsSeen()}>
                Mark all as seen
              </h6> */}
            </Tabs.TabPane>
            <Tabs.TabPane tab="seen" key={1}>
             
              {deleteReport?seenNoti
                ? seenNoti.map((notification) => (
                    <div className="card p-2 mt-2">
                      <div className="card-text">{notification.message}</div>
                    </div>
                  ))
                : null : null}
              <Typography
                sx={{ cursor: "pointer", m: "0.5rem 0", color : "red"}}
                onClick={() => deleteAll()}
              >
                Delete all
              </Typography>
            </Tabs.TabPane>
          </Tabs>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Notifications;
