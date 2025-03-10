import React, { useEffect, useState } from 'react';
import "../../scss/mypage.scss";

function Mypage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 세션 스토리지에서 로그인한 사용자 정보 가져오기
    const storedUser = sessionStorage.getItem("minfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="mypage-wrap">
      <div className="mypage-top">
        <h2>{userInfo ? `${userInfo.unm}님의 마이페이지` : "마이페이지"}</h2>
        <picture>
          <img src="./images/mypage/1.png" alt="profile" />
        </picture>
        <span>ID : {userInfo ? userInfo.uid : "로그인 필요!"}</span>
        <p>
          <b>{userInfo ? userInfo.unm : "비회원"}</b>님 😎 <b>아웃프런</b>에 오신 것을 환영합니다! 😍 <br />
          <b>당장 공부하지 않으면 당신의 인생이 망할 수도 있습니다!!</b>
        </p>
      </div>
      <hr />
      <div className="mypage-contents">
        <div className="box my-edu">
          <h3>내 학습</h3>
          <ul>
            <li></li>
          </ul>
        </div>
        <div className="box my-community">
          <h3>내 커뮤니티 게시글</h3>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
