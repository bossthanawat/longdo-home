"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, FormHTMLAttributes } from "react";
import _ from "lodash";

const ToolbarFilter = () => {
  return (
    <div className="border [box-shadow:3px_3px_rgb(82_82_82)] rounded-lg overflow-hidden p-2">
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-col gap-1 max-w-[250px]">
          <label className="text-sm font-medium">ราคา</label>
          <div className="flex gap-2">
            <Input name="price.min" placeholder="min"/>
            <Input name="price.max" placeholder="max" defaultValue={7000000}/>
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-[250px]">
          <label className="text-sm font-medium">ประเภท</label>
          <div className="flex gap-2">
          </div>
        </div>
        <Button type="submit">Search</Button>
      </div>
    </div>
  );
};

export default ToolbarFilter;
