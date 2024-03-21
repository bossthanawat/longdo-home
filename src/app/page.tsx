import raw from "../converted.json";
import dayjs from "dayjs";
import { Suspense, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ToolbarFilter from "./ToolbarFilter";
import Content from "./Content";


async function getData() {
  const result = raw as RawResidential[];
  return result;
}

export default async function Home(context: any) {
  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import("./Map"), {
  //       loading: () => <p>A map is loading</p>,
  //       ssr: false,
  //     }),
  //   []
  // );
  const data = await getData();
  const result = data?.filter(
    (item) =>
      item.province_id === "3781" &&
      dayjs(item.date_created).year() > 2020 &&
      item?.price_min &&
      item?.price_min > 0
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="container mt-7">
        <Content raw={result.slice(0, 1000)}/>
      </main>
    </Suspense>
  );
}
