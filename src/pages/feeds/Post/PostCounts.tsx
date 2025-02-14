import { Stack, StackOwnProps, Typography } from "@mui/material";
import human from "utils/human";
import { ReactComponent as LikeIcon } from "assets/icons/like-icon.svg";
import { ReactComponent as ClapIcon } from "assets/icons/clap.svg";

type Props = {
  likes: number;
  creatives: number;
  comments: number;
  challengeId: number | undefined;
  onDetailsClick?: () => void;
} & StackOwnProps;

export default function PostCounts({
  likes,
  creatives,
  comments,
  challengeId,
  onDetailsClick,
  ...stackProps
}: Props) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...stackProps}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          visibility={!!likes ? "visible" : "hidden"}
        >
          <LikeIcon aria-label="like" />
          <p>{human(likes)}</p>
        </Stack>
        {!!challengeId && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            visibility={!!creatives ? "visible" : "hidden"}
          >
            <ClapIcon width={24} height={24} aria-label="creative" />
            <p>{human(creatives)}</p>
          </Stack>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} className="cursor-default">
        <Typography
          variant="p$14"
          visibility={!!comments ? "visible" : "hidden"}
          onClick={onDetailsClick}
        >
          {comments} Comments
        </Typography>
      </Stack>
    </Stack>
  );
}
