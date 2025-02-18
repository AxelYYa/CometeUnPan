import React, { useState } from "react";
import AutocompleteInput from "/src/Components/AutocompleteInput"; // Ajusta la ruta según tu estructura de carpetas

const MapPage = () => {
  const [location, setLocation] = useState(null);

  const handleSelect = (selectedLocation) => {
    console.log("Dirección seleccionada:", selectedLocation); // Verifica en la consola si las coordenadas son correctas
    setLocation(selectedLocation);
  };

  return (
    <div>
      <h2>Busca una dirección</h2>
      <AutocompleteInput onSelect={handleSelect} />

      {location && (
        <div>
          <p>
            Dirección: {location.address} <br />
            Coordenadas: {location.lat}, {location.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default MapPage;
