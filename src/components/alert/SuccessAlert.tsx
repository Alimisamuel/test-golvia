import React, { forwardRef, useCallback } from "react";

import { makeStyles } from "@mui/styles";
import { useSnackbar, SnackbarContent } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { IoIosCheckmarkCircle } from "react-icons/io";

const useStyles = makeStyles(() => ({
  root: {
    "@media (min-width:600px)": {
      maxWidth: "344px !important",
    },
  },
  card: {
    width: "100%",
  },
  typography: {
    color: "#000",
  },
  actionRoot: {
    padding: "8px 8px 8px 16px",
    justifyContent: "space-between",
    alignItems: "start",
  },
  icons: {
    marginLeft: "auto",
  },
  expand: {
    padding: "8px 8px",
    transform: "rotate(0deg)",
    color: "#000",
    transition: "all .2s",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  paper: {
    backgroundColor: "#fff",
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: "none",
  },
}));

interface SuccessAlertProps {
  id: string | number;
  message: string;
}

const SuccessAlert = forwardRef<HTMLDivElement, SuccessAlertProps>(({ id, message }, ref) => {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card
        className={classes.card}
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
        }}
      >
        <CardActions classes={{ root: classes.actionRoot }}>
          <IoIosCheckmarkCircle style={{ fontSize: "25px", color: "#3EC28B" }} />
          <Box>
            <Typography
              sx={{
                fontFamily: "outfit",
                color: "#151515",
                fontSize: "12px",
                mb: 0.5,
                fontWeight: 600,
              }}
            >
              Success Message
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "outfit", color: "#151515", fontSize: "12px" }}
            >
              {message}
            </Typography>
          </Box>

          <div className={classes.icons}>
            <IconButton size="small" className={classes.expand} onClick={handleDismiss}>
              <CloseIcon sx={{ color: "#151515" }} fontSize="small" />
            </IconButton>
          </div>
        </CardActions>
        <Box sx={{ p: 0.1, bgcolor: "#3EC28B" }}></Box>
      </Card>
    </SnackbarContent>
  );
});

SuccessAlert.displayName = "SuccessAlert";

export default SuccessAlert;
