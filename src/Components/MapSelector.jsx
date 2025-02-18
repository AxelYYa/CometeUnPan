import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const center = {
  lat: 25.542791269267344,
  lng: -103.40591488822034,
};

const MapSelector = ({ onSelectLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCx4NNBGSBnu0ypvno3X4OSfXzVHRQbj1Y',
    libraries,
    loading: 'async'
  });

  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelected({ lat, lng });
    fetchAddress(lat, lng);
  }, []);

  const fetchAddress = async (lat, lng) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCx4NNBGSBnu0ypvno3X4OSfXzVHRQbj1Y`);
    const data = await response.json();
    if (data.results && data.results[0]) {
      const address = data.results[0].formatted_address;
      onSelectLocation({ lat, lng, address });
    }
  };

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      onClick={onMapClick}
    >
      {selected && <Marker position={{ lat: selected.lat, lng: selected.lng }} />}
    </GoogleMap>
  );
};

export default MapSelector;