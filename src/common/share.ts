export default function share(props: {
  platform: "twitter" | "linkedin" | "facebook" | "whatsapp";
  url: string;
  text?: string;
}) {
  const { platform, url, text = "Check out this post on Golvia \n" } = props;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${text} \n`);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&t=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
  };

  const shareUrl = shareUrls[platform];
  if (shareUrl) {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  } else {
    console.error("Unsupported platform");
  }
}
