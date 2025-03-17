import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/main.scss";

const Main = () => {
  const [eduList, setEduList] = useState([]);
  const categories = [
    "전체",
    "개발프로그래밍",
    "게임개발",
    "데이터사이언스",
    "인공지능",
    "보안네트워크",
    "기타",
  ];
  const navigate = useNavigate();

  // URL 해시 값에서 카테고리 가져오기
  const getHashCategory = () => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    return categories.includes(hash) ? hash : "전체";
  };

  // [1] 선택된 카테고리 상태값
  const [selCate, setSelCate] = useState(getHashCategory());

  // [2] 해시 변경 시 카테고리 업데이트
  useEffect(() => {
    const handleHashChange = () => {
      setSelCate(getHashCategory());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // [3] 데이터 불러오기
  useEffect(() => {
    fetch("/data/edu_data.json")
      .then((res) => res.json())
      .then(setEduList)
      .catch(console.error);
  }, []);

  // [4] 가격 형식 변환 함수
  const formatPrice = (price) =>
    price.includes("₩")
      ? `₩${Number(price.replace("₩", "")).toLocaleString()}`
      : price;

  // [5] 선택된 카테고리에 따라 필터링된 강의 리스트
  const filterList =
    selCate === "전체"
      ? eduList
      : eduList.filter(({ gCate }) => gCate === selCate);

  // [6] 카테고리 버튼 클릭 시 URL 해시 변경
  const handleCategoryClick = (category) => {
    window.location.hash = category;
  };

  // [7] 장바구니 버튼 클릭 이벤트
  const cartBtnFn = (e) => {
    //링크막기
    e.preventDefault();
    console.log("장바구니 버튼 클릭!", e.currentTarget);
    return false;
  };

  return (
    <div className="main-wrap">
      <h2>{selCate}</h2>
      <ul className="edu-menu">
        {categories.map((category, i) => (
          <li key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={selCate === category ? "active" : ""}>
              <img src={`./images/main/icon${i}.svg`} alt={category} />
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
                <img
                  src={`/images/edu_thumb/${edu.idx}.png`}
                  alt={`강의 이미지 ${edu.idx}`}
                />
              </picture>
            </article>
            <h3>{edu.gName}</h3>
            <p>레벨: {edu.gLevel}</p>
            <p>가격: {formatPrice(edu.gPrice)}</p>
            <span className="hover-txt">
              <p className="ginfo">설명: {edu.gInfo}</p>
              <p>분류: {edu.gSkill}</p>
              <a className="cart-btn" onClick={cartBtnFn} href="#">
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
