'use client'

import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// lab

export default function Map() {

  const mapContainer = useRef(null);
  const map = useRef<any>(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);

  const API_KEY = process.env.LONGDO_API_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current || "",
      style: `https://demotiles.maplibre.org/style.json`,
      // center: [lng, lat],
      zoom: zoom
    });

  }, [API_KEY, lng, lat, zoom]);

  return (
    <div className="w-full h-96">
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );

}