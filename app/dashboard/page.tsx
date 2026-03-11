import { Suspense } from 'react';

import PowerKpiCard from '@/components/kpi/PowerKpiCard';
import PriceKpiCard from '@/components/kpi/PriceKpiCard';
import RenShareKpiCard from '@/components/kpi/RenShareKpiCard';
import PowerMixChartWrapper from '@/components/PowerMixChartWrapper';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import { getDateRange } from '@/lib/utils';
import { DashboardTimeRange } from '@/types/energy';

interface DashboardPageProps {
  searchParams?: Promise<{ range?: DashboardTimeRange }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps): Promise<React.JSX.Element> {
  const params = (await searchParams) ?? {};
  const { range } = params;
  const { start, end } = getDateRange(range ? range : "24h");

  return (
    <main>
      <h1 className="text-4xl font-bold  m-4">Energie Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <Suspense fallback={<div className="m-4">Lade Daten...</div>}>
          <PowerKpiCard
            startDate={start}
            endDate={end}
          />
        </Suspense>
        <Suspense fallback={<div className="m-4">Lade Daten...</div>}>
          <PriceKpiCard
            startDate={start}
            endDate={end}
          />
        </Suspense>
        <Suspense fallback={<div className="m-4">Lade Daten...</div>}>
          <RenShareKpiCard />
        </Suspense>
      </div>
      <Suspense fallback={<div>...</div>}>
        <TimeRangeSelector />
      </Suspense>
      <div className="m-8">
        <Suspense fallback={<div className="m-4">Lade Daten...</div>}>
          <PowerMixChartWrapper
            startDate={start}
            endDate={end}
          />
        </Suspense>
      </div>
    </main>
  );
}
