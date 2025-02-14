import { Backdrop } from "@mui/material";
import { CSSProperties } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const BackdropLoader = () => {
  return (
    <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={true}>
      <PropagateLoader
        color={"#EAF1FD"}
        loading={true}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Backdrop>
  );
};

export default BackdropLoader;
