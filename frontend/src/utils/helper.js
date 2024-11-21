export function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return hex.padStart(6, "0");
}

export function truncateText(text, maxWords, maxChars) {
  const wordsArray = text.split(" ");
  const truncatedByWords =
    wordsArray.length > maxWords
      ? wordsArray.slice(0, maxWords).join(" ") + "... "
      : text;

  const truncatedByChars =
    truncatedByWords.length > maxChars
      ? truncatedByWords.slice(0, maxChars) + "... "
      : truncatedByWords;

  return truncatedByChars;
}
