const KEY = 'chloe.progress.v1';

export interface Progress {
  module: string;
  attempts: number;
  correct: number;
  perVerb: Record<string, { attempts: number; correct: number }>;
}

const empty = (module: string): Progress => ({
  module,
  attempts: 0,
  correct: 0,
  perVerb: {},
});

export function load(module: string): Progress {
  try {
    const raw = localStorage.getItem(`${KEY}:${module}`);
    if (!raw) return empty(module);
    const parsed = JSON.parse(raw) as Progress;
    if (parsed.module !== module) return empty(module);
    return parsed;
  } catch {
    return empty(module);
  }
}

export function record(
  module: string,
  verbBase: string,
  isCorrect: boolean,
): Progress {
  const p = load(module);
  p.attempts += 1;
  if (isCorrect) p.correct += 1;
  const v = p.perVerb[verbBase] ?? { attempts: 0, correct: 0 };
  v.attempts += 1;
  if (isCorrect) v.correct += 1;
  p.perVerb[verbBase] = v;
  localStorage.setItem(`${KEY}:${module}`, JSON.stringify(p));
  return p;
}

export function reset(module: string): Progress {
  localStorage.removeItem(`${KEY}:${module}`);
  return empty(module);
}
