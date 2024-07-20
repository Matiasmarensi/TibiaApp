"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import CharacterInfo from "@/app/components/characterinfo";
import axios from "axios";

const staticCharacterNames = ["cardo", "Jersey Nightmare", "savine", "Jersey Senylo", "spideres"];

const Home = () => {
  const [characterName, setCharacterName] = useState("");
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [staticCharacters, setStaticCharacters] = useState([]);

  useEffect(() => {
    const fetchStaticCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const responses = await Promise.all(
          staticCharacterNames.map((name) => axios.get(`https://api.tibiadata.com/v4/character/${name}`))
        );
        const data = responses.map((response) => response.data.character.character);
        data.sort((a, b) => b.level - a.level);
        setStaticCharacters(data);
      } catch (error) {
        setError("Error fetching static characters. Please try again.");
      }

      setLoading(false);
    };

    fetchStaticCharacters();
  }, []);

  const fetchCharacterData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.tibiadata.com/v4/character/${characterName}`);
      setCharacterData(response.data.character.character);
    } catch (error) {
      setError("Error fetching data. Please try again.");
    }

    setLoading(false);
  };

  const handleInputChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCharacterData();
  };

  return (
    <div className="min-h-screen p-5 flex flex-col items-center background-image">
      <form
        onSubmit={handleSubmit}
        className="mb-1 flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-lg w-full max-w-md"
      >
        <input
          type="text"
          value={characterName}
          onChange={handleInputChange}
          placeholder="Enter character name"
          className="border border-gray-300 rounded-md p-2 mb-2 md:mb-0 md:mr-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-lg text-white">Loading...</p>}
      {error && <p className="text-red-300 font-semibold">{error}</p>}
      {characterData && <CharacterInfo character={characterData} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        {staticCharacters.map((character, index) => (
          <CharacterInfo key={index} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;
