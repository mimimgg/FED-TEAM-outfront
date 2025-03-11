import React, { useEffect, useState } from "react";
import "../../scss/mypage.scss";

function Mypage() {
  const [userInfo, setUserInfo] = useState(null);
  const [userEduList, setUserEduList] = useState([]); // 로그인한 사용자의 학습 목록

  useEffect(() => {
    // 세션 스토리지에서 로그인한 사용자 정보 가져오기
    const storedUser = sessionStorage.getItem("minfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // 로그인한 사용자의 학습 정보 가져오기
    if (userInfo) {
      fetch("/data/user_data.json")
        .then((res) => res.json())
        .then((data) => {
          // 현재 로그인한 사용자의 데이터 찾기
          const currentUser = data.find(user => user.uid === userInfo.uid);
          if (currentUser) {
            setUserEduList(currentUser.eduIng); // 학습 목록 저장
          }
        })
        .catch(console.error);
    }
  }, [userInfo]); // userInfo가 설정된 후 실행

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
        {/* 내 학습 */}
        <div className="box my-edu">
          <h3>
            <a href="/myedu">내 학습</a>
            <a href="/myedu">
              <span>more</span>
            </a>
          </h3>
          <ul className="myedu-list">
            {/* 학습 목록 출력 */}
            {userEduList.length > 0 ? (
              userEduList.map((edu) => (
                <li key={edu.eduId}>
                  <picture>
                    <img src={`/images/edu_thumb/${edu.eduId}.png`} alt={`강의 이미지 ${edu.eduId}`} />
                  </picture>
                  <h4>{edu.eduName}</h4>
                  <p>{edu.eduType} ({edu.eduRate}%)</p>
                  {/* 진행률 60% 이상일 때만 버튼 표시 */}
                  {parseInt(edu.eduRate) >= 60 && (
                    <button className="my-review-btn">수강평 작성</button>
                  )}
                </li>
              ))
            ) : (
              <li>학습중인 강의가 없습니다.</li>
            )}
          </ul>
        </div>

        {/* 내 커뮤니티 게시글 */}
        <div className="box my-community">
          <h3>
            <a href="#none">내 커뮤니티 게시글</a>
            <a href="#none">
              <span>more</span>
            </a>
          </h3>
          <ul>
            <li>작성한 게시글이 없습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
