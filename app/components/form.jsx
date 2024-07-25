import React from "react";

export default function Form(props) {
  console.log(props);
  return (
    <form
      onSubmit={props.handleSubmit}
      className="mb-5 flex flex-col md:flex-row items-center bg-white p-5 rounded-lg shadow-lg w-full h-full"
      style={{
        fontFamily: "Verdana",
        fontWeight: "bold",
        backgroundImage: 'url("/fondo.png")',
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <input
        type="text"
        value={props.characterName}
        onChange={props.handleInputChange}
        placeholder="Enter character name"
        className="border border-gray-300 rounded-md p-2 mb-2 md:mb-0 md:mr-2 w-full"
      />
      <button
        type="submit"
        disabled={props.characterName.length === 0}
        className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800 hover:shadow-lg hover:scale-105 transition transform duration-200 ease-in-out"
        style={{
          hover: "cursor: pointer",

          backgroundColor: "rgb(13, 46, 43)",
        }}
      >
        Search
      </button>
    </form>
  );
}
