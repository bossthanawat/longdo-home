import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import raw from "../../../../../raw/converted.json";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export async function GET(request: Request) {
  const result = raw as RawResidential[];

  try {
    const createdItems = await prisma.residental.createMany({
      data: result.filter((item)=>(["1","2","3","20000"].includes(item.propertytype_id))).map((item) => ({
        row_number: item.row_number,
        project_id: item.project_id || "",
        name_en: item.name_en || "",
        name_th: item.name_th || "",
        propertytype_id: item.propertytype_id,
        price_min: +item.price_min || 0,
        developer_id: item.developer_id,
        developer_name_en: item.developer_name_en,
        developer_name_th: item.developer_name_th,
        latitude: +item.latitude,
        longitude: +item.longitude,
        neighborhood_id: item.neighborhood_id,
        subdistrict_id: item.subdistrict_id,
        district_id: item.district_id,
        province_id: item.province_id,
        zipcode: item.zipcode,
        count_elevator: Number(item.count_elevator),
        count_elevator_service: Number(item.count_elevator_service),
        count_floor: Number(item.count_floor),
        count_parking: Number(item.count_parking),
        count_tower:  Number(item.count_tower),
        count_unit: Number(item.count_unit),
        count_unittype: Number(item.count_unittype),
        facility_clubhouse: Number(item.facility_clubhouse),
        facility_fitness: Number(item.facility_fitness),
        facility_meeting: Number(item.facility_meeting),
        facility_park: Number(item.facility_park),
        facility_playground: Number(item.facility_playground),
        facility_pool: Number(item.facility_pool),
        facility_security: Number(item.facility_security),
        date_created: item.date_created ? dayjs(item.date_created).toISOString() : undefined,
        date_finish: item.date_finish ? dayjs(item.date_finish).toISOString() : undefined,
        date_updated: item.date_updated ? dayjs(item.date_updated).toISOString(): undefined,
        url_project: item.url_project,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
