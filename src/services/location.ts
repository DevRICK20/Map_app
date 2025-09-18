import * as Location from "expo-location";

type LocationObject = Location.LocationObject;
// Defines the structure of the address object returned by reverse geocoding.
type GeocodedAddress = Location.LocationGeocodedAddress;

export async function checkLocationAccess() {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return false;
  }

  return true;
}

export async function getLocationHandler(): Promise<
  LocationObject | undefined
> {
  try {
    let currentLocation: LocationObject =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

    // Perform reverse geocoding to get address from coordinates.
    // let addressResponse: GeocodedAddress[] = await Location.reverseGeocodeAsync(
    //   currentLocation.coords
    // );

    return currentLocation;
  } catch (error) {
    console.log(error);
  }
}
