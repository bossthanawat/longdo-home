"use client";

import dayjs from "dayjs";
import ToolbarFilter from "./ToolbarFilter";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { getResidental } from "./action";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Residental } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLatLngStore } from "./stores/latlng-store";

type ContentProps = {
  data: Residental[];
};

type FormValues = {
  price?: {
    min?: number;
    max?: number;
  };
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
  const initialSearch = {
    price: {
      min: 0,
      // max: 7000000,
    },
  };
  const [search, setSearch] = useState<FormValues>(initialSearch);
  const { lat, lng, scaleBounds } = useLatLngStore((state) => state);
  const form = useForm<FormValues>({
    defaultValues: initialSearch,
  });
  // const [state, formAction] = useFormState(getResidental, data);

  const { data, isFetching } = useQuery({
    queryKey: ["residental", search, lat, lng],
    queryFn: async () => {
      if (!lat || !lng) return [];
      const { data } = await axios.get("/api/residental", {
        params: {
          priceMin: search?.price?.min,
          priceMax: search?.price?.max,
          lat: lat,
          lng: lng,
          scaleBounds: scaleBounds,
        },
      });
      return data as Residental[];
    },
    initialData: defaultData,
    refetchOnWindowFocus: false,
  });

  const onSubmit = (data: FormValues) => {
    setSearch(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ToolbarFilter disabledSubmit={isFetching} />
        </form>
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
          <div className="flex justify-end">
            <span className="text-end text-sm text-gray-500">
              {data.length} results found (maximum display limit is 3,000
              records)
            </span>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Content;
