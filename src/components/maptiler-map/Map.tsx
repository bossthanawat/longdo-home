'use client'

import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY as string;

const Map = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const [zoom] = useState(14);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom
    });

  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="w-full h-96">
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}

export default Map;