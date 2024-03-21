import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import raw from "../../../../raw/converted.json";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const result = raw as RawResidential[];

  try {
    const createdItems = await prisma.residental.createMany({
      data: result.map((item) => ({
        row_number: item.row_number,
        project_id: item.project_id || "",
        name_en: item.name_en || "",
        name_th: item.name_th || "",
        propertyTypeId: item.propertytype_id,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
