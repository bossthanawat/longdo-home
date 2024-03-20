"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY as string;

const Map = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const tokyo = { lng: 100.5631207, lat: 13.8042322 };
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.BASIC,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
      // geolocate: maptilersdk.GeolocationType.POINT
    }).on("click", (e) => {
      console.log("map clicked",e);
    });
    const marker = new maptilersdk.Marker()
      .setLngLat([tokyo.lng, tokyo.lat])
      .addTo(map.current)
      .on("click", () => {
        console.log("marker clicked");
      });
  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="w-full h-96">
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
};

export default Map;
