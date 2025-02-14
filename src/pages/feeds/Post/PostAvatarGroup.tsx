import { useEffect, useRef, useState } from "react";
import { Post, useDeletePostMutation } from "../api";
import { Avatar, Popper, Stack, Typography } from "@mui/material";
import { ReactComponent as DeleteIcon } from "assets/icons/trash.svg";
import { ReactComponent as EllipsisIcon } from "assets/icons/horizontal-ellipsis.svg";
import ConfirmModal from "../Comment/ConfirmModal";
import { formatRelativeTime } from "utils/time";
import useNavigateWithHash from "pages/settings/profile/hooks/useNavigateWithHash";
import isCurrentUser from "common/isCurrentUser";
import FormatProfileType from "pages/settings/profile/Utils/FormatProfileType";

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formatter.format(date);
}

export default function PostAvatarGroup(props: { post: Post; compact: boolean | undefined }) {
  const {
    post: { user, id, challengeId, postedAt, dateCreated },
    compact,
  } = props;
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [deletePost, { status: deleteStatus }] = useDeletePostMutation();

  const handleOptionsClick = () => {
    setOptionsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
      setOptionsOpen(false);
    }
  };

  useEffect(() => {
    if (optionsOpen) {
      document.addEventListener("mousedown", (e) => handleClickOutside(e as unknown as MouseEvent));
    } else {
      document.removeEventListener("mousedown", (e) =>
        handleClickOutside(e as unknown as MouseEvent)
      );
    }
    return () => {
      document.removeEventListener("mousedown", (e) =>
        handleClickOutside(e as unknown as MouseEvent)
      );
    };
  }, [optionsOpen]);

  const { sendUserToNextPage } = useNavigateWithHash();

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1} marginBottom={2}>
          <Avatar
            onClick={() => sendUserToNextPage(user?.email, user?.firstName)}
            src={user.avatar}
            alt={"user"}
            sx={{ width: 48, height: 48, cursor: "pointer" }}
          />

          <div>
            <h3
              onClick={() => sendUserToNextPage(user?.email, user?.firstName)}
              className="font-medium text-base cursor-pointer"
            >
              {user.firstName}
            </h3>

            {!compact ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                className="font-normal text-xs text-[#A9A9A9]"
              >
                <h4>
                  {user?.email === "Golviasports@gmail.com" ? (
                    ""
                  ) : (
                    <FormatProfileType value={user?.profileType ?? ""} />
                  )}
                </h4>
                <div className="border-[1px] border-[#A9A9A9] rounded-full" />
                <span>{formatRelativeTime(postedAt || dateCreated, true)}</span>
              </Stack>
            ) : (
              <h4 className="font-normal text-xs text-[#A9A9A9]">
                {formatDate(postedAt || dateCreated)}
              </h4>
            )}
          </div>
        </Stack>
        {isCurrentUser(user.email) && (
          <div onClick={handleOptionsClick} ref={anchorRef} className="cursor-pointer">
            <EllipsisIcon />
            <Popper
              id={`${user.email}`}
              open={optionsOpen}
              disablePortal={true}
              anchorEl={anchorRef.current}
              placement="left-start"
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
              </Stack>
            </Popper>
          </div>
        )}
      </Stack>

      <ConfirmModal
        isOpen={confirmModalOpen}
        header="Delete Post"
        content="Are you sure you want to delete this post?"
        onClose={() => setConfirmModalOpen(false)}
        confirm={{
          text: "Delete",
          action: () => deletePost({ id, challengeId }),
          isDisabled: deleteStatus == "pending",
        }}
        ignore={{ text: "No", action: () => setConfirmModalOpen(false) }}
      />
    </>
  );
}
