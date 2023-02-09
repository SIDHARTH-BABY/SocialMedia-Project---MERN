import {
  Backdrop,
  Box,
  Button,
  Fade,
  InputBase,
  LinearProgress,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { editDescription } from "../../api/PostRequest";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPost, setPosts } from "../../state";

const EditPost = ({
  opened,
  handleClosed,
  postId,
  description,
  picturePath,
  handleClose,
}) => {
  const [descriptionPost, setDescriptionPost] = useState("");
  const [loader, setLoader] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  //Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid aqua",
    boxShadow: 24,
    p: 4,
  };

  const handlePost = async () => {
    try {
      const response = await editDescription(descriptionPost, postId);
      setLoader(true);
      if (response.data.success) {
        let updatedPosts = response.data.updateDescription;
        setDescriptionPost("");
        handleClosed();
        handleClose();
        dispatch(setPost({ post: updatedPosts }));
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opened}
        onClose={handleClosed}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={opened}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ ml: "1.5rem", mb: "0.5rem" }}
            >
              Edit Post
            </Typography>
            <FlexBetween gap="1.5rem">
              <Box>
                <InputBase
                  placeholder={description}
                  onChange={(e) => setDescriptionPost(e.target.value)}
                  value={descriptionPost}
                  sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                  }}
                />
                {picturePath && (
                  <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
                  />
                )}
              </Box>
              <Button
                disabled={!descriptionPost}
                onClick={handlePost}
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                POST
              </Button>
            </FlexBetween>
          </Box>
        </Fade>
      </Modal>
      {loader ? <LinearProgress /> : null}
    </div>
  );
};

export default EditPost;
