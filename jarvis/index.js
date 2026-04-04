import { normalize } from "./core/normalizer.js";
import { segment } from "./core/segmenter.js";
import { parse } from "./core/parser.js";
import { validate } from "./core/validator.js";
import { resolveContext } from "./core/contextResolver.js";
import { execute } from "./core/executor.js";

async function run(input) {
  const normalized = normalize(input);
  const segments = segment(normalized);

  const intents = segments.map((s) => parse(s));
  const validIntents = validate(intents);
  const resolved = resolveContext(validIntents);

  await execute(resolved);
}

// TEST
run("hola jarvis abre youtube");
