import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { useGetBlogByIdQuery } from "api/blog";
import AccessLayout from "layouts/AccessLayout";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import { ReactComponent as TwitterIcon } from "assets/icons/socials/x.svg";
import { ReactComponent as LinkedinIcon } from "assets/icons/socials/linkedin.svg";
import { ReactComponent as FacebookIcon } from "assets/icons/socials/facebook.svg";
// import { ReactComponent as WhatsappIcon } from "assets/icons/socials/whatsapp.svg";
import share from "common/share";
import { PATHS } from "routes/path";
import { getTimeAgo } from "helpers/Formatters";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data: blog } = useGetBlogByIdQuery(id ? parseInt(id) : 0);

  const handleShare = (
    platform: "twitter" | "linkedin" | "facebook" | "whatsapp"
  ) => {
    share({
      platform,
      url: window.location.href,
      text: "Check out this blog post on Golvia \n",
    });
  };

  return (
    <AccessLayout path={PATHS.BLOG}>
      {blog?.data && (
        <Box
          maxWidth={{ xs: "100%", md: "80%" }}
          justifySelf="center"
          mt={6}
          mb={8}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            <Typography variant="p$14" fontWeight={500}>
              {blog.data?.category}
            </Typography>
            <Typography fontWeight={300}>o</Typography>
            <Typography variant="p$14" fontWeight={500}>
              {getTimeAgo(blog?.data?.createdAt)}
            </Typography>
          </Stack>
          <Typography
            variant="h$32"
            fontSize="40px"
            fontWeight={600}
            lineHeight="48px"
            mb={5}
          >
            {blog.data?.title}
          </Typography>
          <Box borderRadius="6px" overflow="hidden">
            <img
              src={blog.data.images?.[blog?.data?.images?.length - 1]?.imageUrl}
              height={400}
            />
            <Typography variant="p$14" fontWeight={500} mt={1.5}>
              image via:{" "}
              {blog.data.images?.[blog?.data?.images?.length - 1]?.mediaCredit}
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={8}
            mt={5}
          >
            <Stack>
              <Typography variant="p$16">Share Article:</Typography>
              <Stack direction="row" spacing={1.5}>
                <FacebookIcon
                  width={28}
                  height={28}
                  onClick={() => handleShare("facebook")}
                  className="hover:opacity-70"
                />
                <TwitterIcon
                  width={28}
                  height={28}
                  onClick={() => handleShare("twitter")}
                  className="hover:opacity-70"
                />
                <LinkedinIcon
                  width={28}
                  height={28}
                  onClick={() => handleShare("linkedin")}
                  className="hover:opacity-70"
                />
                {/* <WhatsappIcon
                  width={28}
                  height={28}
                  onClick={() => handleShare("whatsapp")}
                  className="hover:opacity-70"
                /> */}
              </Stack>
            </Stack>
            <Typography
              variant="p$18"
              fontSize="20px"
              flex={1}
              sx={{ fontSize: { md: "20px", xs: "16px" } }}
            >
              <Markdown>{blog.data.content}</Markdown>
            </Typography>
          </Stack>
        </Box>
      )}

      {!blog?.data && (
        <Stack mt={4}>
          <Stack spacing={2}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={350} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="70%" />
            <Skeleton
              variant="rectangular"
              sx={{ fontSize: "1rem" }}
              width="100%"
              height={350}
            />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={200} />
          </Stack>

          <Stack direction="row" spacing={8} mt={5}>
            <Stack width="20%">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="300" />
              <Stack direction="row" spacing={1} mt={2}>
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton variant="circular" width="40px" height="40px" />
              </Stack>
            </Stack>
            <Stack width="80%">
              {[...Array(15)].map((item, i) => (
                <Skeleton variant="text" width="100%" key={i} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      )}
    </AccessLayout>
  );
}
