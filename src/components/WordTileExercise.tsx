import { useMemo, useState } from 'react';
import type { Question } from '../data/types';

type Tile = { id: number; word: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTiles(question: Question): Tile[] {
  const words = [...question.correctTokens, ...question.distractorTokens];
  return shuffle(words).map((word, id) => ({ id, word }));
}

interface Props {
  question: Question;
  onAnswered: (isCorrect: boolean) => void;
  onNext: () => void;
}

export function WordTileExercise({ question, onAnswered, onNext }: Props) {
  const tiles = useMemo(() => buildTiles(question), [question]);
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState<null | 'correct' | 'wrong'>(null);

  const selectedSet = new Set(selected);
  const orderedWords = selected.map((id) => tiles[id].word);

  const select = (id: number) => {
    if (submitted) return;
    setSelected((prev) => [...prev, id]);
  };

  const unselect = (id: number) => {
    if (submitted) return;
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const submit = () => {
    if (submitted) return;
    const isCorrect =
      orderedWords.length === question.correctTokens.length &&
      orderedWords.every((w, i) => w === question.correctTokens[i]);
    setSubmitted(isCorrect ? 'correct' : 'wrong');
    onAnswered(isCorrect);
  };

  const next = () => {
    setSelected([]);
    setSubmitted(null);
    onNext();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 flex flex-col gap-6">
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-2">請依中文排出英文句子</p>
        <p className="text-2xl font-medium text-slate-800">
          {question.promptZh}
        </p>
      </div>

      <div className="min-h-20 border-b-2 border-dashed border-slate-300 pb-3 flex flex-wrap gap-2 justify-center items-start">
        {selected.length === 0 && (
          <span className="text-slate-400 text-sm self-center">
            點下方字塊
          </span>
        )}
        {selected.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => unselect(id)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-lg hover:bg-slate-50 disabled:opacity-60"
            disabled={submitted !== null}
          >
            {tiles[id].word}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center min-h-20">
        {tiles.map((tile) =>
          selectedSet.has(tile.id) ? (
            <span
              key={tile.id}
              className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-lg text-transparent select-none"
              aria-hidden="true"
            >
              {tile.word}
            </span>
          ) : (
            <button
              key={tile.id}
              type="button"
              onClick={() => select(tile.id)}
              className="px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-lg hover:bg-sky-50 hover:border-sky-400"
              disabled={submitted !== null}
            >
              {tile.word}
            </button>
          ),
        )}
      </div>

      {submitted === null && (
        <button
          type="button"
          onClick={submit}
          disabled={selected.length === 0}
          className="px-5 py-3 rounded-md bg-sky-600 text-white font-medium disabled:bg-slate-300"
        >
          檢查答案
        </button>
      )}

      {submitted === 'correct' && (
        <div className="rounded-md bg-emerald-50 border border-emerald-300 p-4 text-emerald-800">
          答對了！
        </div>
      )}

      {submitted === 'wrong' && (
        <div className="rounded-md bg-rose-50 border border-rose-300 p-4 text-rose-800">
          <div className="font-medium">再想想，正確答案是：</div>
          <div className="mt-1 text-lg">
            {question.correctTokens.join(' ').replace(' .', '.')}
          </div>
        </div>
      )}

      {submitted !== null && (
        <button
          type="button"
          onClick={next}
          className="px-5 py-3 rounded-md bg-slate-800 text-white font-medium"
        >
          下一題
        </button>
      )}
    </div>
  );
}
