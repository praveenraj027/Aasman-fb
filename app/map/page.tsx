"use client";

import dynamic from "next/dynamic";

// MapComponent ko dynamically import karenge
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="w-full h-screen">
      <MapComponent />
    </div>
  );
}
