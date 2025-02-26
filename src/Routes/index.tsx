import { useRoutes } from "react-router-dom";
import { Login, Signup, AccountSuccessfully } from "../pages/auth";
import RegistrationType from "../pages/auth/RegistrationType";
import Feed from "pages/feeds";
import GetStarted from "../pages/get-started";
import Network from "../pages/network/Network";
import { PATHS } from "./routes.path";
import VerifyOtp from "../pages/auth/VerifyOtp";
import NoPage from "../pages/nopage";
import { Privacy, PolicyLayouts, Terms, Cookies } from "../pages/policy";
import ProfileSettings from "pages/settings/profile/Profile";
import PasswordResetSettings from "pages/settings/passwordReset/PasswordReset";
import NotificationSettings from "pages/settings/Notifications";
import ActivityLog from "pages/settings/ActivityLog";
import ProtectedRoute from "./ProtectedRoutes";
import ForgotPassword from "pages/auth/ForgotPassword";
import NewPassword from "pages/auth/ForgotPassword/NewPassword";
import LoginOtp from "pages/auth/LoginOtp";
import OtherUserProfile from "pages/settings/profile/OtherUserProfile";
import LiveScoreLayout from "layouts/LiveScoreLayout";
import Messages from "pages/messages";
import Home from "pages/Home";
import MarketPlace from "pages/MarketPlace";
import Faqs from "pages/settings/Faqs";
import Leaderboard from "pages/challenges/Leaderboard";
import MyProfileViews from "pages/settings/profile/MyActivityStat/MyProfileViews";
import Notification from "pages/Notification/Notification";
import MyReferral from "pages/settings/Referrals/MyReferral";
import Blog from "pages/blog";
import BlogPost from "pages/blog/BlogPost";

export function Routes() {
  let element = useRoutes([
    {
      path: PATHS.HOME,
      index: true,
      element: <Home />,
    },
    {
      path: PATHS.LOGIN,
      element: <Login />,
    },
    {
      path: PATHS.MARKETPLACE,
      element: <MarketPlace />,
    },

    {
      path: "*",
      element: <NoPage />,
    },
    {
      path: PATHS.SIGNUP,

      element: <Signup />,
    },
    {
      path: PATHS.LOGIN_OTP,

      element: <LoginOtp />,
    },
    {
      path: PATHS.FORGOT_PASSWORD,

      element: <ForgotPassword />,
    },
    {
      path: PATHS.SET_PASSWORD,

      element: <NewPassword />,
    },
    {
      path: PATHS.VERIFY_OTP,

      element: <VerifyOtp />,
    },
    {
      path: PATHS.ACCOUNT_SUCCESSFUL,

      element: <AccountSuccessfully />,
    },
    {
      path: PATHS.REGISTRATION_TYPE,

      element: <RegistrationType />,
    },
    {
      path: PATHS.FEED,
      element: (
        <ProtectedRoute>
          <Feed />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.NOTIFICATIONS,
      element: (
        <ProtectedRoute>
          <Notification />
        </ProtectedRoute>
      ),
    },
    {
      path: "/feeds",
      element: (
        <ProtectedRoute>
          <Feed />
        </ProtectedRoute>
      ),
    },
    {
      path: `${PATHS.FEED}/:id`,
      element: (
        <ProtectedRoute>
          <Feed />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.MESSAGES,
      element: (
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.LIVESCORE,
      element: (
        <ProtectedRoute>
          <LiveScoreLayout />
        </ProtectedRoute>
      ),
    },
    {
      path: `${PATHS.OTHER_USER_PROFILE}/:name/:id`,
      element: (
        <ProtectedRoute>
          <OtherUserProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.GET_STARTED,
      element: (
        <ProtectedRoute>
          <GetStarted />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.EDIT_PROFILE,
      element: (
        <ProtectedRoute>
          <GetStarted />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.NETWORK,
      element: (
        <ProtectedRoute>
          <Network />
        </ProtectedRoute>
      ),
    },
    {
      element: <PolicyLayouts />,
      children: [
        {
          path: PATHS.PRIVACY_POLICY,
          element: <Privacy />,
        },
        {
          path: PATHS.TERMS_OF_USE,
          element: <Terms />,
        },
        {
          path: PATHS.COOKIE_POLICY,
          element: <Cookies />,
        },
      ],
    },
    {
      path: PATHS.SETTINGS.PROFILE,
      element: (
        <ProtectedRoute>
          <ProfileSettings />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.SETTINGS.PASSWORD_RESET,
      element: <PasswordResetSettings />,
    },
       {
      path: PATHS.SETTINGS.MY_REFERRALS,
      element: <MyReferral />,
    },
    {
      path: PATHS.SETTINGS.FAQ,
      element: <Faqs />,
    },
    {
      path: PATHS.SETTINGS.NOTIFICATIONS,
      element: <NotificationSettings />,
    },
    {
      path: PATHS.SETTINGS.ACTIVITIES,
      element: <ActivityLog />,
    },
    {
      path: PATHS.CHALLENGE.LEADERBOARD,
      element: <Leaderboard />,
    },
    {
      path: PATHS.ACTIVITY_STAT.MY_PROFILE_VIEWS,
      element: <MyProfileViews />,
    },
      {
      path: PATHS.BLOG,
      element: <Blog />,
    },
    {
      path: `${PATHS.BLOG}/:id`,
      element: <BlogPost />,
    },
  ]);
  return element;
}
