import KpiCard from "@/components/KpiCard";

export default function Home() {
  const title = "Total Energy Consumption";
  const value = 12345;
  const unit = "MWh";
  const trend = "up";
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <KpiCard
        title={title}
        value={value}
        unit={unit}
        trend={trend}
      />
    </main>
  );
}
