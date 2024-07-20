"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import CharacterInfo from "@/app/components/characterinfo";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const staticCharacterNames = ["cardo", "Jersey Nightmare", "savine", "Jersey Senylo", "spideres"];

const Home = () => {
  const [characterName, setCharacterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [staticCharacters, setStaticCharacters] = useState([]);
  const [boostedBoss, setBoostedBoss] = useState(null);
  const [boostedCreature, setBoostedCreature] = useState(null);
  const [searchedCharacters, setSearchedCharacters] = useState([]);

  useEffect(() => {
    // Load searched characters from localStorage
    const savedCharacters = JSON.parse(localStorage.getItem("searchedCharacters")) || [];
    setSearchedCharacters(savedCharacters);

    const fetchStaticCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const responses = await Promise.all(
          staticCharacterNames.map((name) => axios.get(`https://api.tibiadata.com/v4/character/${name}`))
        );
        const data = responses.map((response) => ({
          ...response.data.character.character,
          other_characters: response.data.character.other_characters,
        }));
        data.sort((a, b) => b.level - a.level);
        setStaticCharacters(data);
      } catch (error) {
        setError("Error fetching static characters. Please try again.");
      }

      setLoading(false);
    };

    const fetchBoostedBoss = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://api.tibiadata.com/v4/boostablebosses");
        const { boosted } = response.data.boostable_bosses;
        if (boosted) {
          setBoostedBoss(boosted);
        }
      } catch (error) {
        setError("Error fetching boosted boss data. Please try again.");
      }

      setLoading(false);
    };

    const fetchBoostedCreature = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://api.tibiadata.com/v4/creatures");
        const { boosted } = response.data.creatures;
        if (boosted) {
          setBoostedCreature(boosted);
        }
      } catch (error) {
        setError("Error fetching boosted creature data. Please try again.");
      }

      setLoading(false);
    };

    fetchStaticCharacters();
    fetchBoostedBoss();
    fetchBoostedCreature();
  }, []);

  const fetchCharacterData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.tibiadata.com/v4/character/${characterName}`);
      const character = {
        ...response.data.character.character,
        other_characters: response.data.character.other_characters,
      };
      const updatedCharacters = [...searchedCharacters, character];
      setSearchedCharacters(updatedCharacters);
      // Save to localStorage
      localStorage.setItem("searchedCharacters", JSON.stringify(updatedCharacters));
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

  const handleRemoveCharacter = (name) => {
    const updatedCharacters = searchedCharacters.filter((character) => character.name !== name);
    setSearchedCharacters(updatedCharacters);
    // Update localStorage
    localStorage.setItem("searchedCharacters", JSON.stringify(updatedCharacters));
  };
  return (
    <div className="min-h-screen p-5 flex flex-col items-center background-image">
      <div className="flex justify-between items-start w-full max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="mb-5 flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-lg w-full"
          style={{
            fontFamily: "Verdana",
            fontWeight: "bold",
            backgroundImage: 'url("/fondo.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
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
            style={{
              backgroundColor: "rgb(13, 46, 43)",
            }}
          >
            Search
          </button>
        </form>

        <div className="flex flex-row items-start ml-4 space-x-4">
          {boostedBoss && (
            <div className="flex items-center bg-gray-800 p-2 rounded-lg shadow-lg min-w-max">
              <img src={boostedBoss.image_url} alt={boostedBoss.name} className="w-16 h-16 mr-2" />
              <p className="text-white font-verdana font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {boostedBoss.name}
              </p>
            </div>
          )}
          {boostedCreature && (
            <div className="flex items-center bg-gray-800 p-2 rounded-lg shadow-lg min-w-max">
              <img src={boostedCreature.image_url} alt={boostedCreature.name} className="w-16 h-16 mr-2" />
              <p className="text-white font-verdana font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {boostedCreature.name}
              </p>
            </div>
          )}
        </div>
      </div>

      {loading && <p className="text-lg text-white">Loading...</p>}
      {error && <p className="text-red-300 font-semibold">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-8 w-full max-w-4xl">
        {searchedCharacters.map((character, index) => (
          <div key={index} className="relative">
            <CharacterInfo character={character} />
            <button
              onClick={() => handleRemoveCharacter(character.name)}
              className="absolute top-0 left-0 text-white rounded-full transition p-2"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-1" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-8 w-full max-w-4xl">
        {staticCharacters.map((character, index) => (
          <CharacterInfo key={index} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;
