export const formatNumber = (value) => value.toLocaleString("ru-RU");

export const formatNumberEn = (value) => value.toLocaleString("en-US");

/**
 * Форматирует длительность в `mm:ss`, а при часе и больше — в `h:mm:ss`.
 *
 * @param {number} ms
 * @returns {string}
 */
export function formatDuration(ms) {
  const safeMs = Number.isFinite(ms) && ms > 0 ? ms : 0;
  const totalSeconds = Math.floor(safeMs / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const pad = (value) => String(value).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}
