
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- Типы и Константы ---
type Difficulty = 'STANDARD' | 'HARD';

interface Task {
    id: number;
    title: string;
    question: string;
    correctAnswer: string;
    explanation: string;
    userInput: string;
    isCorrect?: boolean;
}

// --- Компоненты ---

const MathText: React.FC<{ text: string }> = ({ text }) => {
    if (!text) return null;
    const parts = text.split(/(\[.*?\/.*?\])/);
    return (
        <span className="inline-block">
            {parts.map((part, i) => {
                if (part.startsWith('[') && part.endsWith(']')) {
                    const inner = part.slice(1, -1);
                    const slashIndex = inner.indexOf('/');
                    const num = inner.slice(0, slashIndex).trim();
                    const den = inner.slice(slashIndex + 1).trim();
                    return (
                        <span key={i} className="fraction">
                            <span className="fraction-numerator">{num}</span>
                            <span className="fraction-denominator">{den}</span>
                        </span>
                    );
                }
                return <span key={i} className="whitespace-pre-wrap">{part}</span>;
            })}
        </span>
    );
};

const generateTasks = (difficulty: Difficulty): Task[] => {
    const tasks: Task[] = [];

    if (difficulty === 'STANDARD') {
        tasks.push(
            { id: 1, title: 'Задание 1', question: 'Вычислите: -3 ⋅ (47 + 138)', correctAnswer: '-555', explanation: '-3 ⋅ (185) = -555', userInput: '' },
            { id: 2, title: 'Задание 2.1', question: 'Выполните действие:\n([7/6] − [2/3]) ⋅ [5/4]', correctAnswer: '5/8', explanation: '([7/6] - [4/6]) ⋅ [5/4] = [3/6] ⋅ [5/4] = [1/2] ⋅ [5/4] = [5/8]', userInput: '' },
            { id: 3, title: 'Задание 2.2', question: 'Вычислите:\n2,4 + 0,6 ⋅ (−1,5)', correctAnswer: '1,5', explanation: '0,6 ⋅ (-1,5) = -0,9. \n2,4 + (-0,9) = 1,5', userInput: '' },
            { id: 4, title: 'Задание 3', question: 'Найдите значение выражения -3|y − 2| при y = -5', correctAnswer: '-21', explanation: '-3 ⋅ |-5 - 2| = -3 ⋅ |-7| = -3 ⋅ 7 = -21', userInput: '' },
            { id: 5, title: 'Задание 4', question: 'Решите уравнение: 7x − 2x = 9,6 − 1,8', correctAnswer: '1,56', explanation: '5x = 7,8 ⇒ x = 7,8 / 5 = 1,56', userInput: '' },
            { id: 6, title: 'Задание 5', question: 'Катер прошёл по течению реки 48 км за 3 часа. Сколько часов понадобится на обратный путь, если скорость течения реки равна 2 км/ч?', correctAnswer: '4', explanation: '1) Vпо = 16. 2) Vсоб = 14. 3) Vпр = 12. 4) Время: 48/12 = 4 ч.', userInput: '' },
            { id: 7, title: 'Задание 6', question: 'Вычислите:\n2[1/4] : ([7/9] − [2/9]) + 3 ⋅ 1[2/3]', correctAnswer: '181/20', explanation: '1) [9/4] : [5/9] = [81/20]. 2) 3 ⋅ [5/3] = 5. 3) [81/20] + 5 = [181/20]', userInput: '' },
            { id: 8, title: 'Задание 7', question: 'В доме 540 квартир. В каждом подъезде количество квартир одинаковое. Сколько подъездов, если в каждом от 80 до 120 квартир?', correctAnswer: '6', explanation: '540 : 6 = 90 (подходит). Также возможно 5 подъездов.', userInput: '' },
            { id: 9, title: 'Задание 8', question: 'В трёх ящиках лежат груши. В первом в 3 раза меньше, чем в двух остальных вместе, во втором — 60% от третьего, а в третьем — 90 штук. Сколько всего груш?', correctAnswer: '192', explanation: '1) 3-й: 90. 2) 2-й: 54. 3) 1-й: (90+54)/3 = 48. 4) Всего: 192.', userInput: '' },
            { id: 10, title: 'Задание 9', question: 'В задуманном двузначном числе цифра десятков в 3 раза меньше цифры единиц. Если их поменять местами, число увеличится на 36. Найдите это число.', correctAnswer: '26', explanation: 'Число 26: 2 в 3 раза меньше 6. Перестановка 62 - 26 = 36.', userInput: '' }
        );
    } else {
        tasks.push(
            { id: 11, title: 'Задание 1.1', question: 'Вычислите:\n-3 ⋅ (2 − ([5/6] − ([1/3] − [1/2])))', correctAnswer: '-3', explanation: '1) [1/3]-[1/2] = -[1/6]. 2) [5/6]-(-[1/6]) = 1. 3) 2-1 = 1. 4) -3⋅1 = -3.', userInput: '' },
            { id: 12, title: 'Задание 1.2', question: 'Вычислите:\n|[3/4] − ([1/2])²| + [5/8] ⋅ 2²', correctAnswer: '3', explanation: '1) |3/4-1/4| = 1/2. 2) 5/8 ⋅ 4 = 5/2. 3) 1/2 + 5/2 = 3.', userInput: '' },
            { id: 13, title: 'Задание 1.3', question: 'Найдите значение выражения при a = -2:\n[(3a − 4) / 2] − |a² − 1|', correctAnswer: '-8', explanation: '1) 3(-2)-4 = -10. 2) -10/2 = -5. 3) |4-1| = 3. 4) -5-3 = -8.', userInput: '' },
            { id: 14, title: 'Задание 2.1', question: 'Решите уравнение:\n[(2x − 1) / 3] + [(x + 2) / 6] = [2 / 3]', correctAnswer: '0,8', explanation: 'Умножим на 6: 2(2x-1) + x+2 = 4 ⇒ 5x=4 ⇒ x=0,8.', userInput: '' },
            { id: 15, title: 'Задание 2.2', question: 'Решите уравнение: |2x − 5| = 3. Запишите СУММУ всех корней.', correctAnswer: '5', explanation: '2x-5=3 ⇒ x=4. 2x-5=-3 ⇒ x=1. Сумма: 5.', userInput: '' },
            { id: 16, title: 'Задание 2.3', question: 'При каких "a" уравнение |x − a| = -5 НЕ ИМЕЕТ решений? (Ответ: при любых / никогда)', correctAnswer: 'при любых', explanation: 'Модуль не может быть отрицательным.', userInput: '' },
            { id: 17, title: 'Задание 3.1', question: 'Один насос — 12ч, второй — 18ч. Утечка теряет 10% воды, налитой за этот час. За сколько часов бассейн наполнится?', correctAnswer: '8', explanation: 'Скорость: (1/12+1/18)⋅0.9 = 1/8. Время: 8ч.', userInput: '' },
            { id: 18, title: 'Задание 3.2', question: 'Катер прошёл 30 км по течению и 18 км против за 4 часа. Vтеч = 2 км/ч. Найдите Vсоб.', correctAnswer: '13', explanation: '30/(v+2) + 18/(v-2) = 4 ⇒ v=13.', userInput: '' },
            { id: 19, title: 'Задание 4.1', question: 'Наименьшее натуральное число: при делении на 6 ост. 1, на 7 — ост. 2, на 8 — ост. 3.', correctAnswer: '163', explanation: 'n+5 делится на 6,7,8. НОК(6,7,8)=168. 168-5=163.', userInput: '' },
            { id: 20, title: 'Задание 4.2', question: 'Ребус: АБ + БА = 99. Сколько существует пар РАЗЛИЧНЫХ цифр (А, Б)?', correctAnswer: '8', explanation: 'A+B=9. Пары: (1,8)...(8,1). Всего 8.', userInput: '' }
        );
    }
    return tasks;
};

