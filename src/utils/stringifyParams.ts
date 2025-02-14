type InputPrimitive = string | number | boolean;
type QueryValue<T> = T | T[] | undefined | null;

export type InputUrlQuery<K extends string = string> = {
  [key in K]: QueryValue<InputPrimitive>;
};

export function stringifyParams<K extends string = string>(
  args: Partial<InputUrlQuery<K>> | null | undefined
) {
  if (!args) {
    return "";
  }

  const queryParts: string[] = [];
  const keys = Object.keys(args);

  for (const key of keys) {
    const value = args[key as K];

    if (Array.isArray(value)) {
      for (const val of value) {
        if (val !== null && val !== undefined) {
          queryParts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`);
        }
      }
    } else if (value) {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return queryParts.join("&");
}
