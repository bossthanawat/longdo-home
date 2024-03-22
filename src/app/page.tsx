import raw from "../../raw/converted.json";
import dayjs from "dayjs";
import { Suspense, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ToolbarFilter from "./ToolbarFilter";
import Content from "./Content";
import prisma from "@/lib/prisma";

export default async function Home(context: any) {
  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import("./Map"), {
  //       loading: () => <p>A map is loading</p>,
  //       ssr: false,
  //     }),
  //   []
  // );
  // const data = await getData();
  // const result = data?.filter(
  //   (item) =>
  //     item.province_id === "3781" &&
  //     dayjs(item.date_created).year() > 2020 &&
  //     item?.price_min &&
  //     +item?.price_min > 0
  // );
  const residental = await prisma.residental.findMany({
    where: {
      province_id: "3781",
      date_created: {
        gt: new Date("2020-01-01")
      },
      price_min: {
        gt: 0,
      }
    },
    include: {
      property_type: true,
      province: true
    },
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="container mt-7">
        {/* <ToolbarFilter />
        <div className="w-full h-[500px] mt-6">
          <Map
            listMarker={result.map((e) => ({
              id: e.row_number,
              position: [e.latitude, e.longitude],
              price: e.price_min || 0,
            }))}
          />
        </div> */}
        <Content data={residental as any}/>
      </main>
    </Suspense>
  );
}
