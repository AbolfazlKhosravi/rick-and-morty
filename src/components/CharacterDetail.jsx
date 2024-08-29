import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
// import { character, episodes } from "../../data/data";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

function CharacterDetail({ selectId, setFavourites, isAddedToFavourites }) {
  const [character, setCharacter] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [episodes, setEpisodes] = useState(null);
  const [isloadingEpisodes, setIsloadingEpisodes] = useState(false);

  useEffect(() => {
    async function getCaracter() {
      try {
        setIsloading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`
        );
        setCharacter(data);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsloading(false);
      }
    }
    if (selectId) {
      getCaracter();
    }
  }, [selectId]);

  useEffect(() => {
    async function getEpisodes() {
      try {
        setIsloadingEpisodes(true);
        const episodeId = character.episode.map((e) => e.split("/").at(-1));
        const { data: episodes } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes([episodes].flat(Infinity).slice(0, 5));
      } catch (error) {
        console.log(error.response);

        toast.error(error.response.data.error);
      } finally {
        setIsloadingEpisodes(false);
      }
    }
    if (character) {
      getEpisodes();
    }
  }, [character]);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : character?.id & selectId ? (
        <div className={{ flex: 1 }}>
          <div className="character-detail">
            <img
              src={character.image}
              alt={character.name}
              className="character-detail__img"
            />
            <div className="character-detail__info">
              <h3 className="name">
                <span>{character.gender === "Male" ? "👨🏻" : "👩🏻‍🦰"}</span>
                <span>&nbsp;{character.name}</span>
              </h3>
              <div className="info">
                <span
                  className={`status ${character.status === "Dead" && "red"}`}
                ></span>
                <span>&nbsp;{character.status}</span>
                <span> - &nbsp;{character.species}</span>
              </div>
              <div className="location">
                <p>Last Khown Location : </p>
                <p>{character.location.name}</p>
              </div>
              <div className="actions">
                {isAddedToFavourites ? (
                  <p>already Added To The Favourites ✅</p>
                ) : (
                  <button
                    onClick={() =>
                      setFavourites((prevData) => [...prevData, character])
                    }
                    className="btn btn--primary"
                  >
                    Add to Favourits
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="character-episodes">
            <div className="title">
              <h2>List of Episodes:</h2>
              <button>
                <ArrowUpCircleIcon className="icon" />
              </button>
            </div>
            <ul>
              {isloadingEpisodes ? (
                <Loader />
              ) : episodes ? (
                episodes.map((item, index) => (
                  <li key={item.id}>
                    <div>
                      {String(index + 1).padStart(2, "0")} {item.episode} :{" "}
                      <strong>{item.name}</strong>
                    </div>
                    <div className="badge badge--secondary">
                      {item.air_date}
                    </div>
                  </li>
                ))
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div
          style={{
            color: "var(--slate-300)",
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          Please select a character
        </div>
      )}
    </>
  );
}

export default CharacterDetail;
