import { useEffect, useState } from "react";

const objectUrlSingleton = new Map<File, string>();

function createObjectUrl(file: File): string {
  const existingUrl = objectUrlSingleton.get(file);

  if (existingUrl) {
    return existingUrl;
  }

  const url = URL.createObjectURL(file);

  objectUrlSingleton.set(file, url);

  return url;
}

export default function useAsyncCreateObjectURL(file: File | undefined) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!file) {
      return;
    }

    setSrc(createObjectUrl(file));
  }, [file]);

  return src;
}
