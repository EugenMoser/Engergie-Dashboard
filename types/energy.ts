export interface ProductionType {
  name: string;
  data: number[];
}

export interface PublicPowerData {
  unix_seconds: number[];
  production_types: ProductionType[];
  deprecated: boolean;
}

export interface PriceData {
  license_info: string;
  unix_seconds: number[];
  price: number[];
  unit: string;
  deprecated: boolean;
}

export interface RenShareForecastData {
  unix_seconds: number[];
  ren_share: number[];
  solar_share: number[];
  wind_onshore_share: number[];
  wind_offshore_share: number[];
  substitute: boolean;
  deprecated: boolean;
}

export const TIME_RANGES = ["24h", "7d", "30d"] as const;
export type DashboardTimeRange = (typeof TIME_RANGES)[number];
