import { NextRequest, NextResponse } from "next/server";

import { fetchPrice } from "@/lib/energy-api";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  if (!startParam) {
    return NextResponse.json(
      { error: "Missing 'start' query parameter" },
      {
        status: 400,
      },
    );
  }

  if (!endParam) {
    return NextResponse.json(
      { error: "Missing 'end' query parameter" },
      {
        status: 400,
      },
    );
  }
  const data = await fetchPrice(new Date(startParam), new Date(endParam));
  return NextResponse.json(data);
}
