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
              <button type="text" className="delete-box">
                <a href="#" className="delete-txt">
                  선택삭제
                </a>
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
                  <h4>89,000원</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="pay-list"></div>
        </div>
      </div>
    </>
  );
};

export default CartList;
