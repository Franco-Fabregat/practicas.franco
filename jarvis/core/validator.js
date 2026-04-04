export function validate(intents) {
  return intents.filter((i) => i.intent !== "UNKNOWN");
}
