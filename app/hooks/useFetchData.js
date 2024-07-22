import { useState, useEffect } from "react";
import axios from "axios";

const staticCharacterNames = ["cardo", "Jersey Nightmare", "savine", "Jersey Senylo", "spideres"];
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
};

const useCharacterData = () => {
  const [characterName, setCharacterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [staticCharacters, setStaticCharacters] = useState([]);
  const [boostedBoss, setBoostedBoss] = useState(null);
  const [boostedCreature, setBoostedCreature] = useState(null);
  const [searchedCharacters, setSearchedCharacters] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
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

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://api.tibiadata.com/v4/news/archive");

        const { news } = response.data;

        // map just the news from today
        const currentDate = getCurrentDate();
        console.log(currentDate);
        const newsFromToday = news.filter((item) => item.date.startsWith(currentDate));

        console.log(newsFromToday);
        if (newsFromToday) {
          setNews(newsFromToday);
        } else {
          setNews("There is no news from today");
        }
      } catch (error) {
        setError("Error fetching news data. Please try again.");
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
    fetchNews();
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
      localStorage.setItem("searchedCharacters", JSON.stringify(updatedCharacters));
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status !== 200) {
        setError("Character not found. Please check the name and try again.");
      }
    }
    setLoading(false);
  };

  const handleRemoveCharacter = (name) => {
    const updatedCharacters = searchedCharacters.filter((character) => character.name !== name);
    setSearchedCharacters(updatedCharacters);
    localStorage.setItem("searchedCharacters", JSON.stringify(updatedCharacters));
  };

  return {
    characterName,
    setCharacterName,
    loading,
    error,
    staticCharacters,
    boostedBoss,
    boostedCreature,
    searchedCharacters,
    news,
    fetchCharacterData,
    handleRemoveCharacter,
  };
};

export default useCharacterData;
