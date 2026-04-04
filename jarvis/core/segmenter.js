export function segment(text) {
  return text.split(/ y | luego |,/).map((part) => part.trim()).filter(Boolean);
}
