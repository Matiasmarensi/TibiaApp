const CharacterInfo = ({ character }) => {
  const getBackgroundColor = (vocation) => {
    switch (vocation) {
      case "Royal Paladin":
        return "bg-yellow-600";
      case "Elite Knight":
        return "bg-blue-700";
      case "Master Sorcerer":
        return "bg-purple-700";
      case "Elder Druid":
        return "bg-green-700";
      default:
        return "bg-gray-300";
    }
  };

  const onlineStatus = character.other_characters?.some((c) => c.name === character.name && c.status === "online");

  return (
    <div
      className={`relative flex flex-col items-center ${getBackgroundColor(
        character.vocation
      )} shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 w-full max-w-sm mx-auto opacity-80 text-white`}
      style={{ height: "300px" }} // Ajusta la altura según sea necesario
    >
      <div
        className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
          onlineStatus ? "bg-green-500" : "bg-red-500"
        } shadow-md`}
        style={{
          boxShadow: `0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.8)`,
          background: `radial-gradient(circle at 50%, ${
            onlineStatus ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)"
          }, ${onlineStatus ? "rgba(0, 200, 0, 0.6)" : "rgba(200, 0, 0, 0.6)"})`,
        }}
      >
        <div className={`w-4 h-4 rounded-full ${onlineStatus ? "bg-green-700" : "bg-red-700"}`}></div>
      </div>
      <h2 className="text-lg font-bold mb-5 text-center truncate" title={character.name}>
        {character.name}
      </h2>
      <div className="grid grid-cols-2 gap-2 w-full text-sm flex-grow">
        <p className="font-semibold">Level:</p>
        <p>{character.level}</p>
        <p className="font-semibold">Vocation:</p>
        <p>{character.vocation}</p>
        <p className="font-semibold">Residence:</p>
        <p>{character.residence}</p>
        <p className="font-semibold">Last Login:</p>
        <p>{new Date(character.last_login).toLocaleDateString()}</p>

        <p
          className={`font-semibold ${
            character.account_status === "Premium Account" ? "text-green-300" : "text-red-300"
          }`}
        ></p>
      </div>
      <a
        href={`https://www.tibia.com/community/?subtopic=characters&name=${character.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition"
      >
        View on Tibia.com
      </a>
    </div>
  );
};

export default CharacterInfo;
