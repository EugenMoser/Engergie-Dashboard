import { EXCLUDED_PRODUCTION_TYPES } from "@/lib/utils";

interface PowerKpiCardProps {
  startDate: Date;
  endDate: Date;
}
import { fetchPublicPower } from "@/lib/energy-api";
import KpiCard from "../KpiCard";
export default async function PowerKpiCard({
  startDate,
  endDate,
}: PowerKpiCardProps): Promise<React.JSX.Element> {
  const data = await fetchPublicPower(startDate, endDate);

  // Get last data point for each metric
  const currentPower = data.production_types
    .filter((type) => !EXCLUDED_PRODUCTION_TYPES.has(type.name))
    .reduce(
      (sum, type) => sum + (type.data[data.unix_seconds.length - 1] ?? 0),
      0,
    )
    .toFixed(0); // Round to nearest whole number

  return (
    <KpiCard
      title="Gesamteinspeisung"
      value={currentPower}
      unit="MW"
    />
  );
}
