// src/components/Map.tsx

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import {Constants} from './Constants'
import SearchBar from './SearchBar';

// Define the custom icon for the boba shop marker
const bobaIcon = L.icon({
  iconUrl: '/boba-icon.png',  // Path to the boba drink icon
  iconSize: [40, 40],         // Adjust the size of the icon
  iconAnchor: [20, 40],       // The point of the icon which will correspond to marker's location
  popupAnchor: [0, -40],      // The point from which the popup should open relative to the iconAnchor
});

interface BobaShop {
  name: string;
  lat: number;
  lon: number;
}

const Map: React.FC = () => {
  const [bobaShops, setBobaShops] = useState<BobaShop[]>([]);
  const [center, setCenter] = useState<[number, number]>([37.7749, -122.4194]); // Default to San Francisco
  const [zoom, setZoom] = useState(13);

  const fetchBobaShops = (lat: number, lon: number) => {
    // Fetch boba shops near the searched location (for now, using static data)
    axios.get('/boba_shops.json')
      .then(response => {
        const shops = response.data.map((shop: any) => ({
          name: shop.name,
          lat,  // Replace with actual latitude
          lon   // Replace with actual longitude
        }));
        setBobaShops(shops);
      })
      .catch(error => {
        console.error('Error fetching the boba shops data:', error);
      });
  };

  const handleSearch = async (city: string, country: string) => {
    const apiKey = Constants.key; // Replace with your geolocation API key
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;

    try {
      const response = await axios.get(geocodeUrl);
      const { lat, lon } = response.data[0];
      setCenter([lat, lon]);
      setZoom(14);
      fetchBobaShops(lat, lon);
    } catch (error) {
      console.error('Error fetching the geolocation data:', error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {bobaShops.map((shop, idx) => (
          <Marker key={idx} position={[shop.lat, shop.lon]} icon={bobaIcon}>
            <Popup>{shop.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
