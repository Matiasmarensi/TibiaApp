"use client";
import { Suspense, lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Loader from "./components/loader";
import useCharacterData from "./hooks/useFetchData"; // Asegúrate de importar el custom hook correctamente

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
      <div className="flex justify-between items-stretch w-full max-w-4xl ">
        <form
          onSubmit={handleSubmit}
          className="mb-5 flex flex-col md:flex-row items-center bg-white p-5 rounded-lg shadow-lg w-full h-full"
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

        <div className="flex flex-row items-stretch ml-5 space-x-4 pb-5">
          {boostedBoss && (
            <div className=" bg-gray-800 p-2 rounded-lg shadow-lg min-w-max h-full">
              <img src={boostedBoss.image_url} alt={boostedBoss.name} className="w-16 h-16 mr-2" />
              <p className="text-white font-verdana font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {boostedBoss.name}
              </p>
            </div>
          )}
          {boostedCreature && (
            <div className=" bg-gray-800 p-2 rounded-lg shadow-lg min-w-max h-full">
              <img src={boostedCreature.image_url} alt={boostedCreature.name} className="w-16 h-16 mr-2" />
              <p className="text-white font-verdana font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                {boostedCreature.name}
              </p>
            </div>
          )}
        </div>
      </div>
      {loading && <Loader />}
      {error && <p className="text-black font-semibold">{error}</p>}

      <div>
        {news.map((newsItem) => {
          return (
            <div
              key={newsItem.id}
              className="max-h-20 overflow-y-auto bg-gray-800 p-2 rounded-lg shadow-lg mb-2 text-white font-verdana font-bold backgroundnews"
            >
              <a href={newsItem.url} target="_blank" className="text-white-400 hover:underline mr-2">
                LINK
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
