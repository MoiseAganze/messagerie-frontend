export function reduceText(text, sizemax) {
  return text.length > 20 ? text.slice(0, sizemax) + "..." : text;
}
