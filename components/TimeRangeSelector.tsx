"use client";

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import {
  DashboardTimeRange,
  TIME_RANGES,
} from '@/types/energy';

export default function TimeRangeSelector(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRange = searchParams.get("range") ?? "24h";

  function handleRangeChange(range: DashboardTimeRange): void {
    router.replace(`?range=${range}`);
  }

  function formatRangeLabel(range: DashboardTimeRange): string {
    const value = parseInt(range.slice(0, -1));

    // Format the label based on the time unit
    // The fuction can expand to support more time units in the future
    switch (range) {
      case "24h":
        return "24 Stunden";
      case "7d":
        return "7 Tage";
      case "30d":
        return "30 Tage";
      default:
        return "";
    }
  }
  return (
    <>
      {TIME_RANGES.map((range) => (
        <button
          key={range}
          onClick={() => handleRangeChange(range)}
          className={`px-4 py-2 m-4 rounded hover:bg-blue-600 hover:text-white ${currentRange === range ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} cursor-pointer`}
        >
          {formatRangeLabel(range)}
        </button>
      ))}
    </>
  );
}
