"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import _ from "lodash";

const ToolbarFilter = () => {
  const router = useRouter();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rawParams: { [key: string]: any } = {
      price: event?.currentTarget?.price?.value,
      minYear: event.currentTarget.minYear?.value,
      maxYear: event.currentTarget.maxYear?.value,
    };
    const params = _.pickBy(rawParams, v => !!v)
    const query = new URLSearchParams(params).toString();
    router.replace(`?${query}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="border [box-shadow:3px_3px_rgb(82_82_82)] rounded-lg overflow-hidden p-2">
        <div className="flex flex-col gap-2 items-start">
          <Input name="price" />
          <div>
            <Input name="minYear" />
            <Input name="maxYear" />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </div>
    </form>
  );
};

export default ToolbarFilter;
