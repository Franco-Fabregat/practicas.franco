export function resolveContext(intents) {
  return intents.map((i) => {
    if (i.intent === "OPEN_YOUTUBE" && !i.target) {
      i.target = "youtube";
    }

    return i;
  });
}
