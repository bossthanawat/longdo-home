"use server";
import dayjs from "dayjs";
import raw from "../converted.json";

export async function getResidental(prevState: any, formData: FormData) {
  const data = raw as RawResidential[];
  const name = formData.get("name");
  const price = formData.get("price.min");
  // // const minYear = formData.get('year.min') || 2020;
  // // const maxYear = formData.get('year.max') || dayjs().year();
  const result = data?.filter(
    (item) =>
      item.province_id === "3781" &&
      item?.price_min &&
      item?.price_min > Number(price || 0)
    // dayjs(item.date_created).year() >= +minYear &&
    // dayjs(item.date_created).year() <= +maxYear
  );

  if (result?.length > 200) {
    return result?.slice(0, 200);
  }
  return {
    data: result
  };
}
