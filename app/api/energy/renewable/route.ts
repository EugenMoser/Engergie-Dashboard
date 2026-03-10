import { NextResponse } from "next/server";

import { fetchRenShare } from "@/lib/energy-api";

export async function GET() {
  const data = await fetchRenShare();
  return NextResponse.json(data);
}
