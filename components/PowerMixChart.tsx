"use client";

import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { fetchPublicPower } from "@/lib/energy-api";
import { ENERGY_COLORS, groupPowerData } from "@/lib/utils";
import { PublicPowerData } from "@/types/energy";

const GROUPS = [
  "Solar",
  "Wind",
  "Hydro",
  "Biomasse",
  "Gas",
  "Kohle",
  "Sonstiges",
];
function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-gray-900 text-gray-100 rounded-lg p-3 shadow-xl text-sm">
      <p className="font-semibold mb-2 text-gray-300">
        {label ? formatTime(label) : ""}
      </p>
      {payload.map((entry) => (
        <div
          key={entry.name}
          className="flex justify-between gap-4"
        >
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="tabular-nums">
            {Math.round(entry.value).toLocaleString("de-DE")} MW
          </span>
        </div>
      ))}
      <p className="border-t border-gray-700 mt-2 pt-2">
        Gesamteinspeisung{" "}
        {Math.round(
          payload.reduce((sum, entry) => sum + entry.value, 0),
        ).toLocaleString("de-DE")}{" "}
        MW
      </p>
    </div>
  );
}
interface PowerMixChartProps {
  data: PublicPowerData;
}
export default function PowerMixChart({
  data,
}: PowerMixChartProps): React.JSX.Element {
  const chartData = groupPowerData(data);

  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <AreaChart data={chartData}>
        <XAxis
          className="mt-2"
          dataKey="time"
          tickMargin={5}
          tickFormatter={(val) =>
            new Date(val).toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
          interval="preserveStartEnd"
        />

        <YAxis
          tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
          unit=" MW"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend className="mt-1" />
        {GROUPS.map((group) => (
          <Area
            key={group}
            dataKey={group}
            stackId="1"
            fill={ENERGY_COLORS[group]}
            stroke={ENERGY_COLORS[group]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
