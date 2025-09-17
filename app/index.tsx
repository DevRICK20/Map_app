import { LocationObject } from "expo-location";
import { useState } from "react";
import LocationRequestService from "./location_tap";
import Map from "./map_tab";

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  return location == null ? (
    <LocationRequestService
      setLocationData={(data) => {
        setLocation(data);
      }}
    />
  ) : (
    <Map
      latitude={location.coords.latitude}
      longitude={location.coords.longitude}
    />
  );
}
