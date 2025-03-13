import React from "react";
import { useLocation } from "react-router-dom";

import eduData from "../../js/data/edu_data.json";
import "../../scss/pages/search.scss";

/********************************************************
 * [ 요구사항 ]
 * 1. 데스크탑버전에서 검색하면 검색결과에 맞는 사진이 나와야 함
 * 2. 모바일버전에서 검색하면 드롭창이 자동으로 닫히고 결과가 보여야 함
********************************************************/

function SearchPage() {
  const { state } = useLocation();
  const keyword = state ? state.keyword : "검색어 없음";
  const selData = eduData.filter((v) => {
    if (v.gName.indexOf(keyword) !== -1 || v.gInfo.indexOf(keyword) !== -1) return true;
  });

  const formatPrice = (price) => (price.includes("₩") ? `₩${Number(price.replace("₩", "")).toLocaleString()}` : price);
  const cartBtnFn = (e) => {
    const el = e.currentTarget;
    console.log("장바구니 버튼 클릭!", el);
  };
  console.log(keyword, selData);

  return (
    <div className="search-result">
      <h2 className="search-title">
        <span>"{keyword}"</span>의 검색결과입니다.
      </h2>
      <section className="search-wrap">
          {selData.map((v, i) => (
            <div key={v.eduId} className="search-edu">
              <div className="search-image">
                <img src={`./images/edu_thumb/${i + 1}.png`} alt={`강의 이미지${i + 1}`} />
              </div>
              <h3 className="search-tit">{v.gName}</h3>
              <p>레벨: {v.gLevel}</p>
              <p>가격: {formatPrice(v.gPrice)}</p>
              <p className="search-desc">설명: {v.gInfo}</p>
              <p>분류: {v.gSkill}</p>
              <a className="cart-btn" onClick={cartBtnFn} href="#none">
                <i className="fa-solid fa-cart-shopping"></i>
              </a>
            </div>
          ))}
      </section>
    </div>
  );
}

export default SearchPage;
