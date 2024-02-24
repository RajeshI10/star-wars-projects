import React, { useState, useEffect } from 'react';
import ResidentList from './ResidentList';
import './PlanetCard.css';

function PlanetCard({ planet }) {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const promises = planet.residents.map(async (residentUrl) => {
          const response = await fetch(residentUrl);
          const data = await response.json();
          return data;
        });
        const residentData = await Promise.all(promises);
        setResidents(residentData);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p><strong>Climate:</strong> {planet.climate}</p>
      <p><strong>Population:</strong> {planet.population}</p>
      <p><strong>Terrain:</strong> {planet.terrain}</p>
      <h3>Notable Residents:</h3>
      <ResidentList residents={residents} />
    </div>
  );
}

export default PlanetCard;
