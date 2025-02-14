import { Box, Button, Modal, Stack, Typography } from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  content: string;
  confirm: {
    text: string;
    action: () => void;
    isDisabled?: boolean;
  };
  ignore: {
    text: string;
    action: () => void;
  };
}

export default function ConfirmModal(props: Props) {
  const { isOpen, onClose, header, content, confirm, ignore } = props;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-modal"
      aria-describedby="confirm-modal-description"
    >
      <Box
        minWidth={{ md: 426 }}
        justifySelf="center"
        top="20%"
        position="relative"
        className="bg-white rounded-t-2xl rounded-b-2xl text-gv-black_1A1C1F"
      >
        <Typography variant="h$20" textAlign="center" fontWeight="medium" padding={2}>
          {header}
        </Typography>
        <hr />
        <Stack px={{ xs: 2, sm: 4 }} py={{ xs: 3, sm: 4 }} spacing={4}>
          <Typography variant="p$16" textAlign="center">
            {content}
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" onClick={ignore.action} fullWidth>
              {ignore.text}
            </Button>
            <Button
              variant="contained"
              disabled={confirm.isDisabled}
              onClick={confirm.action}
              fullWidth
            >
              {confirm.text}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
