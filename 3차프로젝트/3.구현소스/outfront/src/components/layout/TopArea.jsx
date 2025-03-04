// 상단영역 컴포넌트 : TopArea.jsx //

////////////////////////////////////////////////////////////////
// ❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓  //
// 1. 테블릿 버전에서 nav 으띃게 햐요?
//    구성) 드롭다운 시 search랑 gnb > sub 나와야 함
////////////////////////////////////////////////////////////////

import { Link } from "react-router-dom";
import "../../scss/top_area.scss";

// GNB 데이터
import { menu } from "../../js/data/gnb";
import "../../js/top_area.js";

export default function TopArea() {
  return (
    <>
      {/* 로고 */}
      <header className="top-area">
        <div className="navbar-left">
          <h1 className="brand_logo">
            <a href="#">
              <img src="../../images/common/brand_logo.png" alt="아웃프런 브랜드 로고" />
            </a>
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
                  {<Link to={v.link}>{v.txt}</Link>}
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
              <a className="login-btn top-btn" href="#">
                <i className="fa-solid fa-right-to-bracket"></i>
              </a>
            </li>
            <li>
              <a className="cart-btn top-btn" href="#">
                <i className="fa-solid fa-cart-shopping"></i>
              </a>
            </li>
            <li>
              <a className="user-btn top-btn" href="#">
                <i className="fa-regular fa-user"></i>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
} // TopArea 컴포넌트 //
