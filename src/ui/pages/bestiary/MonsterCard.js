import React from "react";

const MonsterCard = ({ monster }) =>
  <div>
    <h1>
      {monster.name}
    </h1>
    <img src={`${process.env.PUBLIC_URL}/assets/monsters/${monster.image_filename}`} alt={`${monster.name}'s icon`} />
  </div>;

export default MonsterCard;
