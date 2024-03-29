"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, FormHTMLAttributes } from "react";
import _ from "lodash";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./Content";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type ToolbarFilterProps = {
  disabledSubmit?: boolean;
};
const ToolbarFilter = (props: ToolbarFilterProps) => {
  const { disabledSubmit } = props;
  const form = useFormContext<FormValues>();
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex flex-col gap-1 max-w-[250px] ">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="price.min"
            render={({ field }) => (
              <Input
                type="number"
                placeholder="ราคาต่ำสุด"
                {...field}
                className="h-9"
              />
            )}
          />
          <FormField
            control={form.control}
            name="price.max"
            render={({ field }) => (
              <Input
                type="number"
                placeholder="ราคาสูงสุด"
                {...field}
                className="h-9"
              />
            )}
          />
        </div>
      </div>
      <FormField
        control={form.control}
        name="propertyType"
        render={({ field }) => (
          <DataTableFacetedFilter
            onChange={field.onChange}
            data={field.value || []}
            title="ประเภท"
            options={listPropertyType}
          />
        )}
      />
      <FormField
        control={form.control}
        name="scaleBounds"
        render={({ field }) => (
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <div className="grid gap-4 min-w-[240px]">
                <div className="flex items-center gap-2">
                  <Label htmlFor="maxlength" className="text-nowrap">
                    ระยะค้นหา
                  </Label>
                  <Slider
                    id="maxlength"
                    min={0.027}
                    max={0.054}
                    defaultValue={[field.value || 0]}
                    step={0.009}
                    onValueChange={field.onChange}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Maximum Length"
                  />
                  <span className="rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border text-nowrap">
                    {(Number(field.value) * 111).toFixed(0)} km
                  </span>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              กำหนดขอบเขตที่มีระยะทางประมาณ x กิโลเมตรจากจุดศูนย์กลาง
            </HoverCardContent>
          </HoverCard>
        )}
      />
      <Button
        type="submit"
        disabled={disabledSubmit}
        variant={"secondary"}
        size={"sm"}
      >
        Filter
      </Button>
    </div>
  );
};

export default ToolbarFilter;

export const listPropertyType = [
  {
    value: "1",
    label: "บ้าน",
  },
  {
    value: "2",
    label: "คอนโด",
  },
  {
    value: "3",
    label: "ทาวน์โฮม",
  },
  {
    value: "20000",
    label: "บ้านแฝด",
  },
];
