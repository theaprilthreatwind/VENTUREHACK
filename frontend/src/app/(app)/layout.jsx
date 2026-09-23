import { Header } from "@/widgets/header";
import { HelpButton } from "@/widgets/help-button";
import { Sidebar } from "@/widgets/sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen dark:bg-slate-950 lg:pl-72">
      <Sidebar />
      <div className="flex min-h-screen flex-col pl-9 lg:pl-0">
        <Header />
        <main className="flex-1 px-4 pb-12 sm:px-6 lg:px-12 lg:pb-16">{children}</main>
      </div>

      <HelpButton />
    </div>
  );
}
