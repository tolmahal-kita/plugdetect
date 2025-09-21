import { AppHeader } from "@/components/layout/app-header";
import { DashboardContainer } from "@/components/dashboard/container";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
        <h1 className="text-4xl font-cursive font-bold tracking-tight text-center">
          Welcome to PlugDetect
        </h1>
        <DashboardContainer />
      </main>
    </div>
  );
}
