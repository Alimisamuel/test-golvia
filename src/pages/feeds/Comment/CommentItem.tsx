import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Popper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as DeleteIcon } from "assets/icons/trash.svg";
import { ReactComponent as EllipsisIcon } from "assets/icons/ellipsis.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as SendIcon } from "assets/icons/send.svg";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDeletePostCommentMutation, useEditPostCommentMutation, Comment } from "../api";
import useAuthDetails from "pages/auth/useAuthDetails";
import ConfirmModal from "./ConfirmModal";
import { formatRelativeTime } from "utils/time";

interface Props {
  comment: Comment;
  postId: number;
  hideName?: boolean;
}

export default function CommentItem({ comment, postId, hideName }: Props) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [deleteComment, { status: deleteStatus }] = useDeletePostCommentMutation();
  const [editComment] = useEditPostCommentMutation();
  const { user } = useAuthDetails();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string | undefined>(comment.comment);

  const isCurrentUser = useMemo(() => user?.email == comment.user.email, [user]);

  const handleClickOutside = (event: MouseEvent) => {
    if (anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
      setOptionsOpen(false);
    }
  };

  useEffect(() => {
    if (optionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsOpen]);

  const handleOptionsClick = () => {
    setOptionsOpen((prev) => !prev);
  };

  const submitDisabled = useMemo(() => {
    if (!editedComment) {
      return true;
    }

    if (editedComment.trim() == comment.comment.trim()) {
      return true;
    }

    return false;
  }, [editedComment]);

  const handleEditSubmit = () => {
    editComment({ postId, id: comment.commentId, body: { content: editedComment! } }).then(() => {
      setIsEditing(false);
    });
  };

  const handleDeleteSubmit = () => {
    deleteComment({ id: comment.commentId, postId }).then(() => {
      setConfirmModalOpen(false);
    });
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar
          src={comment.user.avatar || ""}
          alt={"comment-user"}
          style={{ width: 34, height: 34 }}
        />
        {!isEditing ? (
          <Stack spacing={1} width="100%">
            <Stack direction="row" spacing={2}>
              <Stack
                paddingY={1}
                paddingX={2}
                bgcolor="blueMinus4"
                className="rounded-t-[17px] rounded-b-[17px]"
              >
                {!hideName && (
                  <Typography variant="p$14" fontWeight="600">
                    {comment.commentedBy}
                  </Typography>
                )}

                <Typography variant="p$16">{comment.comment}</Typography>
              </Stack>
              {isCurrentUser && (
                <Box className="cursor-pointer !mt-3">
                  <div onClick={handleOptionsClick} ref={anchorRef}>
                    <EllipsisIcon />
                    <Popper
                      id={`${comment.commentId}`}
                      open={optionsOpen}
                      disablePortal={true}
                      anchorEl={anchorRef.current}
                      placement="auto"
                      className="!mt-1"
                    >
                      <Stack
                        sx={(theme) => ({
                          py: 1,
                          bgcolor: "#fff",
                          border: `1px solid ${theme.palette.blueMinus3}`,
                          borderRadius: "8px",
                          minWidth: "110px",
                        })}
                        divider={<hr className="border-gv-blueMinus3_EBF4FF mt-2 mb-2 px-0" />}
                        className="*:px-3"
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          onClick={() => {
                            setConfirmModalOpen(true);
                          }}
                          className="text-gv-red_FF5F3E"
                        >
                          <DeleteIcon height="16px" width="16px" />
                          <Typography variant="p$14">Delete</Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          onClick={() => setIsEditing(true)}
                          className="text-gv-blue_1D69D8"
                        >
                          <EditIcon height="16px" width="16px" />
                          <Typography variant="p$14">Edit</Typography>
                        </Stack>
                      </Stack>
                    </Popper>
                  </div>
                </Box>
              )}
            </Stack>
            <Typography variant="p$14" color="textSecondary">
              {formatRelativeTime(comment.dateTime)} ago
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={1} width="100%">
            <TextField
              fullWidth
              multiline
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        position: "relative",
                        bottom: "10px",
                        alignSelf: "end",
                        cursor: submitDisabled ? "not-allowed" : "pointer",
                      }}
                    >
                      <IconButton
                        type="submit"
                        disabled={submitDisabled}
                        onClick={handleEditSubmit}
                        sx={{
                          borderRadius: 17,
                          height: 32,
                          width: 32,
                          backgroundColor: "blue",
                          ":hover": { backgroundColor: "blueMinus1" },
                          ":disabled": {
                            backgroundColor: "blueMinus2",
                            color: "grayMinus1",
                            cursor: "not-allowed",
                          },
                        }}
                      >
                        <SendIcon aria-label="like icon" className="text-white cursor-pointer" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& fieldset": {
                  borderColor: "blueMinus3",
                },
              }}
            />
            <Typography
              variant="p$14"
              color="primary"
              onClick={() => setIsEditing(false)}
              className="underline cursor-default"
            >
              Cancel Edit
            </Typography>
          </Stack>
        )}
      </Stack>

      <ConfirmModal
        isOpen={confirmModalOpen}
        header="Delete Comment"
        content="Are you sure you want to delete this comment?"
        onClose={() => setConfirmModalOpen(false)}
        confirm={{
          text: "Delete",
          action: handleDeleteSubmit,
          isDisabled: deleteStatus == "pending",
        }}
        ignore={{ text: "No", action: () => setConfirmModalOpen(false) }}
      />
    </>
  );
}
