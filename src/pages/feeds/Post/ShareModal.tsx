import { Box, Modal, Stack, Typography } from "@mui/material";
import { ReactComponent as TwitterIcon } from "assets/icons/socials/x-filled.svg";
import { ReactComponent as LinkedinIcon } from "assets/icons/socials/linkedin-filled.svg";
import { ReactComponent as FacebookIcon } from "assets/icons/socials/facebook-filled.svg";
import { ReactComponent as WhatsappIcon } from "assets/icons/socials/whatsapp-filled.svg";
import { ReactComponent as CopyLinkIcon } from "assets/icons/link.svg";
import share from "common/share";
import { Post } from "../api";
import useCopyToClipboard from "common/hooks/useCopyToClipboard";
import { useParams } from "react-router-dom";
import { Challenge } from "services/challenge/api";
import { PATHS } from "Routes/routes.path";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  post?: Post;
  challenge?: Challenge;
}

export default function ShareModal(props: Props) {
  const { isOpen, onClose, post, challenge } = props;
  const { handleCopy, copied } = useCopyToClipboard();
  const { id: pathId } = useParams<{ id: string }>();
  let url = window.location.href;

  if (challenge) {
    url = `${window.location.origin}${PATHS.CHALLENGE.LEADERBOARD}`;
  } else if (post) {
    url += `${!pathId ? `/${post.id}` : ""}`;
  }

  const getText = () => {
    let text;

    if (post) {
      const {
        challengeId,
        user: { firstName, lastName },
      } = post;
      if (challengeId) {
        text = `Check out this exciting post by ${firstName} ${lastName}  on Golvia \n for #CelebrateYourCountryChallenge \n`;
      } else {
        text = `Check out this post by ${firstName} ${lastName}  on Golvia \n`;
      }
    }

    if (challenge) {
      const { title } = challenge;
      text = `Keep up with the ${title} challenge ranking on Golvia! \n`;
    }

    return text;
  };

  const handleShare = (platform: "twitter" | "linkedin" | "facebook" | "whatsapp") => {
    share({ platform, url, text: getText() });
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="share-modal">
      <Box
        minWidth={{ md: 426 }}
        maxWidth={{ xs: "95%", sm: 426 }}
        justifySelf="center"
        top="35%"
        position="relative"
        alignItems="center"
        className="bg-white rounded-t-2xl rounded-b-2xl text-gv-black_1A1C1F mr-auto ml-auto"
      >
        <Typography variant="h$20" textAlign="center" fontWeight="medium" padding={2}>
          Share
        </Typography>
        <hr />

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          p={3}
          className="*:cursor-pointer"
        >
          <div className="relative">
            <CopyLinkIcon
              width={40}
              height={40}
              onClick={() => handleCopy(url)}
              className="hover:opacity-70"
            />
            {copied && (
              <Typography position="absolute" fontSize="12px">
                Copied
              </Typography>
            )}
          </div>
          <FacebookIcon
            width={40}
            height={40}
            onClick={() => handleShare("facebook")}
            className="hover:opacity-70"
          />
          <TwitterIcon
            width={40}
            height={40}
            onClick={() => handleShare("twitter")}
            className="hover:opacity-70"
          />
          <LinkedinIcon
            width={40}
            height={40}
            onClick={() => handleShare("linkedin")}
            className="hover:opacity-70"
          />
          <WhatsappIcon
            width={40}
            height={40}
            onClick={() => handleShare("whatsapp")}
            className="hover:opacity-70"
          />
        </Stack>
      </Box>
    </Modal>
  );
}
