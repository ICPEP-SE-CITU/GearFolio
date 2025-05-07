import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";



const companyLocations = [
  { name: "TechCorp", lat: 10.3157, lng: 123.8854 }, // Example company in Cebu City
  { name: "DataSystems", lat: 10.3150, lng: 123.8836 }, // Example company in Cebu City
  { name: "AIStartup", lat: 10.3141, lng: 123.8887 }, // Example company in Cebu City
  { name: "CloudTech", lat: 10.3161, lng: 123.8838 }, // Example company in Cebu City
  { name: "InnovateLabs", lat: 10.3143, lng: 123.8841 }, // Example company in Cebu City
  { name: "FutureTech", lat: 10.3185, lng: 123.8860 }, // Example company in Cebu City
];

const MapView = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Calculate the distances to each company
          const newDistances = companyLocations.map((company) => {
            const distance = calculateDistance(
              latitude,
              longitude,
              company.lat,
              company.lng
            );
            return { ...company, distance };
          });

          setDistances(newDistances);
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    }

    // Initialize map
    const map = L.map("map").setView([10.3157, 123.8854], 14); // Default view to Cebu City

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    companyLocations.forEach((loc) => {
      L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b>`)
        .openPopup();
    });

    return () => {
      map.remove(); // Clean up map on unmount
    };
  }, []);

  // Haversine formula to calculate the distance between two coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Convert degrees to radians
  const toRad = (deg) => deg * (Math.PI / 180);

  return (
    <div className="relative w-full h-full z-0 rounded-lg">
      {/* Set the map container to fill the parent container */}
      <div id="map" className="w-full h-full"></div>

      {userLocation && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold">Your Current Location</h4>
          <p>
            Latitude: {userLocation.lat.toFixed(4)}, Longitude:{" "}
            {userLocation.lng.toFixed(4)}
          </p>
        </div>
      )}

      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md max-w-xs">
        <h4 className="text-lg font-semibold">Company Distances</h4>
        <ul>
          {distances.map((company, index) => (
            <li key={index} className="text-sm">
              <b>{company.name}</b>: {company.distance.toFixed(2)} km
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapView;