const Header: React.FC<{ difficulty?: Difficulty }> = ({ difficulty }) => (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <span className="bg-blue-600 text-white p-1 rounded-lg px-2">МЦКО</span>
                <span className="hidden sm:inline">МАТЕМАТИКА 6 КЛАСС</span>
                <span className="sm:hidden">6 КЛ</span>
            </h1>
            {difficulty && (
                <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                    difficulty === 'HARD' ? 'text-purple-600 border-purple-200 bg-purple-50' : 'text-blue-600 border-blue-200 bg-blue-50'
                }`}>
                    {difficulty === 'HARD' ? 'Профи' : 'Стандарт'}
                </div>
            )}
        </div>
    </header>
);

const App: React.FC = () => {
    const [view, setView] = useState<'START' | 'PRACTICE' | 'RESULTS'>('START');
    const [difficulty, setDifficulty] = useState<Difficulty>('STANDARD');
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleStart = (level: Difficulty) => {
        setDifficulty(level);
        setTasks(generateTasks(level));
        setView('PRACTICE');
        window.scrollTo(0, 0);
    };

    const handleInput = (id: number, val: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, userInput: val } : t));
    };

    const handleCheck = () => {
        const results = tasks.map(t => {
            const norm = (s: string) => s.trim().toLowerCase().replace(',', '.').replace(/\s/g, '');
            let isCorrect = norm(t.userInput) === norm(t.correctAnswer);
            if (t.id === 8) isCorrect = ['5', '6', '5 или 6', '6 или 5'].includes(t.userInput.trim());
            if (t.id === 16) isCorrect = norm(t.userInput).includes('прилюбых');
            return { ...t, isCorrect };
        });
        setTasks(results);
        setView('RESULTS');
        window.scrollTo(0, 0);
    };

    if (view === 'START') {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header />
                <div className="flex flex-col items-center justify-center p-6 min-h-[80vh]">
                    <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-xl w-full text-center border border-slate-50 animate-fadeIn">
                        <div className="mb-8 flex justify-center">
                            <div className="p-6 bg-blue-50 rounded-3xl text-blue-600 shadow-inner">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Подготовка к диагностике</h2>
                        <p className="text-slate-500 mb-10 text-lg leading-relaxed font-medium">Выберите уровень сложности, чтобы начать тренировку.</p>
                        <div className="grid grid-cols-1 gap-4">
                            <button onClick={() => handleStart('STANDARD')} className="group flex items-center justify-between p-6 border-2 border-blue-600 rounded-3xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <span className="text-xl font-bold">Стандартный уровень</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <button onClick={() => handleStart('HARD')} className="group flex items-center justify-between p-6 border-2 border-purple-600 rounded-3xl hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <span className="text-xl font-bold">Повышенный уровень</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'PRACTICE') {
        return (
            <div className="min-h-screen bg-slate-50 pb-20">
                <Header difficulty={difficulty} />
                <div className="max-w-3xl mx-auto py-10 px-6">
                    {tasks.map((t, idx) => (
                        <div key={t.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 mb-8 animate-fadeIn" style={{ animationDelay: `${idx * 0.05}s` }}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-slate-100 text-slate-400 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest">{t.title}</span>
                            </div>
                            <div className="text-xl text-slate-700 font-semibold mb-8 leading-relaxed">
                                <MathText text={t.question} />
                            </div>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={t.userInput}
                                    onChange={(e) => handleInput(t.id, e.target.value)}
                                    placeholder="Введите ответ..."
                                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 text-lg"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="mt-12 flex justify-center sticky bottom-6 z-20">
                        <button onClick={handleCheck} className="bg-slate-900 hover:bg-black text-white font-black py-5 px-20 rounded-3xl shadow-2xl transition-all transform hover:-translate-y-1">
                            Проверить ответы
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const correctCount = tasks.filter(t => t.isCorrect).length;
    const score = Math.round((correctCount / tasks.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Header difficulty={difficulty} />
            <div className="max-w-3xl mx-auto py-10 px-6">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-xl text-center mb-12 border border-slate-50 animate-fadeIn relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-2 ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                    <div className={`text-7xl font-black mb-4 ${score >= 80 ? 'text-green-500' : score >= 50 ? 'text-blue-600' : 'text-red-500'}`}>{score}%</div>
                    <p className="text-slate-500 text-xl mb-10">Решено верно {correctCount} из {tasks.length} задач</p>
                    <button onClick={() => setView('START')} className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-12 rounded-2xl transition-all shadow-lg">На главную</button>
                </div>

                {tasks.map(t => (
                    <div key={t.id} className={`p-8 rounded-[3rem] border-2 mb-8 bg-white transition-all ${t.isCorrect ? 'border-green-100 shadow-green-50' : 'border-red-100 shadow-red-50'} shadow-sm`}>
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.title}</span>
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${t.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {t.isCorrect ? 'Верно' : 'Ошибка'}
                            </span>
                        </div>
                        <div className="mb-8 text-xl font-bold text-slate-800 leading-relaxed">
                            <MathText text={t.question} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="text-[10px] text-slate-400 font-black uppercase mb-1">Ваш ответ</div>
                                <div className={`text-xl font-black ${t.isCorrect ? 'text-green-600' : 'text-red-600'}`}>{t.userInput || 'пусто'}</div>
                            </div>
                            {!t.isCorrect && (
                                <div className="p-5 bg-slate-900 rounded-3xl">
                                    <div className="text-[10px] text-slate-400 font-black uppercase mb-1">Правильно</div>
                                    <div className="text-xl font-black text-white"><MathText text={t.correctAnswer.includes('/') ? `[${t.correctAnswer}]` : t.correctAnswer} /></div>
                                </div>
                            )}
                        </div>
                        {!t.isCorrect && (
                            <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 text-slate-700 text-sm leading-relaxed">
                                <div className="text-xs font-black text-blue-800 uppercase mb-4 flex items-center gap-2">Разбор решения</div>
                                <MathText text={t.explanation} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
