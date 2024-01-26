import axios from "axios";
import exp from "constants";

const characterOcid = async () => {
  const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/id", {
    params: {
      character_name :"얌챤우"
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
  
  const temp = {};
  temp['name'] = res.data.character_name;
  temp['class'] = res.data.character_class;
  temp['img'] = res.data.character_image;
  temp['level'] = res.data.character_level;
  temp['server'] = res.data.world_name;
  temp['guild'] = res.data.character_guild_name;
  temp['date'] = res.data.date;
  temp['exp'] = res.data.character_exp_rate;
  return temp;
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
  
  if (res.data.character_class === '제논' || res.data.character_class === '데몬어벤져') {
    if (res.data.character_class === '제논') {
      const result = res.data.final_stat.slice(16, 20).filter((item) => {
        if (!(item.stat_name === 'INT')) return item;
      });
      return result.reduce((acc, cur) => {
        const temp = cur.stat_name + ' : ' + cur.stat_value + ' | ';
        return acc + temp;
      }, '').slice(0, -3);
    } else {
      const result = res.data.final_stat[20];
      return result.stat_value;
    }
  }
  const result = res.data.final_stat.slice(16, 20).sort((a, b) => b.stat_value - a.stat_value);
  return result[0].stat_value;
};

const getCharacterData = async () => {
  const ocid = await characterOcid();
  const infoData = await characterInfo(ocid);
  const statData = await characterStat(ocid);
  return [ infoData, statData ];
};

export default getCharacterData;
