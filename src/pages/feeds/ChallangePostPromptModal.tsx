import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import joinChallenge from "assets/imgs/join-challenge.webp";
import { IoMdClose } from "react-icons/io";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChallengePostPromptModal(props: Props) {
  const { isOpen, onClose } = props;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="post-prompt-modal"
      className="overflow-y-scroll"
    >
      <Box
        minWidth={{ md: 426 }}
        maxWidth={{ xs: "95%", sm: 470 }}
        justifySelf="center"
        top="15%"
        position="relative"
        alignItems="center"
        overflow="hidden"
        className="bg-gradient-to-b from-gv-blue_1D69D8 to-gv-blueMinus1_3373E0 rounded-t-2xl rounded-b-2xl text-white mr-auto ml-auto"
      >
        <img src={joinChallenge} className="self-start absolute opacity-30" />
        <IoMdClose className="absolute text-xl right-4 top-4" onClick={onClose} />

        <Stack padding={3} pb={2}>
          <Typography variant="h$24" textAlign="center" fontWeight="medium">
            Upload to the challenge
          </Typography>
          <Typography variant="h$20" textAlign="center" pt={1.5}>
            Stand a chance of winning amazing prizes!
          </Typography>
        </Stack>

        <hr className="mt-3 border-gv-blueMinus1_3373E0" />

        <Stack
          spacing={1}
          alignItems="start"
          pl={2}
          pr={4}
          pt={3}
          pb={2}
          component="ul"
          className="list-decimal *:relative *:left-5"
        >
          <Typography variant="p$18" fontWeight={300} component="li">
            Click on the <span className="font-[400]">Upload to Challenge</span> button.
          </Typography>
          <Typography variant="p$18" fontWeight={300} component="li">
            Upload a video of you singing your country's anthem.
          </Typography>
          <Typography variant="p$18" fontWeight={300} component="li">
            Add an optional caption with the{" "}
            <span className="font-[400]">#CelebrateYourCountryChallenge</span> hastag.
          </Typography>
          <Typography variant="p$18" fontWeight={300} component="li">
            Submit your post.
          </Typography>
          <Typography variant="p$18" fontWeight={300} component="li">
            Access leaderboard from your profile dropdown.
          </Typography>
          <Typography variant="p$18" fontWeight={300} component="li">
            View leaderboard to see your ranking.
          </Typography>
        </Stack>

        <Typography
          variant="p$16"
          fontWeight={500}
          justifySelf="right"
          px={3}
          mb={3}
          component="a"
          target="_blank"
          href="https://golviadocsbucket.s3.us-east-1.amazonaws.com/Terms+%26+Conditions+-++Celebrate+Your+Country+Challenge.pdf"
          className="flex underline"
        >
          Terms & Conditions
        </Typography>

        <Button
          variant="outlined"
          color="white"
          onClick={onClose}
          className="!flex !ml-auto !mr-auto !mb-5"
        >
          Continue
        </Button>
      </Box>
    </Modal>
  );
}
