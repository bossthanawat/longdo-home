import { NextResponse } from "next/server";
import raw from "../../../../../raw/province.json";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const result = raw

  try {
    const createdItems = await prisma.province.createMany({
      data: result.map((item) => ({
        row_number: item.row_number.toString(),
        b_prov_id: item.b_prov_id.toString(),
        b_prov_code: item.b_prov_code.toString(),
        b_prov_name_en: item.b_prov_name_en,
        b_prov_name_th: item.b_prov_name_th,
        b_region_code: item.b_region_code.toString(),
        b_region_name_th: item.b_region_namt,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
