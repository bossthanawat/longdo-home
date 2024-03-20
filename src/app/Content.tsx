"use client";

import dayjs from "dayjs";
import ToolbarFilter from "./ToolbarFilter";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

type ContentProps = {
  raw: RawResidential[];
};
const Content = (props: ContentProps) => {
  const { raw } = props;
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const minYear = Number(searchParams.get("minYear") || 2020);
  const maxYear = Number(searchParams.get("maxYear") || dayjs().year());
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const result = useMemo(() => raw?.filter(
    (item) =>
      item.province_id === "3781" &&
      item?.price_min &&
      item?.price_min > Number(price || 0) &&
      dayjs(item.date_created).year() > +minYear &&
      dayjs(item.date_created).year() < +maxYear
  ), [maxYear, minYear, price, raw])

  return (
    <>
      <ToolbarFilter />
      <div className="w-full h-[500px] mt-6">
        <Map
          listMarker={result.map((e) => ({
            id: e.row_number,
            position: [e.latitude, e.longitude],
            price: e.price_min || 0,
          }))}
        />
      </div>
    </>
  );
};

export default Content;
