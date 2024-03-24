import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const minPrice = searchParams.get("priceMin") || 0;
  const maxPrice = searchParams.get("priceMax");
  const formDateCreate = searchParams.get("formDateCreate");
  const toDateCreate = searchParams.get("toDateCreate") || new Date();
  const provinceIds = searchParams.get("provinceIds") || "";
  const propertyTypeIds = searchParams.get("propertyTypeIds") || "";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const scaleLatLng = Number(searchParams.get("scaleLatLng")) || 0.03;
  try {
    const residental = await prisma.residental.findMany({
      where: {
        ...(provinceIds && {
          province_id: {
            in: provinceIds.split(","),
          },
        }),
        date_created: {
          ...(formDateCreate && { gte: new Date(formDateCreate) }),
          ...(toDateCreate && { lte: new Date(toDateCreate) }),
        },
        price_min: {
          gte: +minPrice,
          ...(maxPrice && { lte: +maxPrice }),
        },
        ...(propertyTypeIds && {
          property_type_id: {
            in: propertyTypeIds.split(","),
          },
        }),
        ...(lat &&
          lng && {
            latitude: {
              gt: +lat - scaleLatLng,
              lt: +lat + scaleLatLng,
            },
            longitude: {
              gt: +lng - scaleLatLng,
              lt: +lng + scaleLatLng,
            },
          }),
      },
      include: {
        property_type: true,
        province: true,
      },
      take: 3000,
    });
    return NextResponse.json(residental, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
