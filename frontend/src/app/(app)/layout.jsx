import { BookOpen } from "lucide-react";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen lg:pl-72">
      <Sidebar />
      <div className="flex min-h-screen flex-col pl-9 lg:pl-0">
        <Header />
        <main className="flex-1 px-4 pb-12 sm:px-6 lg:px-12 lg:pb-16">{children}</main>
      </div>

      <button
        type="button"
        aria-label="Справочник и материалы"
        className="fixed bottom-7 right-7 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#131926] text-white shadow-xl transition-transform hover:scale-105 hover:bg-slate-800 active:scale-95"
      >
        <BookOpen className="h-5 w-5" />
      </button>
    </div>
  );
}
