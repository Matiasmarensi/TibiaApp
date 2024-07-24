"use client";
import Link from "next/link";
import React from "react";

const Boosted = ({ boostedBoss, boostedCreature }) => {
  const URLWIKI = "https://www.tibiawiki.com.br/wiki/";
  const bossURL = URLWIKI + boostedBoss?.name;
  const creatureURL = URLWIKI + boostedCreature?.name;

  return (
    <div className="flex flex-row items-center justify-center ml-5 space-x-4 pb-8">
      {boostedBoss && (
        <div
          className=" rounded-lg shadow-lg flex flex-col items-center justify-center w-32 h-32"
          style={{
            fontFamily: "Verdana",
            fontWeight: "bold",

            backgroundImage: 'url("/fondo.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Link href={bossURL} target="_blank">
            <img src={boostedBoss.image_url} alt={boostedBoss.name} className="w-20 h-20 object-cover mb-2" />
          </Link>
          <p className="text-white font-verdana font-bold text-center text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {boostedBoss.name}
          </p>
        </div>
      )}

      {boostedCreature && (
        <div
          className=" rounded-lg shadow-lg flex flex-col items-center justify-center w-32 h-32"
          style={{
            fontFamily: "Verdana",
            fontWeight: "bold",
            backgroundImage: 'url("/fondo.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Link href={creatureURL} target="_blank">
            <img src={boostedCreature.image_url} alt={boostedCreature.name} className="w-20 h-20 object-cover mb-2" />
          </Link>
          <p className="text-white font-verdana font-bold text-center text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {boostedCreature.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default Boosted;
