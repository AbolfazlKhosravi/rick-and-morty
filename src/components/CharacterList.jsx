function CharacterList({ characters }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
}
const Character = ({ item }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "مرد" : "زن"}</span>
        <span>{item.anme}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span>{item.status}</span>
        <span>-{item.species}</span>
      </div>
      <button className="icon red">icone eye</button>
    </div>
  );
};

export default CharacterList;
