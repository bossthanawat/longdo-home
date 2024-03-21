import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
// import raw from "../../../../raw/converted.json";
import dayjs from "dayjs";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const price = searchParams.get("price");
  // const minYear = searchParams.get("minYear") || 2020;
  // const maxYear = searchParams.get("maxYear") || dayjs().year();
  // try {
  //   const data = raw as RawResidential[];
  //   const result = data?.filter(
  //     (item) =>
  //       item.province_id === "3781" &&
  //       item?.price_min &&
  //       item?.price_min > Number(price || 0) &&
  //       dayjs(item.date_created).year() > +minYear &&
  //       dayjs(item.date_created).year() < +maxYear
  //   );
    // return NextResponse.json(result, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ error }, { status: 500 });
  // }
  return NextResponse.json("", { status: 200 });
}
