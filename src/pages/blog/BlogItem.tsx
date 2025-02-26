import { Box, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { ReactComponent as IconRight } from "assets/icons/arrow-right.svg";
import { getTimeAgo } from "helpers/Formatters";
import { Blog } from "models/blog";
import { Link } from "react-router-dom";
import { PATHS } from "Routes/routes.path";

export default function BlogItem(props: { blog: Blog }) {
  const { blog } = props;

  return (
    <Grid size={{ lg: 4, md: 4, sm: 6, xs: 6 }} key={blog.id}>
      <Box borderRadius="6px" overflow="hidden" sx={{height:'150px'}}>
        <img src={blog.images[blog?.images.length - 1]?.imageUrl} height={200} />
      </Box>
      <Stack direction="row" spacing={1} alignItems="center" mb={1} mt={1}>
        <Typography variant="p$14" fontWeight={500} sx={{fontSize:{md:'14px', xs:'10px'}}}>
          {blog.category}
        </Typography>
        <Typography fontWeight={300} sx={{fontSize:{md:'14px', xs:'8px'}}}>o</Typography>
        <Typography variant="p$14" fontWeight={500} sx={{fontSize:{md:'14px', xs:'9px'}}}>
        {getTimeAgo(blog?.createdAt)}
        </Typography>
      </Stack>
      <Typography className="two-line-ellipsis" variant="h$20" fontWeight={600} lineHeight="24px" sx={{height:'50px'}}>
        {blog.title} 
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} mt={1.5} className="text-gv-blue_1D69D8">
        <Link to={`${PATHS.BLOG}/${blog.id}`}>
          <Typography variant="p$16" fontWeight={500} component="a" sx={{fontSize:{md:'16px', xs:'12px'}}}>
            Read article
          </Typography>
        </Link>
        <IconRight />
      </Stack>
    </Grid>
  );
}