import React from 'react';

import "../../scss/mypage.scss";

function Mypage() {
  return (
    <>
      <div className="mypage-wrap">
        <div className="mypage-top">
          <h2>MYPAGE</h2>
          <picture>
            <img src="./images/mypage/1.png" alt="profile" />
          </picture>
          <span>ID : testtest</span>
          <p><b>이민경</b>님 <b>아웃프런</b>에 오신것을 환영합니다 :) <br />
          <b>당장 공부하지 하지않으면 너의 인생이 망할 수도 있다!!</b></p>
        </div>
        <hr />
      </div>
      
    </>
  );
}

export default Mypage;