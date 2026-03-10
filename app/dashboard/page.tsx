import KpiCard from "@/components/KpiCard";
import {
  fetchPrice,
  fetchPublicPower,
  fetchRenShare,
} from "@/lib/energy-api";
import { getDateRange } from "@/lib/utils";

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const { start, end } = getDateRange("24h");

  const [powerData, priceData, renData] = await Promise.all([
    fetchPublicPower(start, end),
    fetchPrice(start, end),
    fetchRenShare(),
  ]);

  // Last data point for each metric
  const currentPower = powerData.production_types
    .reduce(
      (sum, type) =>
        sum + (type.data[powerData.unix_seconds.length - 1] ?? 0),
      0,
    )
    .toFixed(0); // Round to nearest whole number
  const currentPrice = priceData.price[priceData.price.length - 1];
  const currentRenShare = renData.ren_share[renData.ren_share.length - 1];

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          title="Gesamteinspeisung"
          value={currentPower}
          unit="MW"
        />
        <KpiCard
          title="Aktueller Strompreis"
          value={currentPrice}
          unit={priceData.unit}
        />
        <KpiCard
          title="Erneuerbare Energieanteil"
          value={currentRenShare}
          unit="%"
        />
      </div>
    </main>
  );
}
