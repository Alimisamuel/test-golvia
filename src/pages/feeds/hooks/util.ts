import { DragEvent } from "react";

export function containsFiles(e: DragEvent<HTMLInputElement>) {
  const types = e.dataTransfer.types || [];

  if (types.find((type) => type === "Files")) {
    return true;
  }

  return false;
}
