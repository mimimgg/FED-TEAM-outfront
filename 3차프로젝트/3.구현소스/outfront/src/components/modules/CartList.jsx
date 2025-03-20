// CartList.jsx
import React from "react";
import "../../scss/pages/cart.scss";

const CartList = ({}) => {
  return (
    <>
      <div className="basket-container">
        <h2 className="basket-title">수강바구니</h2>

        <div className="basket-wrap">
          <div className="basket-list">
            <div className="basket-select">
              <div className="select-box">
                <input type="checkbox" className="checkbtn checkttl" />
                <div className="select-title">
                  <p className="select-txt">전체선택</p>
                  <p className="select-num">
                    <span>3</span>/3
                  </p>
                </div>
              </div>
              <button type="button" className="border-box">
                선택삭제
              </button>
            </div>
            <div className="edu-list-container">
              <div className="edu-list-wrap">
                <div className="edu-list-left">
                  <input type="checkbox" className="checkbtn" />
                  <img src="images/edu_thumb/1.png" alt="이미지" className="edu-img" />
                  <ul className="text-box">
                    <li className="gname">gName</li>
                    <ol className="cat-box">
                      <li className="gcate">gCate</li>
                      <li className="glavel">gLevel</li>
                      <li className="gskill">gSkill</li>
                    </ol>
                  </ul>
                </div>
                <div className="edu-list-right">
                  <h4>gPrice</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="pay-list">
            <div className="pay-title">
              <h5>구매자정보</h5>
              <button type="text" className="border-box">
                <a href="#" className="border-txt">
                  수정
                </a>
              </button>
            </div>
            <div className="horizon"></div>
            <div className="user-desc">
              <div className="user">
                <p className="user-title">아이디</p>
                <p className="user-desc">ID</p>
              </div>
              <div className="user">
                <p className="user-title">이름</p>
                <p className="user-desc">name</p>
              </div>
              <div className="user">
                <p className="user-title">이메일</p>
                <p className="user-desc">email</p>
              </div>
            </div>
            <div className="horizon"></div>
            <div className="total-price">
              <div className="total-desc">
                <p>총 결제금액</p>
                <span>total price</span>
              </div>
              <button className="submit">결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
