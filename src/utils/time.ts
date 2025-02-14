export function formatRelativeTime(timestamp: string, isBrief?: boolean) {
  const now = new Date();
  const date = new Date(timestamp);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const nowDate = new Date(formatter.format(now));
  const diffInSeconds = Math.floor((+nowDate - +date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds >= 1 ? diffInSeconds : 1} ${isBrief ? "s" : "sec"}`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${isBrief ? "m" : "min"}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${isBrief ? "h" : "hr"}`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${isBrief ? "d" : "day"}`;
  } else {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} ${isBrief ? "w" : "wk"}`;
  }
}
