import { fetchPublicPower } from "@/lib/energy-api";
import { PublicPowerData } from "@/types/energy";

import PowerMixChart from "./PowerMixChart";

interface PowerMixChartWrapperProps {
  startDate: Date;
  endDate: Date;
}

export default async function PowerMixChartWrapper({
  startDate,
  endDate,
}: PowerMixChartWrapperProps): Promise<React.JSX.Element> {
  const data: PublicPowerData = await fetchPublicPower(startDate, endDate);
  return <PowerMixChart data={data} />;
}
