export default function human(_number: number) {
  const number = Math.floor(_number);

  const round = (num: number) => {
    return Math.round(num * 10) / 10; // round to 1 place
  };

  if (number < 1000) {
    return number;
  }

  if (number < 1_000_000) {
    return `${round(number / 1_000)}K`;
  }

  if (number < 1_000_000_000) {
    return `${round(number / 1_000_000)}M`;
  }

  if (number < 1_000_000_000_000) {
    return `${round(number / 1_000_000_000)}B`;
  }

  return `${round(number / 1_000_000_000_000)}T`;
}
