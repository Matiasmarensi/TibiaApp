"use client";
import { Suspense, lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaExternalLinkAlt } from "react-icons/fa";

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Loader from "./components/loader";
import useCharacterData from "./hooks/useFetchData"; // Asegúrate de importar el custom hook correctamente
import Boosted from "./components/boosted";
import Form from "./components/form";
const CharacterInfo = lazy(() => import("@/app/components/characterinfo"));

const Home = () => {
  const {
    characterName,
    setCharacterName,
    loading,
    error,
    staticCharacters,
    boostedBoss,
    boostedCreature,
    news,
    searchedCharacters,
    fetchCharacterData,
    handleRemoveCharacter,
  } = useCharacterData();

  const handleInputChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCharacterData();
  };

  return (
    <div className="min-h-screen p-5 flex flex-col items-center background-image">
      <div className="flex justify-between items-stretch w-full max-w-3xl ">
        <Form characterName={characterName} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        <Boosted boostedBoss={boostedBoss} boostedCreature={boostedCreature} />
      </div>
      <div className="loader-container">
        {loading && <Loader />}
        {error && <p className="text-black font-semibold">{error}</p>}
      </div>
      <div>
        {news.map((newsItem) => {
          return (
            <div
              key={newsItem.id}
              className="max-h-20 overflow-y-auto bg-gray-800 p-2 rounded-lg shadow-lg mb-2 text-white font-verdana font-bold backgroundnews"
            >
              <a href={newsItem.url} target="_blank" className="text-white-400 hover:underline mr-2 flex float-left">
                <FaExternalLinkAlt />
              </a>
              {newsItem.news}
            </div>
          );
        })}
      </div>

      <Suspense fallback={<Loader />}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-8 w-full max-w-4xl">
          {searchedCharacters.map((character, index) => (
            <div key={index} className="relative">
              <CharacterInfo character={character} />
              <button
                onClick={() => handleRemoveCharacter(character.name)}
                className="absolute top-0 left-0 text-white rounded-full transition p-2"
              >
                <FontAwesomeIcon icon={faWindowClose} className="mr-1" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-8 w-full max-w-4xl">
          {staticCharacters.map((character, index) => (
            <CharacterInfo key={index} character={character} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
