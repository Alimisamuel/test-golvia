import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Post, useCreativePostMutation, useLikePostMutation } from "../api";
import { useState } from "react";
import { ReactComponent as OutlinedLikeIcon } from "assets/icons/outlined-like-icon.svg";
import { ReactComponent as ClapIcon } from "assets/icons/outlined-clap.svg";
import { ReactComponent as CommentIcon } from "assets/icons/comment-icon.svg";
import { ReactComponent as ShareIcon } from "assets/icons/share.svg";
import ShareModal from "./ShareModal";

function ActionButton({
  icon: Icon,
  text,
  onClick,
  iconColor,
  className,
}: {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  text: string;
  onClick: (e: MouseEvent) => void;
  className?: string;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack
      direction="row"
      py={!isMobile ? 0.5 : 1}
      px={1.5}
      spacing={1}
      alignItems="center"
      className={`bg-quaternary rounded-3xl cursor-pointer ${className}`}
      onClick={(e) => onClick(e as unknown as MouseEvent)}
    >
      {Icon && <Icon height="20px" width="20px" color={iconColor} />}
      {!isMobile && <Typography variant="p$14">{text}</Typography>}
    </Stack>
  );
}

export default function PostActions({
  post,
  openComments,
}: {
  post: Post;
  openComments?: (e: MouseEvent) => void;
}) {
  const { id, isLiked: _isLiked, isCreative, challengeId } = post;
  const [likePost] = useLikePostMutation();
  const [creativePost] = useCreativePostMutation();
  const [isLiked, setIsLiked] = useState(_isLiked);
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleLikePost = () => {
    setIsLiked((prev) => !prev);
    likePost(id);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <ActionButton
          text="Like"
          icon={OutlinedLikeIcon}
          onClick={handleLikePost}
          className={`${isLiked && "!bg-gv-blue_1D69D8 text-white"}`}
        />
        {!!challengeId && (
          <ActionButton
            text="Creative"
            icon={ClapIcon}
            onClick={() => creativePost(id)}
            className={`${isCreative && "!bg-gv-blue_1D69D8 text-white"}`}
          />
        )}
        {openComments && <ActionButton text="Comment" icon={CommentIcon} onClick={openComments} />}
        <ActionButton text="Share" icon={ShareIcon} onClick={() => setOpenShareModal(true)} />
      </Stack>

      <ShareModal isOpen={openShareModal} onClose={() => setOpenShareModal(false)} post={post} />
    </>
  );
}
