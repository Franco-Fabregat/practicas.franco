import intents from "../intents/intents.json" with { type: "json" };

export function parse(text) {
  for (const key in intents) {
    const patterns = intents[key].patterns;

    for (const pattern of patterns) {
      if (text.includes(pattern)) {
        return {
          intent: key,
          target: intents[key].target,
        };
      }
    }
  }

  if (text.includes("hola") || text.includes("hey")) {
    return { intent: "ACTIVATION" };
  }

  return { intent: "UNKNOWN" };
}
