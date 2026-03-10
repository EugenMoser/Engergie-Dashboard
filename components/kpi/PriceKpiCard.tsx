interface PriceKpiCardProps {
  startDate: Date;
  endDate: Date;
}
import { fetchPrice } from "@/lib/energy-api";
import KpiCard from "../KpiCard";
import { PriceData } from "@/types/energy";
export default async function PriceKpiCard({
  startDate,
  endDate,
}: PriceKpiCardProps): Promise<React.JSX.Element> {
  const data: PriceData = await fetchPrice(startDate, endDate);

  // Get last data point for each metric
  const currentPrice = data.price[data.price.length - 1].toFixed(2); // Round to 2 decimal places

  return (
    <KpiCard
      title="Aktueller Strompreis"
      value={currentPrice}
      unit={data.unit}
    />
  );
}
