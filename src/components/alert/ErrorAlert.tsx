import React, { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import { Card, CardActions, IconButton, Typography, Box, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Define types for the props of ErrorAlert
interface ErrorAlertProps extends CustomContentProps {
  message: string;
}

const Root = styled(SnackbarContent)(({}) => ({
  "@media (min-width:600px)": {
    maxWidth: "344px !important",
  },
}));

const StyledCard = styled(Card)(({}) => ({
  width: "100%",
  backgroundColor: "#ffe8ef",
  borderRadius: "8px",
  backdropFilter: "blur(10px)",
}));

const ActionRoot = styled(CardActions)(({}) => ({
  padding: "8px 8px 8px 16px",
  justifyContent: "space-between",
}));

const ExpandIconButton = styled(IconButton)(({}) => ({
  padding: "8px 8px",
  transform: "rotate(0deg)",
  color: "#000",
  transition: "all .2s",
  "&.expandOpen": {
    transform: "rotate(180deg)",
  },
}));

const ErrorAlert = forwardRef<HTMLDivElement, ErrorAlertProps>(({ id, message }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <Root ref={ref}>
      <StyledCard>
        <ActionRoot>
          <Box>
            <Typography
              sx={{
                fontFamily: "outfit",
                color: "#a71200",
                fontSize: "12px",
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Opps, something went wrong
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "outfit", color: "#a71200", fontSize: "12px" }}
            >
              {message}
            </Typography>
          </Box>

          <div>
            <ExpandIconButton size="small" onClick={handleDismiss}>
              <CloseIcon sx={{ color: "#a71200" }} fontSize="small" />
            </ExpandIconButton>
          </div>
        </ActionRoot>
        <Box sx={{ p: 0.1, bgcolor: "#a71200" }}></Box>
      </StyledCard>
    </Root>
  );
});

ErrorAlert.displayName = "ErrorAlert";

export default ErrorAlert;
