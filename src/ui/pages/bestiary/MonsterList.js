import React from "react";

const MonsterList = ({ monsters }) => {
  console.log(monsters);
  console.log(Object.keys(monsters));
  const monsterList = monsters.map((monster, idx) =>
    <li key={idx}>
      {monster.name}
    </li>
  );

  return (
    <ul>
      {monsterList}
    </ul>
  );
};

export default MonsterList;
