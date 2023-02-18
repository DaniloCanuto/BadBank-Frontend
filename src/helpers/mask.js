export function mask(value, pattern) {
  let i = 0;
  const stringify = value.toString();

  return pattern.replace(/#/g, () => stringify[i++] || "");
}