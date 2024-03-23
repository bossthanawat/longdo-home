import { Suspense, useMemo, useState } from "react";
import Content from "./Content";
import prisma from "@/lib/prisma";

export default async function Home(context: any) {
  // const residental = await prisma.residental.findMany({
  //   where: {
  //     province_id: "3781",
  //     date_created: {
  //       gt: new Date("2020-01-01")
  //     },
  //     price_min: {
  //       gt: 0,
  //     }
  //   },
  //   include: {
  //     property_type: true,
  //     province: true
  //   },
  // });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="container mt-7">
        <Content data={[]}/>
      </main>
    </Suspense>
  );
}
