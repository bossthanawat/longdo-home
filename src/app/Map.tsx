"use client";

import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";
import { Map as LeafletMap, divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import numeral from "numeral";
import { fShortenNumber } from "@/utils/formatNumber";
import { useLatLngStore } from "./stores/latlng-store";
import { Button } from "@/components/ui/button";

export type listMarkerValue = {
  id: string;
  position: [number, number];
  price: number;
};

type MapProps = {
  listMarker?: listMarkerValue[];
  scaleBounds?: number;
};

const Map = (props: MapProps) => {
  const { listMarker, scaleBounds } = props;
  const [map, setMap] = useState<LeafletMap | null>(null);
  const { setLatlng, lat, lng } = useLatLngStore((state) => state);

  const getColorByPrice = (price: number) => {
    if (price <= 1000000) {
      return "bg-teal-500";
    } else if (price <= 3000000) {
      return "bg-green-500";
    } else if (price <= 5000000) {
      return "bg-yellow-500";
    } else if (price <= 10000000) {
      return "bg-orange-500";
    } else {
      return "bg-red-500";
    }
  };

  const getCenter = () => {
    if (!map) return;
    const center = map.getCenter();
    setLatlng({ lat: center.lat, lng: center.lng });
    map.setView([center.lat, center.lng]);
    map.setZoom(13);
  };

  return (
    <>
      <Button onClick={getCenter} className="mb-2" type="submit">
        ค้นหาในบริเวณนี้
      </Button>
      <MapContainer
        center={[13.8042322, 100.5631207]}
        zoom={12}
        className="w-full h-full z-0"
        ref={setMap}
      >
        <HandleMap />
        <LayersControl>
          <LayersControl.BaseLayer name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Google Map">
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Map Satellite">
            <LayerGroup>
              <TileLayer
                attribution="Google Maps Satellite"
                url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
              />
              <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>
        {listMarker?.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            eventHandlers={{
              click: (e) => {
                console.log("marker clicked", marker.id);
              },
            }}
            icon={divIcon({
              html: renderToStaticMarkup(
                <div
                  className={`inline-flex items-center justify-center p-1 rounded ${getColorByPrice(
                    marker.price
                  )} bg-ye`}
                >
                  <p className="text-center text-white">
                    {numeral(marker?.price).format("0.0a").replace(".0", "")}
                  </p>
                </div>
              ),
            })}
          ></Marker>
        ))}
        {scaleBounds && (
          <Rectangle
            bounds={[
              [lat - scaleBounds, lng - scaleBounds],
              [lat + scaleBounds, lng + scaleBounds],
            ]}
            pathOptions={{
              color: "#aef0a6",
              fillColor: "none",
            }}
          />
        )}
      </MapContainer>
    </>
  );
};

export default Map;

type HandleMapProps = {};

const HandleMap = (props: HandleMapProps) => {
  const map = useMap();
  const { setLatlng } = useLatLngStore((state) => state);
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.setView([e.latlng.lat, e.latlng.lng]);
      setLatlng({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
  }, [map]);

  return null;
};
