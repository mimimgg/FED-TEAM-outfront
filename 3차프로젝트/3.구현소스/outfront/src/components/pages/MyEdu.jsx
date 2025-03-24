// MyEdu.jsx
import React from "react";
import "../../scss/myedu.scss";

function MyEdu(props) {
  return (
    <>
      <div className="my-edu-wrap">
        <h2>내학습</h2>
        <ul className="myedu-list">
          <li>
            <picture>
              <img src="./images/edu_thumb/1.png" alt="강의 이미지 1" />
            </picture>
            <h4>김영한의 자바 입문 - 코드로 시작하는 자바 첫걸음</h4>
            <p>학습중(60%)</p>
            <button className="my-review-btn">
              <span className="star-grade2">
                평점 (
                <img src="./images/main/star.png" alt="별" width="8px" />
                <img src="./images/main/star.png" alt="별" width="8" /> 4.5)
              </span>
            </button>
          </li>
          <li>
            <picture>
              <img src="./images/edu_thumb/2.png" alt="강의 이미지 2" />
            </picture>
            <h4>프로그래밍 시작하기 : 파이썬 입문 (Inflearn Original)</h4>
            <p>완강(100%)</p>
            <button className="my-review-btn">수강평작성</button>
          </li>
          <li>
            <picture>
              <img src="./images/edu_thumb/2.png" alt="강의 이미지 2" />
            </picture>
            <h4>[개발부터 수익화까지] AI로 코드 한 줄 짜지 않고 만드는 IT 올인원 실전 프로젝트!</h4>
            <p>학습전(0%)</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MyEdu;
