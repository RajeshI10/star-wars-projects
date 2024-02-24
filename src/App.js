import React, { useState, useEffect } from 'react';
import PlanetCard from "./components/PlanetCard";
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPlanets(data.results);
      setNextPage(data.next);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  const backgroundStyle = {
    backgroundColor: 'lightblue', 
  };

  return (
    <div className="App" style={backgroundStyle}>
      <h1>Star Wars Planets Directory</h1>
      <div className="planet-list">
        {planets.map((planet, index) => (
          <PlanetCard key={index} planet={planet} />
        ))}
      </div>
      {nextPage && (
        <button className="load-more" onClick={handleNextPage}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
