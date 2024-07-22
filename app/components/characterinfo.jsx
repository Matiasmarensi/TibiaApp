const CharacterInfo = ({ character }) => {
  const getVocationColor = (vocation) => {
    switch (vocation) {
      case "Royal Paladin":
      case "Paladin":
        return "text-yellow-400";
      case "Elite Knight":
      case "Knight":
        return "text-blue-500";
      case "Master Sorcerer":
      case "Sorcerer":
        return "text-purple-400";
      case "Elder Druid":
      case "Druid":
        return "text-green-400";
      default:
        return "text-gray-100";
    }
  };

  const onlineStatus = character.other_characters?.some((c) => c.name === character.name && c.status === "online");

  return (
    <div
      className={`relative flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-4 w-full max-w-sm mx-auto opacity-100 text-white`}
      style={{
        height: "300px", // Ajusta la altura según sea necesario
        backgroundImage: 'url("/fondo.png")',
        backgroundSize: "cover", // Esto ajusta el tamaño de la imagen para cubrir todo el contenedor
        backgroundPosition: "center", // Esto centra la imagen en el contenedor
        backgroundRepeat: "no-repeat", // Esto evita que la imagen se repita
      }}
    >
      <div
        className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center ${
          onlineStatus ? "bg-green-500" : "bg-red-500"
        } shadow-md`}
        style={{
          boxShadow: `0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.8)`,
          background: `radial-gradient(circle at 50%, ${
            onlineStatus ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)"
          }, ${onlineStatus ? "rgba(0, 200, 0, 0.6)" : "rgba(200, 0, 0, 0.6)"})`,
        }}
      >
        <div className={`w-2 h-2 rounded-full ${onlineStatus ? "bg-green-700" : "bg-red-700"}`}></div>
      </div>
      <h2 className="text-lg font-bold mb-2 text-center truncate" title={character.name}>
        {character.name}
      </h2>
      <div className="grid grid-cols-2 gap-2 w-full text-sm flex-grow">
        <p className="font-semibold">Level:</p>
        <p>{character.level}</p>
        <p className="font-semibold">Vocation:</p>
        <p className={getVocationColor(character.vocation)}>{character.vocation}</p>
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
        style={{
          backgroundImage: 'url("https://static.tibia.com/images/global/buttons/mediumbutton-over.gif")',
          backgroundSize: "cover", // Esto ajusta el tamaño de la imagen para cubrir el botón
          backgroundPosition: "center", // Esto centra la imagen en el botón
          backgroundRepeat: "no-repeat", // Esto evita que la imagen se repita
          color: "yellow", // Asegura que el texto sea visible sobre la imagen
          textAlign: "center", // Centra el texto dentro del botón
        }}
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
