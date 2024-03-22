"use server";
import dayjs from "dayjs";
import raw from "../../raw/converted.json";

export async function getResidental(prevState: any, formData: FormData) {
  const data = raw as RawResidential[];
  const name = formData.get("name");
  const price = formData.get("price.min");
  const result = data?.filter(
    (item) =>
      item.province_id === "3781" &&
      item?.price_min &&
      +item?.price_min > +(price || 0)
  );

  if (result?.length > 200) {
    return result?.slice(0, 200);
  }
  return result
}
