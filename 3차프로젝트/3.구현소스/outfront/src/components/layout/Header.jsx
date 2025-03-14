import { Link } from "react-router-dom";
import "../../scss/header.scss";
import gnbMenu from "../../js/data/gnb";
import { useContext, useEffect, useState } from "react";
// import asideMenu from "../../js/data/aside";
import { dCon } from "../modules/dCon";

/***********************************************
 * 요구사항 
 * 1. pc버전에서 gnb 메뉴 클릭 후 모바일버전으로 사이즈를 줄이면 sbtn이 노출되는 현상
 * 
***********************************************/

let logged = false;
logged = true;

const Header = () => {
  const [isOpenGnb, setIsOpenGnb] = useState(false);
  const [openSnb, setOpenSnb] = useState(null);
  const asideKey = logged ? "user" : "guest";

  const myCon = useContext(dCon);

  // TODO: 메모이제이션
  console.log("상단영역렌더링");

  const handleClickGnb = (txt) => setOpenSnb(txt);

  const handleOpenGnb = () => {
    setIsOpenGnb(true);
    document.body.style.overflow = "hidden";
  };

  const closeGnb = () => {
    setIsOpenGnb(false);
    setOpenSnb(null);
    document.body.style.overflow = "auto";
  };

  const handleCloseGnb = (e) => {
    if (e.currentTarget === e.target) closeGnb();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-content-box">
            <h1 className="logo">
              <Link to="/">
                <img src="../../images/common/brand_logo.png" alt="아웃프런 브랜드 로고" className="logo-img" />
              </Link>
            </h1>
            <div className={`gnb-container ${isOpenGnb ? "open" : "close"}`} onClick={handleCloseGnb}>
              <button type="button" className="mobile-gnb-button" onClick={handleOpenGnb}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <div className="gnb-content">
                <nav className="gnb">
                  <ul className="gnb-list">
                    {gnbMenu.map((gnb) => (
                      <li key={`gnb-menu-${gnb.txt}`} className="gnb-item">
                        {gnb.sub ? (
                          <>
                            <button type="button" className="gnb-button" onClick={() => handleClickGnb(gnb.txt)}>
                              {gnb.txt}
                            </button>
                            <nav className={`snb ${openSnb === gnb.txt ? "open" : ""}`}>
                              <ul className="snb-list">
                                {gnb.sub.map((snb) => (
                                  <li key={`snb-menu-${snb.txt}`} className="sub-item">
                                    <Link to={snb.link} className="snb-button">
                                      {snb.txt}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </nav>
                          </>
                        ) : (
                          <Link className="gnb-button" to={gnb.link}>
                            {gnb.txt}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
                <section className="search-form">
                  <input
                    id="search"
                    name="search"
                    type="search"
                    className="search-input"
                    placeholder="나의 진짜 성장을 도와줄 실무 강의를 찾아보세요"
                    onKeyUp={(e) => {
                      e.preventDefault();
                      if (e.key === "Enter") {
                        console.log(e.target.value);
                        myCon.goPage("search", { state: { keyword: e.target.value } });
                      }
                    }}
                  />
                  <button type="submit" className="search-submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </section>
              </div>
            </div>
          </div>
          <aside className="aside">
            {
              // 로그인이 아닌 상태
              !myCon.loginSts && (
                <ul className="aside-list">
                  <li className="aside-item">
                    <Link to="/login" className="aside-button">
                      로그인
                    </Link>
                  </li>
                  <li className="aside-item">
                    <Link to="/join" className="aside-button">
                      회원가입
                    </Link>
                  </li>
                  <li className="aside-item">
                    <Link to="/cart" className="aside-button icon">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                  </li>
                </ul>
              )
            }
            {
              // 로그인 상태
              myCon.loginSts && (
                <ul className="aside-list">
                  <div>
                    <li className="aside-item">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          myCon.setLoginSts(null);
                          sessionStorage.removeItem("minfo");
                          myCon.goPage("/");
                        }}
                        className="logout"
                      >
                        로그아웃
                      </a>
                    </li>
                    <li className="aside-item">
                      <Link to="/cart" className="aside-button icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                      </Link>
                    </li>
                    <li className="aside-item">
                      <Link to="/mypage" className="aside-button logo-icon">
                        <img
                          src="https://cdn.inflearn.com/public/main/profile/default_profile.png"
                          alt="아웃프런마이페이지"
                        />
                      </Link>
                    </li>
                  </div>
                </ul>
              )
            }
          </aside>
        </div>
      </div>
    </header>
  );
};

export default Header;
