import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: "ENTUZ /KZ — Подготовка к ЕНТ",
  description:
    "Платформа для подготовки к ЕНТ в Казахстане: практика, банк вопросов и персональный план подготовки.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full">
        <div className="min-h-screen lg:pl-72">
          <Sidebar />
          <div className="flex min-h-screen flex-col pl-9 lg:pl-0">
            <Header />
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}