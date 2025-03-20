import { Link, useLocation } from "react-router-dom";
import "../../scss/header.scss";
import gnbMenu from "../../js/data/gnb";
import { memo, useEffect, useState } from "react";

const Header = memo(({ goPage, loginSts, setLoginSts }) => {
  const location = useLocation(); // 현재 경로를 가져옴
  const [isOpenGnb, setIsOpenGnb] = useState(false);
  const [openSnb, setOpenSnb] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  // 햄버거 메뉴가 열려 있을 때 경로가 변경되면 닫기
  useEffect(() => {
    setIsOpenGnb(false); // 경로가 변경될 때 햄버거 메뉴 닫기
    setOpenSnb(null); // 모든 서브 메뉴를 닫기
  }, [location]);

  const toggleMenu = () => {
    setOpenSnb((prev) => (prev === '강의' ? null : '강의')); // 강의 메뉴 토글
  };

  const handleClickGnb = (txt) => {
    setOpenSnb((prev) => (prev === txt ? null : txt)); // 클릭한 메뉴만 토글
  };

  const handleOpenGnb = () => {
    setIsOpenGnb(true);
    document.body.style.overflow = "hidden";
  };

  const closeGnb = () => {
    setIsOpenGnb(false);
    setOpenSnb(null); // 서브 메뉴 닫기
    document.body.style.overflow = "auto";
  };

  const handleCloseGnb = (e) => {
    if (e.currentTarget === e.target) closeGnb();
  };

  const handleSearch = () => {
    closeGnb();
    goPage("search", { state: { keyword: searchKeyword } });
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setOpenSnb(null); // 화면 크기 조정 시 서브 메뉴 닫기
    });
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-content-box">
            <h1 className="logo">
              <a href="/">
                <img src="../../images/common/brand_logo.png" alt="아웃프런 브랜드 로고" className="logo-img" />
              </a>
            </h1>
            <div className={`gnb-container ${isOpenGnb ? "open" : "close"}`} onClick={handleCloseGnb}>
              <button type="button" className="mobile-gnb-button" onClick={handleOpenGnb}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <div className="gnb-content">
                <nav className="gnb">
                  <ul className="gnb-list">
                    <li className="gnb-item">
                      <button type="button" className="gnb-button" onClick={toggleMenu}>
                        강의
                      </button>
                      <nav className={`snb ${openSnb === '강의' ? "open" : ""}`}>
                        <ul className="snb-list">
                          <li className="sub-item">
                            <a className="snb-button" href="/#전체">
                              전체
                            </a>
                          </li>
                          <li className="sub-item">
                            <a className="snb-button" href="/#개발프로그래밍">
                              개발프로그래밍
                            </a>
                          </li>
                          <li className="sub-item">
                            <a className="snb-button" href="/#게임개발">
                              게임개발
                            </a>
                          </li>
                          <li className="sub-item">
                            <a className="snb-button" href="/#인공지능">
                              인공지능
                            </a>
                          </li>
                          <li className="sub-item">
                            <a className="snb-button" href="/#보안네트워크">
                              보안네트워크
                            </a>
                          </li>
                          <li className="sub-item">
                            <a className="snb-button" href="/#기타">
                              기타
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </li>
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
                    type="text"
                    className="search-input"
                    placeholder="나의 진짜 성장을 도와줄 실무 강의를 찾아보세요"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyUp={(e) => {
                      e.preventDefault();
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <button type="button" className="search-submit" onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </section>
              </div>
            </div>
          </div>
          <aside className="aside">
            {!loginSts && (
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
                  <Link to="/cartlist" className="aside-button icon">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                </li>
              </ul>
            )}
            {loginSts && (
              <ul className="aside-list">
                <div>
                  <li className="aside-item">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setLoginSts(null);
                        sessionStorage.removeItem("minfo");
                        goPage("/");
                      }}
                      className="logout">
                      로그아웃
                    </a>
                  </li>
                  <li className="aside-item">
                    <Link to="/cartlist" className="aside-button icon">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                  </li>
                  <li className="aside-item">
                    <Link to="/mypage" className="aside-button logo-icon">
                      <img src="https://cdn.inflearn.com/public/main/profile/default_profile.png" alt="아웃프런마이페이지" />
                    </Link>
                  </li>
                </div>
              </ul>
            )}
          </aside>
        </div>
      </div>
    </header>
  );
});

export { Header };
