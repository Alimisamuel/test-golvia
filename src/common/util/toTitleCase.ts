export default function toTitleCase(str: string | undefined) {
  if (!str) {
    return str;
  }

  const skipWords = [
    "and",
    "or",
    "to",
    "with",
    "on",
    "in",
    "the",
    "a",
    "an",
    "of",
    "for",
    "by",
    "at",
    "your",
  ];

  return str
    .split(" ")
    .map((word, index) => {
      if (index === 0 || !skipWords.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    })
    .join(" ");
}
