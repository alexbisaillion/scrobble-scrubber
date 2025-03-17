export const encodeStr = (str: string) =>
  encodeURI(str)
    .replace(/\+/g, "%252B")
    .replace(/%20/g, "+")
    .replace("/", "%2F");
