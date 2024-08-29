import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharacterList({ characters, isloading, setSelectId ,selectId }) {
  return (
    <div className="characters-list">
      {isloading ? (
        <Loader />
      ) : characters.length ? (
        characters.map((item) => (
          <Character key={item.id} item={item} setSelectId={setSelectId} selectId={selectId}/>
        ))
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
          Please search for characters
        </div>
      )}
    </div>
  );
}
const Character = ({ item, setSelectId ,selectId}) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "👨🏻" : "👩🏻‍🦰"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>{" "}
        <span>{item.status}</span>
        <span>-{item.species}</span>
      </div>
      <button
        onClick={() =>
          setSelectId((prevId) => {
            return item.id === prevId ? null : item.id;
          })
        }
        className="icon red"
      >
        {selectId===item.id? <EyeSlashIcon/> : <EyeIcon className="icon" />}
      </button>
    </div>
  );
};
export default CharacterList;
