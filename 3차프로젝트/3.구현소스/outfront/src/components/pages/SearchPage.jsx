import React from "react";
import { useLocation } from "react-router-dom";

import eduData from "../../js/data/edu_data.json";
import "../../scss/pages/search.scss";

function SearchPage() {
  const { state } = useLocation();
  const keyword = state ? state.keyword : "검색어 없음";
  const selData = eduData.filter((v) => {
    if (v.gName.indexOf(keyword) !== -1 || v.gInfo.indexOf(keyword) !== -1) return true;
  });

  console.log(keyword, selData);

  return (
    <div className="search-result">
      <h2 className="search-title">
        <span>"{keyword}"</span>
        의 검색결과입니다.</h2>
      <section className="search-wrap">
        {selData.map((v, i) => (
          <div key={v.eduId}>
            <div className="search-image">
              <img src={`./images/edu_thumb/${i+1}.png`} />
            </div>
            <h3 className="search-tit">{v.gName}</h3>
            <h4 className="search-desc">{v.gInfo}</h4>
            <h5 className="search-level">{v.gLevel}</h5>
          </div>
        ))}
      </section>
    </div>
  );
}

export default SearchPage;
