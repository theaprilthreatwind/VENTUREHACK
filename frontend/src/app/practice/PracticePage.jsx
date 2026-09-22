'use client';

import { useState, useEffect } from 'react';

function IconHome() {
  return (
    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconPractice() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconBulb() {
  return (
    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconFire() {
  return (
    <svg className="w-4 h-4 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function IconCollapse() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect height="18" rx="2" width="18" x="3" y="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3v18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m16 15-3-3 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Fraction({ numerator, denominator }) {
  return (
    <span className="fraction">
      <span className="numerator" dangerouslySetInnerHTML={{ __html: numerator }} />
      <span className="denominator" dangerouslySetInnerHTML={{ __html: denominator }} />
    </span>
  );
}

function AnswerOption({ label, value, selected, correct, checked, onClick }) {
  let borderClass = 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-400';
  let labelClass = 'border-2 border-slate-900 text-slate-900';

  if (selected && !checked) {
    borderClass = 'border-slate-900 bg-slate-50 shadow-md';
    labelClass = 'border-2 border-slate-900 bg-slate-900 text-white';
  }
  if (checked && selected && correct) {
    borderClass = 'border-emerald-500 bg-emerald-50';
    labelClass = 'border-2 border-emerald-600 bg-emerald-600 text-white';
  }
  if (checked && selected && !correct) {
    borderClass = 'border-red-400 bg-red-50';
    labelClass = 'border-2 border-red-500 bg-red-500 text-white';
  }
  if (checked && !selected && correct) {
    borderClass = 'border-emerald-400 bg-emerald-50/60';
    labelClass = 'border-2 border-emerald-500 text-emerald-700';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={checked}
      className={"flex items-center gap-4 w-full p-4 rounded-xl border transition-all text-left group shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-900/10 " + borderClass}
    >
      <span className={"w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all " + labelClass}>
        {label}
      </span>
      <span className="text-base font-medium text-slate-900">{value}</span>
    </button>
  );
}

function Sidebar({ collapsed, onCollapse }) {
  if (collapsed) return null;
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30 overflow-y-auto">
      <div className="p-5 pb-2">
        <div className="flex items-center justify-between mb-8 px-1">
          <span className="text-xl font-black italic tracking-tight text-slate-900">DSATUZ</span>
          <button aria-label="Collapse" onClick={onCollapse} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100" type="button">
            <IconCollapse />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3">МЕНЮ</span>
            <nav className="mt-2 space-y-1">
              <a className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm" href="#"><IconHome /><span>Главная</span></a>
              <a className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold bg-[#111827] text-white shadow-sm text-sm" href="#"><IconPractice /><span>Практика</span></a>
              <a className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm" href="#">
                <div className="flex items-center gap-3"><IconBook /><span>Банк вопросов</span></div>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">Бесплатно</span>
              </a>
              <a className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm" href="#">
                <div className="flex items-center gap-3"><IconBulb /><span>План подготовки</span></div>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">AI</span>
              </a>
            </nav>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2"><IconFire /><span className="text-xs font-bold text-slate-800">Ежедневная серия</span></div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide">АКТИВНО</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
              <span>1 день</span><span className="text-slate-400 font-normal">→ 3</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2.5 overflow-hidden">
              <div className="bg-slate-900 h-1.5 rounded-full w-1/3" />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mb-3.5">
              <span className="flex items-center gap-1 font-medium text-slate-700">Активен сегодня <span className="text-emerald-600">✓</span></span>
              <span>Еще 2 дня</span>
            </div>
            <button className="w-full py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors shadow-sm">Перейти на Pro</button>
          </div>
        </div>
      </div>
      <div className="p-5 pt-0 space-y-1">
        <a className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" href="#"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 21v-6M12 21V9M19 21V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg><span>Аналитика успеваемости</span></a>
        <a className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" href="#"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><circle cx="12" cy="12" r="4" strokeWidth="2" /></svg><span>Поддержка</span></a>
        <a className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" href="#"><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg><span>Настройки</span></a>
      </div>
    </aside>
  );
}

const TOTAL_QUESTIONS = 112;
const CORRECT_ANSWER = 'B';

export default function PracticePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [seconds, setSeconds] = useState(9);
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => {
    const h = String(Math.floor(t / 3600)).padStart(2, '0');
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    return h + ':' + m + ':' + s;
  };

  const handleCheck = () => { if (selected) setChecked(true); };
  const handleNext = () => { setSelected(null); setChecked(false); setMarked(false); };

  const options = [
    { label: 'A', value: '3' },
    { label: 'B', value: '7' },
    { label: 'C', value: '8' },
    { label: 'D', value: '12' },
  ];

  const mathStyles = `
    .math-font { font-family: 'STIX Two Math', serif; }
    .fraction { display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center; padding: 0 4px; line-height: 1.1; }
    .fraction .numerator { border-bottom: 1.8px solid #0f172a; padding-bottom: 2px; display: block; }
    .fraction .denominator { padding-top: 2px; display: block; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: mathStyles }} />

      <div className="min-h-screen flex antialiased bg-[#F8FAFC] text-slate-800" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Sidebar collapsed={sidebarCollapsed} onCollapse={() => setSidebarCollapsed(true)} />
        {sidebarCollapsed && (
          <button onClick={() => setSidebarCollapsed(false)} className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-white border border-slate-200 shadow-md rounded-r-xl px-2 py-4 text-slate-500 hover:text-slate-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
          </button>
        )}

        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Header */}
          <header className="w-full bg-white border-b border-slate-200 px-6 py-3.5 shadow-sm sticky top-0 z-30">
            <div className="max-w-[1520px] mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-colors" type="button">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  <span>Пояснение</span>
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-colors" type="button">
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  <span>Метаданные</span>
                </button>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-base font-semibold text-slate-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                <span>{formatTime(seconds)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-colors" type="button">
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  <span>Справочник формул</span>
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-colors" type="button">
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  <span>Калькулятор</span>
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors" type="button">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  <span>Поделиться</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 max-w-[1240px] w-full mx-auto px-6 py-8">
            <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12">
              {/* Question bar */}
              <div className="flex items-center rounded-xl border border-slate-900 overflow-hidden bg-white mb-10">
                <div className="bg-black text-white font-bold px-4 py-2.5 text-base flex items-center justify-center min-w-[48px]">1</div>
                <div className="flex items-center divide-x divide-slate-200 text-sm font-medium text-slate-800 flex-1 justify-between">
                  <button className={"flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors justify-center " + (marked ? 'text-amber-600' : '')} type="button" onClick={() => setMarked(m => !m)}>
                    <svg className={"w-4 h-4 transition-colors " + (marked ? 'text-amber-500' : 'text-slate-700')} fill={marked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    <span>Отметить для проверки</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 transition-colors text-slate-700 justify-center" type="button">
                    <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="2" /><line strokeWidth="2" x1="5.6" x2="18.4" y1="5.6" y2="18.4" /></svg>
                    <span>Исключить вариант</span>
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50/60">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    <span>Попытки</span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-xs font-semibold ml-0.5">{checked ? 2 : 1}</span>
                  </div>
                </div>
              </div>

              {/* Question body */}
              <section className="space-y-7">
                <div className="math-font text-2xl md:text-3xl text-slate-900 tracking-wide select-text py-2 flex items-center flex-wrap gap-2">
                  <Fraction numerator="12<em>x</em> + 28" denominator="4" />
                  <span className="mx-1">−</span>
                  <Fraction numerator="<em>s</em>" denominator="13" />
                  <span className="mx-1">=</span>
                  <span><em>r</em>(<em>x</em> − 8)</span>
                </div>
                <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-normal">
                  В данном уравнении <span className="math-font italic text-xl">s</span> и <span className="math-font italic text-xl">r</span> являются постоянными (константами), причем <span className="math-font italic text-xl">s</span> &gt; 0. Если уравнение имеет бесконечно много решений, чему равно значение <span className="math-font italic text-xl">s</span>?
                </p>
                <div className="pt-6 flex flex-col gap-3">
                  {options.map((opt) => (
                    <AnswerOption key={opt.label} label={opt.label} value={opt.value} selected={selected === opt.label} correct={opt.label === CORRECT_ANSWER} checked={checked} onClick={() => !checked && setSelected(opt.label)} />
                  ))}
                </div>
                {checked && (
                  <div className={"mt-4 p-4 rounded-xl border text-sm font-medium " + (selected === CORRECT_ANSWER ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800')}>
                    {selected === CORRECT_ANSWER ? '✓ Правильно! Ответ: B (s = 7).' : '✗ Неверно. Правильный ответ: B (s = 7).'}
                  </div>
                )}
              </section>
            </div>
          </main>

          {/* Footer */}
          <footer className="w-full bg-white border-t border-slate-200 py-3.5 px-6 sticky bottom-0 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
            <div className="max-w-[1520px] mx-auto flex items-center justify-between">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm bg-white hover:bg-slate-50 transition-all shadow-sm" type="button">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
                <span>Назад</span>
              </button>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-700 text-xs font-medium">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
                  <span>Прогресс: 0 из {TOTAL_QUESTIONS} вопросов проверено</span>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-2 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-all shadow-sm" type="button">
                  <span>Вопрос 1 из {TOTAL_QUESTIONS}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleCheck} disabled={!selected || checked} className={"inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm " + (!selected || checked ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-500 hover:bg-slate-600 text-white')} type="button">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
                  <span>Проверить</span>
                </button>
                <button onClick={handleNext} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-sm transition-all shadow-sm" type="button">
                  <span>Далее</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
