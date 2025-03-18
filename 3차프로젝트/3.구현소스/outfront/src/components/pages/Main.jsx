// 메인 컴포넌트 ./src/components/pages/Main.jsx
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../../scss/main.scss";
// 강의 json 데이터 불러오기
import eduData from "../../js/data/edu_data.json";

const Main = () => {
  const [eduList, setEduList] = useState(eduData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 페이지당 강의 개수
  const [sortType, setSortType] = useState("default"); // 정렬 타입
  const [levelFilter, setLevelFilter] = useState("all"); // 강의 레벨 필터

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

  const getHashCategory = () => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    return categories.includes(hash) ? hash : "전체";
  };

  const [selCate, setSelCate] = useState(getHashCategory());

  useEffect(() => {
    const handleHashChange = () => {
      setSelCate(getHashCategory());
      setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const formatPrice = (price) => {
    const priceNum = Number(price);
    return priceNum === 0 ? "무료" : `₩${priceNum.toLocaleString()}`;
  };

  // 선택된 카테고리에 맞게 필터링
  let filteredList =
    selCate === "전체" ? eduList : eduList.filter(({ gCate }) => gCate === selCate);

  // 레벨 필터 적용
  if (levelFilter !== "all") {
    filteredList = filteredList.filter(({ gLevel }) => gLevel === levelFilter);
  }

  // 정렬 적용
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortType === "name") {
      return a.gName.localeCompare(b.gName, "ko-KR");
    } else if (sortType === "low-price") {
      return a.gPrice - b.gPrice;
    } else if (sortType === "high-price") {
      return b.gPrice - a.gPrice;
    }
    return 0;
  });

  // 현재 페이지에 맞는 강의 리스트 가져오기
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentList = sortedList.slice(startIdx, endIdx); // 정렬된 리스트 사용

  // 총 페이지 수 계산
  const totalPages = Math.ceil(sortedList.length / itemsPerPage); // 정렬된 리스트로 계산

  // 페이지 이동 함수
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCategoryClick = (category) => {
    window.location.hash = category;
  };

  const cartBtnFn = (e) => {
    e.preventDefault();
    console.log("장바구니 버튼 클릭!", e.currentTarget);
    return false;
  };

  // 페이지 번호 5개씩 표시하는 로직
  const maxPageNumbers = 5; // 최대 5개의 페이지 번호 표시
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage < maxPageNumbers - 1) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="main-wrap">
      <h2>{selCate}</h2>
      <div className="sort-opt">
        {/* 강의 이름, 가격 sort 선택박스 (이름순/낮은가격/높은가격) */}
        <label>정렬</label>
        <select
          onChange={(e) => {
            setSortType(e.target.value);
            setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
          }}
          value={sortType}
        >
          <option value="default">기본 정렬</option>
          <option value="name">이름순 (가나다 순)</option>
          <option value="low-price">가격 낮은 순</option>
          <option value="high-price">가격 높은 순</option>
        </select>

        {/* 강의 레벨순 sort 선택박스 (입문/초급/중급/고급) */}
        <select
          onChange={(e) => {
            setLevelFilter(e.target.value);
            setCurrentPage(1); // 레벨 필터 변경 시 첫 페이지로 이동
          }}
          value={levelFilter}
        >
          <option value="all">전체 레벨</option>
          <option value="입문">입문</option>
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>
      </div>

      <ul className="edu-menu">
        {categories.map((category, i) => (
          <li key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={selCate === category ? "active" : ""}
            >
              <img src={`./images/main/icon${i}.svg`} alt={category} />
              {category}
            </button>
          </li>
        ))}
      </ul>

      <ul className="list-wrap">
        {currentList.map((edu) => (
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

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          <ol>
            <li onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              ⏮ 처음
            </li>
            <li onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              ◀ 이전
            </li>
            {pageNumbers.map((page) => (
              <li
                key={page}
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </li>
            ))}
            <li onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              다음 ▶
            </li>
            <li onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              마지막 ⏭
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default Main;
