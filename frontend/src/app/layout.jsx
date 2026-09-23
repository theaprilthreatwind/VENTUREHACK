import { ThemeProvider } from "@/features/theme";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata = {
  title: "ЕНТdigit — Подготовка к ЕНТ",
  description:
    "Платформа для подготовки к ЕНТ в Казахстане: практика, банк вопросов и персональный план подготовки.",
};

const THEME_BOOTSTRAP = `
try {
  var prefs = JSON.parse(localStorage.getItem("entuz_prefs") || "{}");
  if (prefs.theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}