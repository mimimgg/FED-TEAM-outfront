/// 상단영역 컴포넌트 : TopArea.jsx ///

import { Link } from "react-router-dom";

// import React from 'react';
import "../../scss/top_area.scss";

// GNB 데이터 불러오기 ////////
import { menu } from "../../js/data/gnb";

export default function TopArea() {
  // 리턴 코드구역 ////
  return (
    <>
      {/* 로고 */}
      <header className="top-area">
        <div className="navbar-left">
          <h1 className="brand_logo">
            <a href="#">
              <img src="../../images/header/brand_logo.png" alt="아웃프런 브랜드 로고" />
            </a>
          </h1>

          {/* 네비게이션 */}
          <nav className="gnb">
            <ul>
              {/* gnb 메뉴 맵 바인딩 */}
              {menu.map((v, i) => (
                <li key={i}>
                  {
                      <Link to={v.link}>{v.txt}</Link>
                  }
                  {
                    // 서브메뉴가 있는 경우 출력하기
                    v.sub && (
                      <div className="smenu">
                        <ol>
                          {v.sub.map((v, i) => (
                            <li key={i}>
                              <Link to={v.link}>{v.txt}</Link>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )
                  }
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 검색바 */}
        <div className="navbar-right">
          <div className="search-bar">
            <input
              type="search"
              id="user-search"
              name="query"
              placeholder="나의 진짜 성장을 도와줄 실무 강의를 찾아보세요"
            />
            <button type="submit">
              <img src="../../images/header/icon-search.png" alt="검색" />
            </button>
          </div>

          {/* 로그인 / 회원가입 */}

          <ul>
            <li>
              <a href="#">
                <img src="../../images/header/icon-login.png" alt="로그인" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../images/header/icon-cart.png" alt="수강바구니" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../../images/header/icon-user.png" alt="로그인 전 마이페이지" />
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
} // TopArea 컴포넌트 //
