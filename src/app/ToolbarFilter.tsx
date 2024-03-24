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

type ToolbarFilterProps = {
  disabledSubmit?: boolean;
};
const ToolbarFilter = (props: ToolbarFilterProps) => {
  const { disabledSubmit } = props;
  const form = useFormContext();
  return (
    <div className="border [box-shadow:3px_3px_rgb(82_82_82)] rounded-lg overflow-hidden p-2">
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col gap-1 max-w-[250px]">
          <label className="text-sm font-medium">ราคา</label>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="price.min"
              render={({ field }) => <Input placeholder="min" {...field} />}
            />
            <FormField
              control={form.control}
              name="price.max"
              render={({ field }) => <Input placeholder="max" {...field} />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-[250px]">
          <label className="text-sm font-medium">ประเภท</label>
          <div className="flex gap-2"></div>
        </div>
      </div>
      <div className="flex flex-col items-end w-full pt-4">
        <Button type="submit" disabled={disabledSubmit} variant={"default"}>Filter</Button>
      </div>
    </div>
  );
};

export default ToolbarFilter;
