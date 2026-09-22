import "./globals.css";

export const metadata = {
  title: "DSATUZ — Создать сессию",
  description: "Персонализированные тренировочные сессии для подготовки к ЕНТ.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
