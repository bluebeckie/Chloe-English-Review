import { useEffect, useState } from 'react';
import { WordTileExercise } from './components/WordTileExercise';
import { generateQuestion } from './grammar/thirdPersonSingular';
import type { Question } from './data/types';
import { load, record, reset } from './storage';
import type { Progress } from './storage';

const MODULE_ID = 'third-person-singular';

function App() {
  const [question, setQuestion] = useState<Question>(() => generateQuestion());
  const [progress, setProgress] = useState<Progress>(() => load(MODULE_ID));

  useEffect(() => {
    setProgress(load(MODULE_ID));
  }, []);

  const handleAnswered = (isCorrect: boolean) => {
    setProgress(record(MODULE_ID, question.meta.verb.base, isCorrect));
  };

  const handleNext = () => {
    setQuestion(generateQuestion());
  };

  const handleReset = () => {
    setProgress(reset(MODULE_ID));
  };

  const accuracy =
    progress.attempts === 0
      ? 0
      : Math.round((progress.correct / progress.attempts) * 100);

  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              第三人稱單數
            </h1>
            <p className="text-xs text-slate-500">Movers · 文法練習</p>
          </div>
          <div className="text-right text-sm text-slate-600">
            <div>
              答對 {progress.correct} / {progress.attempts}
              {progress.attempts > 0 && ` (${accuracy}%)`}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-600 underline"
            >
              重設進度
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center py-8">
        <WordTileExercise
          key={question.meta.verb.base + question.meta.subject.word + Math.random()}
          question={question}
          onAnswered={handleAnswered}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}

export default App;
