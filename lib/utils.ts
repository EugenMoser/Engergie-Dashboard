export const ENERGY_COLORS: Record<string, string> = {
  Solar: "#f59e0b",
  "Wind onshore": "#3b82f6",
  "Wind offshore": "#1d4ed8",
  Biomass: "#22c55e",
  Hydro: "#06b6d4",
  Nuclear: "#a855f7",
  "Hard coal": "#6b7280",
  "Brown coal": "#78350f",
  Gas: "#f97316",
  Other: "#94a3b8",
};

export function getEnergyColor(name: string): string {
  return ENERGY_COLORS[name] ?? "#94a3b8";
}

export function getDateRange(range: "24h" | "7d" | "30d"): {
  start: Date;
  end: Date;
} {
  const now = new Date();
  let start: Date;

  switch (range) {
    case "24h":
      start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case "7d":
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "30d":
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      throw new Error("Invalid range");
  }

  return { start, end: now };
}
