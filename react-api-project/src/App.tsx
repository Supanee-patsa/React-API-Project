import { useState, useEffect } from 'react';
import './App.css';
import backGround from './assets/ME-background-img.jpeg';
import ScrollButton from "./components/topbutton";

interface Character {
  _id: string;
  name: string;
  wikiUrl: string;
}

function App() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer tefzp3f24QrDRnZ8Mg1z'
    };

    const fetchAllCharacters = async () => {
      try {
        setIsLoading(true);
        const rawCharacter = await fetch('https://the-one-api.dev/v2/character', { headers });
        const response = await rawCharacter.json();
        setData(response.docs);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  if (isLoading) {
    return <div className='loading-state-msg'><p>Loading...</p></div>;
  }

  if (error) {
    return <div className='loading-state-msg'><p>Something went wrong. Try refreshing the page.</p></div>;
  }

  return (
    <div>
      <img src={backGround} alt="Map of Middle-Earth" className='bg-img' />
      <h1>Search for a Character from the works of Tolkien</h1>
      <h2>Click their name to go to their Wiki page</h2>
      <input
        type="text"
        placeholder='ex. Aragorn'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ScrollButton />
      {data.filter((character) =>
        search.toLowerCase() === "" ? true : character.name.toLowerCase().includes(search.toLowerCase())
      ).map((character) => (
        <ul key={character._id}>
          <li><a href={character.wikiUrl}>{character.name}</a></li>
        </ul>
      ))}
    </div>
  );
}

export default App;
