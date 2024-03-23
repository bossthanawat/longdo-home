"use client";

import dayjs from "dayjs";
import ToolbarFilter from "./ToolbarFilter";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { getResidental } from "./action";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Residental } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ContentProps = {
  data: Residental[];
};
const Content = (props: ContentProps) => {
  const { data: defaultData } = props;

  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  // const form = useForm({
  //   defaultValues: {
  //     price: {
  //       max: 7000000,
  //     },
  //   },
  // });
  // const [state, formAction] = useFormState(getResidental, data);

  const { data, refetch } = useQuery({
    queryKey: ["residental", { provinceIds: "3781", minYear: "2020-01-01" }],
    queryFn: async () => {
      const { data } = await axios("/api/residental");
      return data as Residental[];
    },
    initialData: defaultData,
    enabled: false,
  });

  return (
    <>
      {/* <Form {...form}>
        <form action={formAction}>
          <ToolbarFilter />
        </form>
      </Form>
      <div className="w-full h-[500px] mt-6">
        <div className="flex justify-end">
          <span className="text-end text-sm text-gray-500">
            show max 1,000 record
          </span>
        </div>
        <Map
            listMarker={state.map((e) => ({
              id: e.row_number,
              position: [e.latitude, e.longitude],
              price: e.price_min || 0,
            }))}
          />
      </div> */}
      <button onClick={() => refetch()}>Refetch</button>
      <div className="w-full h-[500px] mt-6">
        {data && (
          <Map
            listMarker={data?.map((e) => ({
              id: e.row_number,
              position: [+e.latitude, +e.longitude],
              price: +e.price_min || 0,
            }))}
          />
        )}
      </div>
    </>
  );
};

export default Content;
