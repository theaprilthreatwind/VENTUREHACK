import { Atom, Book, BookOpen, Calculator, Terminal } from "lucide-react";

const ICONS = {
  calculator: Calculator,
  "book-open": BookOpen,
  book: Book,
  terminal: Terminal,
  atom: Atom,
};

export function SubjectIcon({ name, ...props }) {
  const Icon = ICONS[name] ?? BookOpen;
  return <Icon {...props} />;
}
