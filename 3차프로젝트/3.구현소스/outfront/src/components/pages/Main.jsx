/// 메인페이지 컴포넌트 : ./src/components/pages/Main.jsx ////
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../../scss/main.scss";

const Main = () => {
  const [eduList, setEduList] = useState([]);
  const categories = ["전체", "개발프로그래밍", "게임개발", "데이터사이언스", "인공지능", "보안네트워크", "기타"];
  const [selCate, setSelCate] = useState("전체");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/edu_data.json")
      .then((res) => res.json())
      .then(setEduList)
      .catch(console.error);
  }, []);

  const formatPrice = (price) => (price.includes("₩") ? `₩${Number(price.replace("₩", "")).toLocaleString()}` : price);

  const filterList = selCate === "전체" ? eduList : eduList.filter(({gCate}) => gCate === selCate);

  const cartBtnFn = (e) => {
    const el = e.currentTarget;
    console.log("장바구니 버튼 클릭!", el);
  };

  return (
    <div className="main-wrap">
      <ul className="edu-menu">
        {categories.map((category, i) => (
          <li key={category}>
            <button onClick={() => setSelCate(category)} className={selCate === category ? "active" : ""}>
              <img src={`./images/main/icon${i}.svg`} />
              {category}
            </button>
          </li>
        ))}
      </ul>
      <ul className="list-wrap">
        {filterList.map((edu) => (
          <li key={edu.idx} className="edu-list">
            <article onClick={() => navigate(`/detail/${edu.idx}`)}>
              <picture>
                <img src={`/images/edu_thumb/${edu.idx}.png`} alt={`강의 이미지 ${edu.idx}`} />
              </picture>
            </article>
            <h3>{edu.gName}</h3>
            <p>레벨: {edu.gLevel}</p>
            <p>가격: {formatPrice(edu.gPrice)}</p>
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
