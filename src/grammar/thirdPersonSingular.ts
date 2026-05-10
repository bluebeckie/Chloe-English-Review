import type { Question, Subject, Verb } from '../data/types';
import { thirdPersonSubjects, verbs } from '../data/vocab';

function zhPrimary(zh: string): string {
  return zh.split(/[;；,，、/]/u)[0].trim();
}

type TemplateId = 'every-day' | 'often' | 'sometimes';

function build(
  template: TemplateId,
  subject: Subject,
  verb: Verb,
): { promptZh: string; correctTokens: string[]; distractorTokens: string[] } {
  const sZh = zhPrimary(subject.zh);
  const vZh = zhPrimary(verb.zh);
  const objTokens = verb.object ? verb.object.en.split(' ') : [];
  const objZh = verb.object ? zhPrimary(verb.object.zh) : '';

  let promptZh: string;
  let correctTokens: string[];

  switch (template) {
    case 'every-day':
      promptZh = `${sZh}每天${vZh}${objZh}。`;
      correctTokens = [
        subject.word,
        verb.thirdPerson,
        ...objTokens,
        'every',
        'day',
        '.',
      ];
      break;
    case 'often':
      promptZh = `${sZh}常常${vZh}${objZh}。`;
      correctTokens = [
        subject.word,
        'often',
        verb.thirdPerson,
        ...objTokens,
        '.',
      ];
      break;
    case 'sometimes':
      promptZh = `${sZh}有時候${vZh}${objZh}。`;
      correctTokens = [
        subject.word,
        'sometimes',
        verb.thirdPerson,
        ...objTokens,
        '.',
      ];
      break;
  }

  return { promptZh, correctTokens, distractorTokens: [verb.base] };
}

const templates: TemplateId[] = ['every-day', 'often', 'sometimes'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateQuestion(): Question {
  const subject = pick(thirdPersonSubjects);
  const verb = pick(verbs);
  const template = pick(templates);
  const built = build(template, subject, verb);
  return {
    promptZh: built.promptZh,
    correctTokens: built.correctTokens,
    distractorTokens: built.distractorTokens,
    meta: { subject, verb, template },
  };
}
