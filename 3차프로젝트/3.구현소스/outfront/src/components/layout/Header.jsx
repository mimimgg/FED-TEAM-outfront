import {Link} from "react-router-dom";
import "../../scss/header.scss";
import gnbMenu from "../../js/data/gnb";
import {memo, useContext, useEffect, useState} from "react";
// import asideMenu from "../../js/data/aside";
import {dCon} from "../modules/dCon";

let logged = false;
logged = true;

const Header = memo(({goPage, loginSts, setLoginSts}) => {
  const [isOpenGnb, setIsOpenGnb] = useState(false);
  const [openSnb, setOpenSnb] = useState(null);
  // const asideKey = logged ? "user" : "guest";

  // 검색어 상태 관리
  const [searchKeyword, setSearchKeyword] = useState("");

  // const myCon = useContext(dCon);

  // TODO: 메모이제이션
  console.log("상단영역렌더링");

  // 상단 추가 강의메뉴의 서브메뉴에 .open 클래스 추가
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setOpenSnb(null); // 다른 GNB 메뉴가 열려 있으면 닫기
    setIsOpen((prev) => !prev);
  };

  const handleClickGnb = (txt) => {
    // setOpenSnb(txt);
    setIsOpen(false); // 강의 메뉴 닫기
    setOpenSnb((prev) => (prev === txt ? null : txt)); // 클릭한 메뉴만 토글
  };

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

  // 검색 처리 함수 정의
  const handleSearch = () => {
    // 서브 메뉴 닫기
    closeGnb();
    // 검색 페이지로 이동
    goPage("search", {state: {keyword: searchKeyword}});
  };

  // 검색 처리 함수 정의
  const handleClick = () => {
    // 서브 메뉴 닫기
    closeGnb();
    // 검색 페이지로 이동
    goPage("goPage", {state: {keyword: searchKeyword}});
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      document.querySelectorAll(".snb").forEach((el) => el.classList.remove("open"));
    });
  }, []);

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
                    <li className="gnb-item">
                      <button type="button" id="top-edu-menu" className="gnb-button" onClick={toggleMenu}>
                        강의
                      </button>
                      <nav className={`snb edu-drop-menu ${isOpen ? "open" : ""}`}>
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
                                  <li
                                    key={`snb-menu-${snb.txt}`}
                                    className="sub-item"
                                    // onClick={handleClick}
                                  >
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
                    value={searchKeyword} // 검색어 상태 연결
                    onChange={(e) => setSearchKeyword(e.target.value)} // 입력값 변경 시 상태 업데이트
                    onKeyUp={(e) => {
                      e.preventDefault();
                      if (e.key === "Enter") {
                        handleSearch(); // 엔터 키를 눌렀을 때 검색 수행
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
            {
              // 로그인이 아닌 상태
              !loginSts && (
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
              loginSts && (
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
                      <Link to="/cart" className="aside-button icon">
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
              )
            }
          </aside>
        </div>
      </div>
    </header>
  );
});

export {Header};
