import {
  PriceData,
  PublicPowerData,
  RenShareForecastData,
} from "@/types/energy";

import { BASE_URL } from "../constants/urls";

export async function fetchPublicPower(
  start: Date,
  end: Date,
): Promise<PublicPowerData> {
  const startUnix: string = Math.floor(start.getTime() / 1000).toString();
  const endUnix: string = Math.floor(end.getTime() / 1000).toString();
  const url = `${BASE_URL}/public_power?country=de&start=${startUnix}&end=${endUnix}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: PublicPowerData = await response.json();
  return data;
}

export async function fetchPrice(
  start: Date,
  end: Date,
): Promise<PriceData> {
  const startUnix: string = Math.floor(start.getTime() / 1000).toString();
  const endUnix: string = Math.floor(end.getTime() / 1000).toString();
  const url = `${BASE_URL}/price?bzn=DE-LU&start=${startUnix}&end=${endUnix}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: PriceData = await response.json();
  return data;
}

export async function fetchRenShare(): Promise<RenShareForecastData> {
  const url = `${BASE_URL}/ren_share_forecast?country=de`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: RenShareForecastData = await response.json();
  return data;
}
