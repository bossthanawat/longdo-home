import { NextResponse } from "next/server";
// import raw from "../../../../../raw/opendata_train_station.json";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const raw = require("../../../../../raw/opendata_train_station.json");
    const createdItems = await prisma.cityTrainStation.createMany({
      data: raw.map((item: any) => ({
        gid: item.gid,
        latitude: item.latitude,
        longitude: item.longitude,
        line_en: item.line_en,
        line_no: item.line_no,
        line_th: item.line_th,
        line_type: item.line_type,
        line_typt: item.line_typt,
        railway: item.railway,
        station_en: item.station_en,
        station_th: item.station_th,
        status: item.status,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
