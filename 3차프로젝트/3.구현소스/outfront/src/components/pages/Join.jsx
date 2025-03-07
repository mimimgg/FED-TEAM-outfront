// 회원가입 컴포넌트 : Join.jsx //

import React from "react";

// 회원가입 scss 불러오기
import "../../scss/pages/join.scss";
import { Link } from "react-router-dom";

function Join() {
  // 코드리턴
  return (
    <>
      <div className="join-page">
        <div className="join-top">
          <h2 className="join-title">회원가입</h2>
          {/* <ul className="maquee">
            <li>아웃프런에서 학습한 역량을 펼쳐보세요</li>
            <li>나의 온라인 사수, 아웃프런</li>
            <li>아웃프런에서 다양한 학습의 기회를 얻으세요</li>
            <li>나의 커리어 메이트, 아웃프런</li>
          </ul> */}
        </div>

        <form action="process.php" mathod="post" className="join-form">
          <ul>
            <li className="join-id">
              <label>아이디</label>
              <input type="text" maxLength="15" placeholder="아이디를 입력하세요" />
            </li>
            <li className="join-pass">
              <label>비밀번호</label>
              <input type="password" maxLength="20" placeholder="비밀번호를 입력하세요" />
            </li>
            <li className="join-pass-confirm">
              <label>비밀번호 확인</label>
              <input type="password" maxLength="20" placeholder="비밀번호를 다시 입력하세요" />
            </li>
            <li className="join-name">
              <label>이름</label>
              <input type="text" maxLength="8" placeholder="성함을 입력하세요" />
            </li>
            <li className="join-name">
              <label>이메일</label>
              <input type="text" maxLength="50" placeholder="이메일을 입력하세요" />
            </li>
            <li>
              <button className="submit">가입하기</button>
            </li>
            <ul className="join-already">
              <li>이미 회원이신가요?</li>
              <li><Link to="/login">로그인하기</Link></li>
            </ul>
          </ul>
        </form>
      </div>
    </>
  );
}

export default Join;
