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
import { Card, CardContent } from "@/components/ui/card";

type ContentProps = {
  data: Residental[];
};

export type FormValues = {
  price?: {
    min?: number;
    max?: number;
  };
  scaleBounds?: number;
  propertyType?: string[];
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
      // min: 0,
      // max: 7000000,
    },
    // propertyType: ["1"],
    scaleBounds: 0.036,
  };
  const [search, setSearch] = useState<FormValues>(initialSearch);
  const { lat, lng } = useLatLngStore((state) => state);
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
          priceMin: search?.price?.min || 0,
          priceMax: search?.price?.max,
          propertyTypeIds: search?.propertyType || ["1", "2", "3", "20000"],
          lat: lat,
          lng: lng,
          scaleBounds: search?.scaleBounds,
        },
      });
      return data as Residental[];
      return [];
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
          <div className="grid">
            <div className="w-full h-[500px] mt-3">
              {data && (
                <Map
                  listMarker={data?.map((e) => ({
                    id: e.row_number,
                    position: [+e.latitude, +e.longitude],
                    price: +e.price_min || 0,
                  }))}
                  scaleBounds={search?.scaleBounds}
                />
              )}
              <div className="flex justify-end">
                <span className="text-end text-sm text-gray-500">
                  {data.length} results found (maximum display limit is 3,000
                  records)
                </span>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Content;
