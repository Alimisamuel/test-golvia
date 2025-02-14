import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

export default function PostContent({ content }: { content: string | undefined }) {
  if (!content) {
    return;
  }

  const maxLength = 250;
  const [isTrimmed, setIsTrimmed] = useState(true);
  const trimmedString = useMemo(() => `${content.substring(0, maxLength)}`, [content]);
  const [formattedContent, setFormattedContent] = useState(trimmedString);

  useEffect(() => {
    if (isTrimmed) {
      setFormattedContent(trimmedString);
      return;
    }

    setFormattedContent(content);
  }, [content, isTrimmed]);

  const handleFormatToggle = () => {
    setIsTrimmed((prev) => !prev);
  };

  return (
    <Typography variant="p$16">
      {formattedContent}
      {content.length > maxLength && (
        <Typography
          component="span"
          color="grayMinus1"
          fontWeight="medium"
          onClick={handleFormatToggle}
          className="cursor-default"
        >
          {" "}
          ...{isTrimmed ? "more" : "less"}
        </Typography>
      )}
    </Typography>
  );
}
