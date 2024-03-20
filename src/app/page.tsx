import Map from "@/components/maptiler-map/Map";
import Image from "next/image";
import raw from "../../raw/converted.json";

async function getData() {
  const result = raw as any;
  return result[0];
}

export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <span>{data}</span> */}
      {/* <Map /> */}
    </main>
  );
}
