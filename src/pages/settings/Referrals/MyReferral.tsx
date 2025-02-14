
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  Grid,
  Avatar,
  InputLabel,
  Skeleton,
} from "@mui/material";
import SettingsLayout from "layouts/SettingsLayout";
import icons from "pages/Home/constant/icons";
import React, { useEffect, useState } from "react";
import { IoLinkOutline } from "react-icons/io5";
import { SlSocialFacebook } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { AiOutlineLinkedin } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io5";
import { getMyReferrals, getReferalLink } from "api";
import useAuthDetails from "pages/auth/useAuthDetails";
import BackdropLoader from "components/loaders/Backdrop";
import useCopyToClipboard from "common/hooks/useCopyToClipboard";
import share from "common/share";
import { CgFeed } from "react-icons/cg";

interface MyReferrals {
  email: string;
  id: number;
  referralCodeUsed: string;
}

const MyReferral = () => {
  const [link, setLink] = useState<string>("");
  const [myRefferals, setMyRefferals] = useState<MyReferrals[]>([]);

  const { handleCopy, copied } = useCopyToClipboard();
  const { email, firstName } = useAuthDetails();

  const text = `Join Golvia through ${firstName}'s referral! Connect, explore achievements, and collaborate on exciting projects. Click the link to check out ${firstName}'s profile and be part of the Golvia network! 🚀`;

  const handleShare = (
    platform: "twitter" | "linkedin" | "facebook" | "whatsapp"
  ) => {
    share({ platform, url: link, text });
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const extractRefFromString = (referralLink: string): string | null => {
    try {
      const url = new URL(referralLink); // Convert string to URL object
      return url.searchParams.get("ref");
    } catch (error) {
      console.error("Invalid URL format", error);
      return null;
    }
  };

  const handleGetMyReferrals = async (referralLink: string) => {
    setLoading(true);
    const refValue = extractRefFromString(referralLink);

    await getMyReferrals(refValue || "")
      .then((res) => {
        setLoading(false);
        console.log(res);
        setMyRefferals(res?.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleGetReferralLink = async () => {
    setIsLoading(true);
    await getReferalLink(email || "")
      .then((res) => {
     const refValue = extractRefFromString(res?.data);
     const url = `https://golviasports.com/auth/registration?ref=${refValue}`
        setLink(url);
        handleGetMyReferrals(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetReferralLink();
  }, []);
  return (
    <>
      {isLoading && <BackdropLoader />}
      <SettingsLayout>
        <Box
          sx={{
            p: 3,
            backgroundImage: `url(${icons.hero_bg})`,
            backgroundSize: "cover",
            boxSizing: "border-box",
            borderRadius: "12px 12px 0px 0px",
          }}
        >
          <Typography sx={{ fontSize: "30px", color: "#fff" }}>
            Refer Friends & Get Reward
          </Typography>
          <Typography sx={{ color: "#fff", mt: 1 }}>
            Introduce a friend to Golvia, and you'll be rewarded with a prize.
          </Typography>
        </Box>
        <Box sx={{ mt: 3, p: 3 }}>
          <Typography sx={{ mb: 2 }}>
            Share my referral link with friends
          </Typography>
          <TextField
            fullWidth
            value={link}
            disabled
            slotProps={{
              input: {
                style: {
                  borderRadius: "50px",
                  overflow: "hidden",
                },

                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => handleCopy(link)}
                      startIcon={copied ? <MdDone /> : <IoLinkOutline />}
                      sx={{
                        borderRadius: "0px 50px 50px 0px",
                        height: "49px",
                        mr: -3,
                        pr: 4,
                        pl: 3,
                        width: "150px",
                      }}
                      variant="contained"
                    >
                      {copied ? "Copied" : "Copy Link"}
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box
            sx={{ mt: 2, display: "flex", alignItems: "center", columnGap: 3 }}
          >
            <IconButton
              onClick={() => handleShare("facebook")}
              sx={{ border: "0.5px solid #333" }}
            >
              <SlSocialFacebook style={{ fontSize: "16px" }} />
            </IconButton>
            <IconButton
              onClick={() => handleShare("whatsapp")}
              sx={{ border: "0.5px solid #333" }}
            >
              <FaWhatsapp style={{ fontSize: "16px" }} />
            </IconButton>
            <IconButton
              onClick={() => handleShare("twitter")}
              sx={{ border: "0.5px solid #333" }}
            >
              <RiTwitterXFill style={{ fontSize: "16px" }} />
            </IconButton>
            {/* <IconButton sx={{ border: "0.5px solid #333" }}>
              <IoLogoInstagram style={{ fontSize: "16px" }} />
            </IconButton> */}
            <IconButton
              onClick={() => handleShare("linkedin")}
              sx={{ border: "0.5px solid #333" }}
            >
              <AiOutlineLinkedin style={{ fontSize: "16px" }} />
            </IconButton>
            {/* <Button
              variant="outlined"
              sx={{ borderRadius: "50px" }}
              startIcon={<SlSocialFacebook />}
            >
              Facebook
            </Button> */}
          </Box>

          <Box sx={{ mt: 3, bgcolor: "#f4f4f5", p: 3, borderRadius: "6px" }}>
            <Typography sx={{ fontSize: "20px", fontWeight: 200 }}>
              Successful Referrals ({myRefferals?.length || 0})
            </Typography>
            <Divider sx={{ my: 2 }} />
            {loading ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ height: "50px", width: "40%" }}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ height: "50px", width: "20%" }}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ height: "50px", width: "30%" }}
                  />
                </Box>
              </>
            ) : (
              <>
                {myRefferals.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        height: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <CgFeed style={{ fontSize: "50px" }} />
                      <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                        No referrals yet.
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {myRefferals?.map((ref, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-md h-[50px] flex items-center gap-x-3"
                        style={{
                          boxShadow:
                            " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                        }}
                      >
                        <Avatar>
                          <Typography sx={{ color: "#333" }}>
                            {ref.email.charAt(2).toLocaleUpperCase()}
                          </Typography>
                        </Avatar>
                        <InputLabel sx={{ color: "#333", fontSize: "12px" }}>
                          {ref.email}
                        </InputLabel>
                      </div>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </SettingsLayout>
    </>
  );
};

export default MyReferral;