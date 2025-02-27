import { Box, Grid2 as Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useGetBlogQuery } from "api/blog";
import { ReactComponent as IconRight } from "assets/icons/arrow-right.svg";
import AccessLayout from "layouts/AccessLayout";
import { Link } from "react-router-dom";
import { PATHS } from "routes/path";
import BlogItem from "./BlogItem";

export default function Blog() {
  const { data: blogs } = useGetBlogQuery(null);

  return (
    <AccessLayout path={PATHS.BLOG}>
      <Typography
        variant="h$32"
        fontSize="38px"
        fontWeight={600}
        lineHeight="46px"
        justifySelf="center"
        textAlign="center"
        mb={6}
        mt={6}
        maxWidth={560}
      >
        Don’t miss out on sport updates & new features on Golvia
      </Typography>
      {blogs?.data && (
        <>
          <Box
            width={{ xs: "100%", md: "80%" }}
            justifySelf="center"
            justifyItems="center"
            textAlign="center"
            mb={5}
          >
            <Box borderRadius="6px" overflow="hidden" maxHeight={430}>
              <img src={blogs.data[0].images[0]?.imageUrl} />
            </Box>
            <Typography variant="p$14" fontWeight={500} mt={2} mb={1.5}>
              {blogs.data[0].category}
            </Typography>
            <Typography
              variant="h$20"
              fontSize="28px"
              fontWeight={600}
              lineHeight="32px"
              maxWidth={400}
            >
              {blogs.data[0].title}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              mt={2}
              justifyContent="center"
              className="text-gv-blue_1D69D8"
            >
              <Link to={`${PATHS.BLOG}/${blogs.data[0].id}`}>
                <Typography variant="p$16" fontWeight={500} component="a">
                  Read article
                </Typography>
              </Link>
              <IconRight />
            </Stack>
          </Box>

          <Grid container spacing={2.5} rowSpacing={7} sx={{ pb: 5 }}>
            {blogs?.data.slice(1).map((blog) => (
              <BlogItem blog={blog} />
            ))}
          </Grid>
        </>
      )}

      {!blogs?.data && (
        <Stack spacing={2} className="mt-2">
          <Box
            justifyItems="center"
            alignSelf="center"
            width={{ xs: "100%", md: "80%" }}
          >
            <Skeleton
              variant="rectangular"
              sx={{ fontSize: "1rem" }}
              width="100%"
              height={400}
            />
            <Stack mt={2} mb={4} alignItems="center">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={200} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={400} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={300} />
            </Stack>
          </Box>

          <Grid container spacing={2.5} rowSpacing={7}>
            {[...Array(6)].map((item, i) => (
              <Grid size={{ lg: 4, md: 4, sm: 6, xs: 6 }} key={i}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </AccessLayout>
  );
}
