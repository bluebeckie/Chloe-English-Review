import type { Question, Subject, Verb } from '../data/types';
import { thirdPersonSubjects, verbs } from '../data/vocab';

interface Template {
  id: string;
  build: (subject: Subject, verb: Verb) => {
    promptZh: string;
    correctTokens: string[];
    distractorTokens: string[];
  };
}

const templates: Template[] = [
  {
    id: 'every-day',
    build: (subject, verb) => ({
      promptZh: `${subject.zh}每天${verb.zh}。`,
      correctTokens: [subject.word, verb.thirdPerson, 'every', 'day', '.'],
      distractorTokens: [verb.base],
    }),
  },
  {
    id: 'often',
    build: (subject, verb) => ({
      promptZh: `${subject.zh}常常${verb.zh}。`,
      correctTokens: [subject.word, 'often', verb.thirdPerson, '.'],
      distractorTokens: [verb.base],
    }),
  },
  {
    id: 'sometimes',
    build: (subject, verb) => ({
      promptZh: `${subject.zh}有時候${verb.zh}。`,
      correctTokens: [subject.word, 'sometimes', verb.thirdPerson, '.'],
      distractorTokens: [verb.base],
    }),
  },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateQuestion(): Question {
  const subject = pick(thirdPersonSubjects);
  const verb = pick(verbs);
  const template = pick(templates);
  const built = template.build(subject, verb);
  return {
    promptZh: built.promptZh,
    correctTokens: built.correctTokens,
    distractorTokens: built.distractorTokens,
    meta: { subject, verb, template: template.id },
  };
}
