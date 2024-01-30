import Character from "../../../components/character";
import axios from "axios";



const characterOcid = async (username : string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/id?character_name=${username}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-nxopen-api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    return response.data.ocid;
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
};

const characterInfo = async (ocid) => {
  const prevDate = new Date();
  const today = new Date(prevDate.setDate(prevDate.getDate() - 1));
  const date = today.toISOString().split('T')[0];
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/character/basic?ocid=${ocid}&date=${date}`;
  try {

    const res = await axios.get(url , {
      headers: {
        "Content-Type": "application/json",
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
  } catch (e) {
    console.log(e);
    return null;
  }
};

const characterStat = async (ocid) => {
  const prevDate = new Date();
  const today = new Date(prevDate.setDate(prevDate.getDate() - 1));
  const date = today.toISOString().split('T')[0];
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/character/stat?ocid=${ocid}&date=${date}`;
  try {

    const res = await axios.get(url , {
      headers: {
        "Content-Type": "application/json",
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
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getCharacterData = async (username : string) => {
  const ocid = await characterOcid(username);
  const infoData = await characterInfo(ocid);
  const statData = await characterStat(ocid);
  const result = { ...infoData, stat : statData };
  return result;
};

const getCharacter = async (username: string) => {
  const data = await getCharacterData(username);
  return data;
};




const ranking = async (
  { params: { username } }: { params: { username: string } }
) => {
  const character = await getCharacter(username);
  return (
    <div>
      <Character { ...character} />
    </div>
  );
};

export default ranking;
