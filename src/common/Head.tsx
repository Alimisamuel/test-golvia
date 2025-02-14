import { Helmet } from "react-helmet-async";
import staticPath from "./util/staticPath";
import { useLocation } from "react-router-dom";

export interface Props {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogSiteName?: string;
  ogUrl?: string;
}

export default function Head(props: Props) {
  const { title, description, ogTitle, ogImage, ogDescription, ogUrl } = props;

    const location = useLocation();
  const canonicalUrl = `https://www.golviasports.com${location.pathname}`;
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:image" content={ogImage || staticPath("logo.png")} />
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_US" />
    </Helmet>
  );
}
