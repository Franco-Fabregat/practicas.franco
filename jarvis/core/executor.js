import { openYoutube } from "../services/youtube.js";

export async function execute(intents) {
  for (const i of intents) {
    if (i.intent === "OPEN_YOUTUBE") {
      await openYoutube();
    }

    if (i.intent === "ACTIVATION") {
      console.log("JARVIS activado");
    }
  }
}
