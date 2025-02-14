import { useAppSelector } from "store/hooks";
import { selectAuth } from "./slice";

const useAuthDetails = () => {
  const auth = useAppSelector(selectAuth);

  const user = auth.data?.user;
  const { firstName, lastName, profileType, sportType, country, email } = user || {};

  const isProfileCompleted = auth.data?.profile !== null;
  const profileDetails = auth.data?.profile;
  const asset = auth.data?.asset;
  const metadata = auth.data?.metadata;

  const profilePicture = asset?.profilePictureUrl;
  const coverPhotoUrl = asset?.coverPhotoUrl;

  return {
    auth,
    user,
    firstName,
    lastName,
    profileType,
    isProfileCompleted,
    profileDetails,
    sportType,
    asset,
    profilePicture,
    country,
    email,
    metadata,
    coverPhotoUrl,
  };
};

export default useAuthDetails;
