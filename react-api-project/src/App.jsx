import { useState, useEffect } from 'react'
import Axios from 'axios'
import './App.css'

function App() {

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect (() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer tefzp3f24QrDRnZ8Mg1z'
    }

    const fetchAllCharacters = async () => {
      try {
        const rawCharacter = await fetch('https://the-one-api.dev/v2/character', {
          headers: headers,
        });

        const data = await rawCharacter.json();

        return data.docs;

      } catch (error) {
        console.error('Error fetching data', error);
      }

    };
    
    fetchAllCharacters().then(characters => setData(characters))

  }, [])

  return (
    <div>
      <input 
        type="text"
        placeholder='Search for a name'
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />

      {data.filter((character) =>{
        return (
          search.toLowerCase() === "" ? character : character.name.toLowerCase().includes(search)
        )
      }).map((character, index) => (
      
      <ul key={index}>
        <li><a href={character.wikiUrl}>{character.name}</a></li>
      </ul>
      
    ))}

    </div>
  )
}

export default App
