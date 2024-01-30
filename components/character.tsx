const Character = (props): JSX.Element => {
  
  return (
    <div>
      <img src={props.img} alt="character" />
      <p>닉네임 : {props.name}</p>
      <p>직업 : {props.class}</p>
      <p>레벨 : {props.level}</p>
      <p>서버 : {props.server}</p>
      <p>길드 : {props.guild}</p>
      <p>최신 데이터 날짜 : {props.date}</p>
      <p>경험치 비율 : {props.exp}</p>
      <p>스탯 : {props.stat}</p>
    </div>
  );
};

export default Character;
