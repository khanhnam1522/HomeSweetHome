import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
export default useLocation = (address) => {
  const [location, setLocation] = useState({ latitude: 0, longtitude: 0 });
  const getLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") return;
      const location = await Location.geocodeAsync(address);
      if (location.length === 0) return;
      setLocation({
        latitude: location[0].latitude,
        longtitude: location[0].longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
