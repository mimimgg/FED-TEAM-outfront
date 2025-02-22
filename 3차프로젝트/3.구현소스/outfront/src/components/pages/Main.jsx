/// 메인페이지 컴포넌트 : Main.jsx ///
import React, { useState, useEffect } from "react";
import "../../scss/main.scss";

const Main = () => {
  const [eduList, setEduList] = useState([]);

  useEffect(() => {
    fetch("./data/edu_data.json")
      .then((res) => res.json())
      .then(setEduList)
      .catch(console.error);
  }, []);

  return (
    <main className="main">
      <h1>🎓 교육 강의 목록</h1>
      <ul className="list-wrap">
        {eduList.map((edu) => (
          <li key={edu.idx} className="edu-list">
            <article>
              <picture>
                <img
                  src={`/images/edu_thumb/${edu.idx}.png`}
                  alt={`교육 이미지 ${edu.idx}`}
                />
              </picture>
            </article>
            <h3>{edu.gName}</h3>
            <p>레벨: {edu.gLevel}</p>
            <p>가격: {edu.gPrice}</p>
            <span className="hover-txt">
              <p>설명: {edu.gInfo}</p>
              <p>분류: {edu.gCate}</p>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
