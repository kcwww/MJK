"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import getCharacterData  from "../utils/characterData";



const Character = () => {

  const [character, setCharacter] = useState({
    name : "",
    class : "",
    img : "",
    level : 0,
    server : "",
    guild : "",
    date : "",
    exp : "",
    stat_value : "",
  });

  

  const setProperty = (data, statData) => {
    const date = data.date.split('T')[0];
    setCharacter((prev) => ({
      ...prev,
      name: data.name,
      class: data.class,
      img: data.img,
      level: data.level,
      server: data.server,
      guild: data.guild,
      date: date,
      exp: data.exp,
      stat_value: statData,
    }));
  };

  

  const getCharacter = async () => {
    const [infoData, statData ] = await getCharacterData();

    setProperty(infoData, statData);
  };
  

  useEffect(() => {
    getCharacter();
  }, []);


  return (
    <div>
      <img src={character.img} alt="character" />
      <p>닉네임 : {character.name}</p>
      <p>직업 : {character.class}</p>
      <p>레벨 : {character.level}</p>
      <p>서버 : {character.server}</p>
      <p>길드 : {character.guild}</p>
      <p>최신 데이터 날짜 : {character.date}</p>
      <p>경험치 비율 : {character.exp}</p>
      <p>스탯 : {character.stat_value}</p>
    </div>
  );
};

export default Character;
