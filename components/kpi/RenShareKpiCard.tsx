import { fetchRenShare } from "@/lib/energy-api";
import KpiCard from "../KpiCard";
export default async function RenShareKpiCard(): Promise<React.JSX.Element> {
  const data = await fetchRenShare();

  // Get last data point for each metric
  const currentRenShare = data.ren_share[data.ren_share.length - 1];

  return (
    <KpiCard
      title="Erneuerbare Energieanteil"
      value={currentRenShare}
      unit={"%"}
    />
  );
}
