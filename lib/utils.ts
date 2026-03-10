import { PublicPowerData } from "@/types/energy";

export const ENERGY_COLORS: Record<string, string> = {
  Solar: "#f59e0b",
  Wind: "#3b82f6",
  Hydro: "#06b6d4",
  Biomasse: "#22c55e",
  Gas: "#f97316",
  Kohle: "#6b7280",
  Sonstiges: "#94a3b8",
};

export function getEnergyColor(name: string): string {
  return ENERGY_COLORS[name] ?? "#94a3b8";
}
export const PRODUCTION_TYPE_GROUP: Record<string, string> = {
  Solar: "Solar",
  "Wind onshore": "Wind",
  "Wind offshore": "Wind",
  "Hydro Run-of-River": "Hydro",
  "Hydro water reservoir": "Hydro",
  "Hydro pumped storage": "Hydro",
  Biomass: "Biomasse",
  "Fossil gas": "Gas",
  "Fossil coal-derived gas": "Gas",
  "Fossil hard coal": "Kohle",
  "Fossil brown coal / lignite": "Kohle",
  Geothermal: "Sonstiges",
  Waste: "Sonstiges",
  "Fossil oil": "Sonstiges",
  Others: "Sonstiges",
  // all other types are categorized as 'Other'
};

export const EXCLUDED_PRODUCTION_TYPES = new Set([
  "Load", // Verbrauch/Nachfragekurve, kein Erzeuger
  "Residual load", // abgeleitete Metrik (Last minus Erneuerbare)
  "Renewable share of load", // Prozentwert, kein MW
  "Renewable share of generation", // Prozentwert, kein MW
  "Cross border electricity trading", // Import/Export, kann negativ sein
  "Hydro pumped storage consumption", // Verbrauch (Pumpen), keine Einspeisung
]);

// Transform-Funktion: PublicPowerData → Recharts-Format
export function groupPowerData(
  data: PublicPowerData,
): Record<string, number | string>[] {
  const groups = [
    "Solar",
    "Wind",
    "Hydro",
    "Biomasse",
    "Gas",
    "Kohle",
    "Sonstiges",
  ];

  return data.unix_seconds.map((ts, index) => {
    const row: Record<string, number | string> = {
      time: new Date(ts * 1000).toISOString(),
    };
    groups.forEach((group) => (row[group] = 0));

    data.production_types
      .filter((type) => !EXCLUDED_PRODUCTION_TYPES.has(type.name))
      .forEach((type) => {
        const group = PRODUCTION_TYPE_GROUP[type.name] ?? "Sonstiges";
        row[group] = (row[group] as number) + (type.data[index] ?? 0);
      });

    return row;
  });
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
