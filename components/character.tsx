"use client";
import axios from "axios";
import { useEffect, useState } from "react";



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

  const temp = {
    name : "",
    class : "",
    img : "",
    level : 0,
    server : "",
    guild : "",
    date : "",
    exp : "",
    stat_value : "",
  };

  const setProperty = (data) => {
    const date = data.date.split('T')[0];
    setCharacter({
      name: data.character_name,
      class: data.character_class,
      img: data.character_image,
      level: data.character_level,
      server: data.world_name,
      guild: data.character_guild_name,
      date: date,
      exp: data.character_exp_rate,
      stat_value: data.stat_value,
    });
  };

  const fetch = async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/id", {
      params: {
        character_name :"빵빵한은수"
      },
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    return res.data.ocid;
  };

  const characterInfo = async (ocid) => {
    const prevDate = new Date();
    const today = new Date(prevDate.setDate(prevDate.getDate() - 1));
    const date = today.toISOString().split('T')[0];
    const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/character/basic" , {
      params: {
        ocid,
        date,
      },
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    setProperty(res.data);
  };

  const characterStat = async (ocid) => {
    const prevDate = new Date();
    const today = new Date(prevDate.setDate(prevDate.getDate() - 1));
    const date = today.toISOString().split('T')[0];
    const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/character/stat" , {
      params: {
        ocid,
        date,
      },
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    temp.stat_value = res.data.final_stat[19].stat_value;
  };
  const getCharacter = async () => {
    const ocid = await fetch();
    await characterInfo(ocid);
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
    </div>
  );
};

export default Character;
