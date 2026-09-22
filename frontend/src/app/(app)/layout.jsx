import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen lg:pl-72">
      <Sidebar />
      <div className="flex min-h-screen flex-col pl-9 lg:pl-0">
        <Header />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
