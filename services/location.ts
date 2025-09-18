import * as Location from "expo-location";

type LocationObject = Location.LocationObject;
// Defines the structure of the address object returned by reverse geocoding.
type GeocodedAddress = Location.LocationGeocodedAddress;

export async function getLocationHandler(): Promise<
  LocationObject | undefined
> {
  try {
    // Fetch the current position with high accuracy.
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
