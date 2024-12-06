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

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Reformat the date string to "Sun Dec 01, 2024"
  const [weekday, month, day, year] = formattedDate.split(' ');
  // return `${weekday} ${month} ${day.padStart(2, '0')} ${year}`;
  return `${month} ${day.padStart(2, '0')} ${year}`;
};