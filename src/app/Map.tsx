"use client";

import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import numeral from "numeral";
import { fShortenNumber } from "@/utils/formatNumber";

export type listMarkerValue ={
  id: string;
  position: [number, number];
  price: number;
}

type MapProps = {
  listMarker?: listMarkerValue[];
};

const Map = (props: MapProps) => {
  const { listMarker } = props;

  const getColorByPrice = (price: number) => {
    if (price <= 1000000) {
      return "bg-teal-500";
    } else if (price <= 3000000) {
      return "bg-green-500";
    } else if (price <= 5000000) {
      return "bg-yellow-500";
    } else if (price <= 10000000){
      return "bg-orange-500";
    } else {
      return "bg-red-500";
    }
  };
  
  return (
    <>
      <MapContainer
        center={[13.8042322, 100.5631207]}
        zoom={12}
        className="w-full h-full"
      >
        <HandleMap />
        <LayersControl>
          <LayersControl.BaseLayer checked name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Map">
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
      </MapContainer>
    </>
  );
};

export default Map;

type HandleMapProps = {};

const HandleMap = (props: HandleMapProps) => {
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.setView([e.latlng.lat, e.latlng.lng]);
    });
  }, [map]);

  return <></>;
};