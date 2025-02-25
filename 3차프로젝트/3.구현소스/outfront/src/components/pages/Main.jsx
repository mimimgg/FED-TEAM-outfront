/// 메인페이지 컴포넌트 : Main.jsx ///
import React, {useState, useEffect} from "react";
import "../../scss/main.scss";

const Main = () => {
  const [eduList, setEduList] = useState([]);

  useEffect(() => {
    fetch("/data/edu_data.json")
      .then((res) => res.json())
      .then(setEduList)
      .catch(console.error);
  }, []);

  const cartBtnFn = () => {
    console.log("장바구니 버튼 클릭!");
  };

  return (
    <div className="main-wrap">
      <ul className="edu-menu">
        <li>
          <a href="#none">전체</a>
        </li>
        <li>
          <a href="#none">개발프로그래밍</a>
        </li>
        <li>
          <a href="#none">게임개발</a>
        </li>
        <li>
          <a href="#none">데이터사이언스</a>
        </li>
        <li>
          <a href="#none">인공지능</a>
        </li>
        <li>
          <a href="#none">보안네트워크</a>
        </li>
        <li>
          <a href="#none">기타</a>
        </li>
      </ul>
      <ul className="list-wrap">
        {eduList.map((edu) => (
          <li key={edu.idx} className="edu-list">
            <article>
              <picture>
                <img src={`/images/edu_thumb/${edu.idx}.png`} alt={`교육 이미지 ${edu.idx}`} />
              </picture>
            </article>
            <h3>{edu.gName}</h3>
            <p>레벨: {edu.gLevel}</p>
            <p>가격: {edu.gPrice}</p>
            <span className="hover-txt">
              <p className="ginfo">설명: {edu.gInfo}</p>
              <p>분류: {edu.gSkill}</p>
              <a className="cart-btn" onClick={cartBtnFn} href="#none">
                <i className="fa-solid fa-cart-shopping"></i>
              </a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
