import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata = {
  title: "ЕНТdigit — Подготовка к ЕНТ",
  description:
    "Платформа для подготовки к ЕНТ в Казахстане: практика, банк вопросов и персональный план подготовки.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}