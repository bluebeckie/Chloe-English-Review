import level4 from '../../data/vocab/movers-level4.json';
import level6 from '../../data/vocab/movers-level6.json';
import irregular from '../../data/vocab/irregular-verbs.json';
import subjectsRaw from '../../data/vocab/subjects.json';
import type { Subject, Verb } from './types';

interface RawVerb {
  base: string;
  thirdPerson?: string;
  ing?: string;
  past?: unknown;
  pp?: string;
  regular?: boolean;
  zh: string;
  forms?: unknown;
}

const SKIP_BASES = new Set(['be', 'have']);

function normalizeVerb(raw: RawVerb): Verb | null {
  if (
    !raw.thirdPerson ||
    typeof raw.past !== 'string' ||
    !raw.pp ||
    !raw.ing
  ) {
    return null;
  }
  return {
    base: raw.base,
    thirdPerson: raw.thirdPerson,
    ing: raw.ing,
    past: raw.past,
    pp: raw.pp,
    regular: raw.regular ?? false,
    zh: raw.zh,
  };
}

function buildVerbList(): Verb[] {
  const merged = new Map<string, Verb>();
  const sources: RawVerb[] = [
    ...(level4.verbs as RawVerb[]),
    ...(level6.verbs as RawVerb[]),
    ...(irregular.verbs as RawVerb[]),
  ];
  for (const raw of sources) {
    if (SKIP_BASES.has(raw.base)) continue;
    const v = normalizeVerb(raw);
    if (!v) continue;
    if (!merged.has(v.base)) merged.set(v.base, v);
  }
  return [...merged.values()];
}

export const verbs: Verb[] = buildVerbList();

export const thirdPersonSubjects: Subject[] = [
  ...subjectsRaw.pronouns,
  ...subjectsRaw.names,
].filter((s): s is Subject => s.thirdPerson === true);
