import React, { useEffect, useRef } from "react";

const AutocompleteInput = ({ onSelect }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) return;

      // Crea el Autocomplete de Google Maps para la búsqueda
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"], // Puedes cambiar a "address" si solo necesitas direcciones
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();

        // Si la respuesta tiene coordenadas, pasa la información al componente padre
        if (place.geometry) {
          onSelect({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
          });

          // Actualiza el valor del input con la dirección seleccionada
          inputRef.current.value = place.formatted_address; 
        } else {
          console.log("No se encontró una dirección válida.");
        }
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places`;
      script.async = true;
      script.onload = loadGoogleMaps;
      document.body.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, [onSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Busca una dirección..."
      className="form-control"
    />
  );
};

export default AutocompleteInput;
