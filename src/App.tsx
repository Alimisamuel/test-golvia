import "./index.css";
import { Routes } from "./Routes";
import { ThemeContextProvider } from "./Theme/ThemeContextProvider";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./utils/ScrollToTop";
import { Provider } from "react-redux";
import { store } from "./store";
import { SnackbarProvider } from "notistack";
import ErrorAlert from "components/alert/ErrorAlert";
import SuccessAlert from "components/alert/SuccessAlert";
import GoogleAds from "utils/GoogleAds";

const App: React.FC = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      Components={{ error: ErrorAlert, success: SuccessAlert }}
    >
      <Provider store={store}>
        <HelmetProvider>
          <ToastContainer />
          <ThemeContextProvider>
            <div id="continerBackdrop"></div>
            <ScrollToTop />

            <Routes />
            <GoogleAds />
          </ThemeContextProvider>
        </HelmetProvider>
      </Provider>
    </SnackbarProvider>
  );
};

export default App;
