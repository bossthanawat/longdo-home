"use client";

import dayjs from "dayjs";
import ToolbarFilter from "./ToolbarFilter";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { getResidental } from "./action";

type ContentProps = {
  raw: RawResidential[];
};
const Content = (props: ContentProps) => {
  const { raw } = props;

  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const [state, formAction] = useFormState(getResidental, raw);

  return (
    <>
      <form action={formAction}>
        <ToolbarFilter />
      </form>
      <div className="w-full h-[500px] mt-6">
        <div className="flex justify-end">
          <span className="text-end text-sm text-gray-500">
            show max 1,000 record
          </span>
        </div>
        {/* <Map
            listMarker={state.map((e) => ({
              id: e.row_number,
              position: [e.latitude, e.longitude],
              price: e.price_min || 0,
            }))}
          /> */}
      </div>
    </>
  );
};

export default Content;
