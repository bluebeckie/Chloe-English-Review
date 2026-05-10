export interface Verb {
  base: string;
  thirdPerson: string;
  ing: string;
  past: string;
  pp: string;
  regular: boolean;
  zh: string;
  object?: { en: string; zh: string };
}

export interface Subject {
  word: string;
  person: 1 | 2 | 3;
  number: 'singular' | 'plural';
  thirdPerson: boolean;
  zh: string;
}

export interface Question {
  promptZh: string;
  correctTokens: string[];
  distractorTokens: string[];
  meta: {
    subject: Subject;
    verb: Verb;
    template: string;
  };
}
