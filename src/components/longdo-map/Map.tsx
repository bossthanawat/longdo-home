"use client";

import { use, useEffect, useRef } from "react";
import { longdo, map, LongdoMap } from "./LongdoMap";

const Map = () => {
  const KEY = process.env.NEXT_PUBLIC_LONGDO_API_KEY;
  // not working
  console.log(map);
  return (
    <>
      <div className="w-full h-96">
        <LongdoMap
          id="longdo-map"
          mapKey={KEY}
          callback={() => {
            map?.Layers?.setBase(longdo.Layers.GRAY);
          }}
        />
      </div>
    </>
  );
};

export default Map;
