import React, { useEffect, useRef } from 'react';

const MapRoute = ({ destination }) => {
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded');
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 25.538485572964515, lng: -103.45535531854837 },
      zoom: 14,
    });

    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
    directionsRendererRef.current.setMap(map);

    const origin = { lat: 25.538485572964515, lng: -103.45535531854837 };

    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRendererRef.current.setDirections(result);
      } else {
        console.error('Error fetching directions', result);
      }
    });
  }, [destination]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapRoute;