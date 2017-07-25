import React from "react";
import MonsterCard from "./MonsterCard";

const MonsterList = ({ monsters }) => {
  console.log(monsters);
  const monsterList = monsters.map((monster, idx) =>
    <li key={idx}>
      <MonsterCard monster={monster} />
    </li>
  );

  return (
    <ul>
      {monsterList}
    </ul>
  );
};

export default MonsterList;
