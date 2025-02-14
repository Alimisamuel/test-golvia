export default function staticPath(_path = "") {
  let path = _path;

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  if (process.env.NODE_ENV !== "production") {
    return `${path}`;
  }

  return `https://${process.env.REACT_APP_DOMAIN}${path}`;
}
