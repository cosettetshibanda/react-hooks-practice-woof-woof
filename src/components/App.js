import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import DogBar from "./DogBar";
import Details from "./Details";


function App() {
const [dogs, setDogs] = useState([])
const [selectedDogId, setSelectedDogId] = useState(null);
const [goodDogsOnly, setGoodDogsOnly] = useState(false);

function handleToggleFilter() {
  setGoodDogsOnly((goodDogsOnly) => !goodDogsOnly);
}

const selectedDog = dogs.find((dog) => dog.id === selectedDogId);

let displayDogs = dogs;
if (goodDogsOnly) {
  displayDogs = displayDogs.filter((dog) => dog.isGoodDog);
}


function onUpdateDog(updatedDog) {
  const updatedDogs = dogs.map((dog) =>
    dog.id === updatedDog.id ? updatedDog : dog
  );
  setDogs(updatedDogs);
}

  useEffect(() => {
    fetch("http://localhost:3001/pups")
    .then(r => r.json())
    .then(setDogs)
  }, [])

  return (
    <div className="App">
      <Filter goodDogsOnly={goodDogsOnly} onFilterClick={handleToggleFilter} />
      <DogBar dogs={displayDogs} onClickDog={setSelectedDogId} />
      <Details dog={selectedDog} onUpdateDog={onUpdateDog} />
    </div>
  );
}

export default App;
