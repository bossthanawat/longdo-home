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
  const provinceIds = searchParams.getAll("provinceIds[]") || [];
  const propertyTypeIds = searchParams.getAll("propertyTypeIds[]") || [];
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const scaleBounds = Number(searchParams.get("scaleBounds")) || 0.03;
  try {
    const residental = await prisma.residental.findMany({
      where: {
        ...(provinceIds.length && {
          province_id: {
            in: provinceIds,
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
        ...(propertyTypeIds.length && {
          propertytype_id: {
            in: propertyTypeIds,
          },
        }),
        ...(lat &&
          lng && {
            latitude: {
              gt: +lat - scaleBounds,
              lt: +lat + scaleBounds,
            },
            longitude: {
              gt: +lng - scaleBounds,
              lt: +lng + scaleBounds,
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
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
