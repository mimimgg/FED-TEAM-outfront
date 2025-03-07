import React from 'react';

import "../../scss/mypage.scss";

function Mypage() {
  return (
    <>
      <div className="mypage-wrap">
        <div className="mypage-top">
          <h2>OOO님의 마이페이지</h2>
          <picture>
            <img src="./images/mypage/1.png" alt="profile" />
          </picture>
          <span>ID : testtest</span>
          <p><b>OOO</b>님 <b>아웃프런</b>에 오신것을 환영합니다 :) <br />
          <b>당장 공부하지 하지않으면 너의 인생이 망할 수도 있다!!</b></p>
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
      
    </>
  );
}

export default Mypage;