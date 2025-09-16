"use client";

import React from "react";
import { Map, Marker } from "pigeon-maps";

export default function MapSection() {
  return (
    <Map height={350} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
      <Marker width={50} anchor={[50.879, 4.6997]} />
    </Map>
  );
}
