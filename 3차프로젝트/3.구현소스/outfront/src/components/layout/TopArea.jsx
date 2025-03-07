// 상단영역 컴포넌트 : TopArea.jsx //

import { Link } from "react-router-dom";
import "../../scss/top_area.scss";

// GNB 데이터
import { menu } from "../../js/data/gnb";
import "../../js/top_area.js";
import MainArea from "./MainArea.jsx";

export default function TopArea() {
  return (
    <>
      {/* 로고 */}
      <header className="top-area">
        <div className="top-wrap">
          <div className="navbar-left">
            <h1 className="brand_logo">
              <Link to="/">
                <img src="../../images/common/brand_logo.png" alt="아웃프런 브랜드 로고" />
              </Link>
            </h1>
            <a href="#" className="top-menu-btn">
              <i className="fa-solid fa-bars"></i>
            </a>

            {/* 네비게이션 */}
            <nav className="gnb">
              <ul>
                {/* gnb 메뉴 맵 바인딩 */}
                {menu.map((v, i) => (
                  <li key={i}>
                    {v.sub ? (
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {v.txt}
                      </a>
                    ) : (
                      <Link to={v.link}>{v.txt}</Link>
                    )}
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

              {/* 배경요소 */}
              <div className="out-bg"></div>
            </nav>
            {/* 모바일 네비게이션 */}
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
              <button className="search-icon" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            {/* 로그인 / 회원가입 */}
            <ul className="right-icon">
              <li>
                <Link to={"/login"}>
                  <i className="top-btn fa-solid fa-right-to-bracket"></i>
                </Link>
              </li>
              <li>
                <a className="cart-btn top-btn" href="#">
                  <i className="fa-solid fa-cart-shopping"></i>
                </a>
              </li>
              <li>
                <Link to={"/mypage"}>
                  <i className="top-btn fa-regular fa-user"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
} // TopArea 컴포넌트 //
