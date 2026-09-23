"use client";

import TeX from "@matejmazur/react-katex";

const MATH_PATTERN = /\$([^$]+)\$/g;

/**
 * Рендерит текст, подставляя формулы KaTeX. Инлайновая математика в данных
 * обёрнута в `$...$`, например `$\frac{3}{5}$` или `$t = 4$`.
 *
 * @param {{ text?: string, className?: string }} props
 */
export function MathText({ text, className }) {
  if (!text) return null;

  const nodes = [];
  const pattern = new RegExp(MATH_PATTERN.source, "g");
  let lastIndex = 0;
  let match = pattern.exec(text);

  while (match !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(<TeX key={`math-${match.index}`} math={match[1]} errorColor="#dc2626" />);
    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <span className={className}>{nodes}</span>;
}
