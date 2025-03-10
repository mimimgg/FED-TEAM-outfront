import { Link } from "react-router-dom";
import "../../scss/header.scss";
import gnbMenu from "../../js/data/gnb";
import { useEffect, useState } from "react";
import asideMenu from "../../js/data/aside";

let logged = false;
logged = true;

const Header = () => {
  // TODO: logged useState로 로그인 상태 임시 분기 처리. 추후 수정 필요
  const [logged, setLogged] = useState(true);
  const [isOpenGnb, setIsOpenGnb] = useState(false);
  const [openSnb, setOpenSnb] = useState(null);
  const asideKey = logged ? "user" : "guest";

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

  useEffect(() => window.addEventListener("resize", closeGnb), []);

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
                <form className="search-form">
                  <input
                    id="search"
                    name="search"
                    type="search"
                    className="search-input"
                    placeholder="나의 진짜 성장을 도와줄 실무 강의를 찾아보세요"
                  />
                  <button type="submit" className="search-submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <aside className="aside">
            <ul className="aside-list">
              {asideMenu[asideKey].map((aside) => (
                <li key={`aside-menu-${aside.txt}`} className="aside-item">
                  <Link to={aside.link} className="aside-button">
                    {aside.txt}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </header>
  );
};

export default Header;
