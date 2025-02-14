import { useState } from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import { ReactComponent as SendIcon } from "assets/icons/send.svg";
import { useCreatePostCommentMutation } from "../api";

interface Props {
  postId: number;
  showSubmit?: boolean;
}

export default function CommentField({ postId, showSubmit }: Props) {
  const [createComment, { status: commentStatus }] = useCreatePostCommentMutation();
  const [comment, setComment] = useState<string>("");

  const handleCommentSubmit = () => {
    if (!comment) {
      return;
    }

    createComment({ postId, content: comment }).then(() => {
      setComment("");
    });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        fullWidth
        className="*:h-10"
      />
      {(comment || showSubmit) && (
        <IconButton
          onClick={handleCommentSubmit}
          disabled={commentStatus == "pending"}
          type="submit"
          sx={{
            backgroundColor: "blue",
            ":hover": { backgroundColor: "blueMinus1" },
            ":disabled": { backgroundColor: "blueMinus2", cursor: "not-allowed" },
          }}
        >
          <SendIcon aria-label="like icon" className="text-white cursor-pointer" />
        </IconButton>
      )}
    </Stack>
  );
}
