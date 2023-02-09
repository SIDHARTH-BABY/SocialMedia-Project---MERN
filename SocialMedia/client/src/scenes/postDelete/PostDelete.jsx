import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  Fade,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { setPost, setPosts } from "../../state";
import { UserPostDelete, UserPostReport } from "../../api/PostRequest";
import { useReducer } from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Box } from "@mui/system";
import EditPost from "./EditPost";
import { toast } from "react-hot-toast";
const ITEM_HEIGHT = 48;

const PostDelete = ({
  setLoading,
  postUserId,
  postId,
  description,
  picturePath,
}) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [reportAlert, setReportAlert] = useState(false);
  const [editAlert, setEditAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const [opened, setOpened] = useState(false);
  const handleOpened = () => setOpened(true);
  const handleClosed = () => setOpened(false);

  const [ reportOff , serReportOff] = useState(true);

  const [loaderDelete, setLoaderDelete] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loggedInUserId = useSelector((state) => state.user._id);

  //Delete Post

  const deletePost = async (postId) => {
    try {
      console.log(postId, "herer post Id");
      const response = await UserPostDelete(postId);
      setLoader(true);
      if (response.data.success) {
        setLoaderDelete(true);
        toast.success(response.data.message);
        let updatedPosts = response.data.newposts;
        console.log(updatedPosts, "ithannu new posts");
        dispatch(setPost({ post: updatedPosts }));
        setLoading(false);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Report Post
  const reportPost = async (postId) => {
    try {
      console.log(postId, "noww post Id ");
      const response = await UserPostReport(postId, loggedInUserId);

      console.log(response, "report");
      if (response.data.success) {
        serReportOff(false)
        toast.success(response.data.message);
       
        // let updatedPosts = response.data.newposts;
        // console.log(updatedPosts, "ithannu new posts");
        // dispatch(setPost({ post: updatedPosts }));
        console.log("reported");
      }else{
        serReportOff(false)
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "40ch",
          },
        }}
      >
        {postUserId === loggedInUserId ? (
          <div>
            {!deleteAlert ? (
              <Button onClick={handleOpened}>Edit Post</Button>
            ) : (
              <Button
                size="medium"
                onClick={() => {
                  setDeleteAlert(false);
                }}
              >
                Not Now
              </Button>
            )}

            <Button
              onClick={() => {
                setDeleteAlert(true);
              }}
            >
              {deleteAlert ? (
                <div>
                  <Alert
                    severity="error"
                    action={
                      <Button
                        size="medium"
                        onClick={() => {
                          deletePost(postId);
                        }}
                      >
                        Delete
                      </Button>
                    }
                  >
                    Are You Sure?
                  </Alert>
                </div>
              ) : (
                "Delete Post"
              )}
            </Button>
          </div>
        ) : (
          <div>
            {reportOff?!reportAlert ? (
              <Button
                size="medium"
                onClick={() => {
                  setReportAlert(true);
                }}
              >
                Report
              </Button>
            ) : null : ""}

            {reportOff ?reportAlert ? (
              <div>
                <Alert
                  severity="warning"
                  action={
                    <Button
                      color="error"
                      size="medium"
                      onClick={() => {
                        reportPost(postId);
                      }}
                    >
                      Report
                    </Button>
                  }
                >
                  Are You Sure?
                </Alert>
              </div>
            ) : (
              ""
            ) : ""}
            {reportOff?reportAlert ? (
              <Button
                onClick={() => {
                  setReportAlert(false);
                }}
              >
                Go Back
              </Button>
            ) : null : ""}
          </div>
        )}
      </Menu>

      <EditPost
        opened={opened}
        handleClosed={handleClosed}
        postId={postId}
        description={description}
        picturePath={picturePath}
        handleClose={handleClose}
      />
    </div>
  );
};

export default PostDelete;
