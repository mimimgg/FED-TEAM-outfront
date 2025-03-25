import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dCon } from "./dCon"; // Context API import
import "../../scss/pages/cart.scss";

const CartList = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [userInfo, setUserInfo] = useState(
    sessionStorage.getItem("minfo") ? JSON.parse(sessionStorage.getItem("minfo")) : null
  );

  const [cartItem, setCartItem] = useState(
    localStorage.getItem("cart-info")
      ? JSON.parse(localStorage.getItem("cart-info")).filter((v) => {
          return v.gOwner === (userInfo ? userInfo.idx : 0);
        })
      : []
  );

  const [selectedItems, setSelectedItems] = useState(new Array(cartItem.length).fill(false));
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false); // 결제 완료 상태 추가

  const myCon = useContext(dCon);

  // 결제하기 핸들러
  const handleCheckout = () => {
    const selectedItemsToCheckout = cartItem.filter((_, index) => selectedItems[index]);

    if (selectedItemsToCheckout.length > 0) {
      // 결제한 강의 정보만 추출하여 필요한 데이터 구조로 변환
      const coursesToSave = selectedItemsToCheckout.map((item) => ({
        eduId: item.idx, // 강의 ID
        eduName: item.gName, // 강의 이름
        eduState: "수강중", // 강의 상태
        eduRate: 0, // 강의 비율 (예시로 0으로 설정)
        gPrice: item.gPrice, // 강의 가격
      }));

      // 로컬 스토리지에서 기존 결제한 강의 목록 가져오기
      const existingUserEducation = localStorage.getItem("user-education");
      const existingCourses = existingUserEducation ? JSON.parse(existingUserEducation) : [];

      // 새로운 강의 목록을 기존 목록에 추가
      const updatedCourses = [...existingCourses, ...coursesToSave];

      // 업데이트된 강의 목록을 로컬 스토리지에 저장
      localStorage.setItem("user-education", JSON.stringify(updatedCourses));

      // 장바구니 업데이트
      const updatedCartItems = cartItem.filter((_, index) => !selectedItems[index]);
      setCartItem(updatedCartItems);
      localStorage.setItem("cart-info", JSON.stringify(updatedCartItems)); // 로컬 스토리지 업데이트

      // 선택 상태 초기화
      setSelectedItems(new Array(cartItem.length).fill(false));

      // 카트정보 업데이트하기
      myCon.setCartInfo(updatedCartItems.length === 0 ? null : updatedCartItems);

      // 결제 완료 메시지
      alert("결제가 완료되었습니다."); // alert로 메시지 표시

      // 마이페이지로 이동
      navigate("/mypage"); // 결제 완료 후 마이페이지로 이동
    }
  };

  // 총 결제 금액 계산
  const totalPrice = selectedItems.reduce((total, isSelected, index) => {
    if (isSelected) {
      return total + Number(cartItem[index].gPrice);
    }
    return total;
  }, 0);

  // 총 결제 금액 텍스트 설정
  let totalPriceText = "";
  if (totalPrice === 0 && selectedItems.filter(Boolean).length > 0) {
    totalPriceText = "무료";
  } else if (totalPrice > 0) {
    totalPriceText = `₩${totalPrice.toLocaleString()}`;
  }

  // 가격 3자리수 콤마 추가
  const formatPrice = (price) => (Number(price) === 0 ? "무료" : `₩${Number(price).toLocaleString()}`);

  return (
    <>
      <div className="basket-container">
        <h2 className="basket-title">✨ {userInfo ? `${userInfo.unm}님의 수강바구니 ✨` : "수강바구니"}</h2>

        <div className="basket-wrap">
          {cartItem.length === 0 ? (
            <div className="empty-cart">
              <p>담긴 강의가 없습니다.</p>
              <Link to="/" className="border-box">
                담으러 가기 🧺
              </Link>
            </div>
          ) : (
            <>
              <div className="basket-list">
                <div className="basket-select">
                  <div className="select-box">
                    <input
                      type="checkbox"
                      className="checkbtn"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setSelectedItems(new Array(cartItem.length).fill(isChecked));
                      }}
                      checked={selectedItems.filter(Boolean).length === cartItem.length}
                    />
                    <div className="select-title">
                      <p className="select-txt">전체선택</p>
                      <p className="select-num">
                        <span>{selectedItems.filter(Boolean).length}</span>/{cartItem.length}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="border-box"
                    onClick={() => {
                      const updatedCartItems = cartItem.filter((_, index) => !selectedItems[index]);
                      setCartItem(updatedCartItems);
                      localStorage.setItem("cart-info", JSON.stringify(updatedCartItems)); // 로컬 스토리지 업데이트
                      setSelectedItems(new Array(updatedCartItems.length).fill(false)); // 선택 상태 초기화
                      // 카트정보 업데이트하기
                      myCon.setCartInfo(updatedCartItems.length === 0 ? null : updatedCartItems);
                    }}
                  >
                    삭제하기
                  </button>
                </div>
                <div className="edu-list-container">
                  {cartItem.map((item, i) => (
                    <div className="edu-list-wrap" key={item.idx}>
                      <div className="edu-list-left">
                        <input
                          type="checkbox"
                          className="checkbtn"
                          checked={selectedItems[i]}
                          onChange={() => {
                            const updatedSelectedItems = [...selectedItems];
                            updatedSelectedItems[i] = !updatedSelectedItems[i];
                            setSelectedItems(updatedSelectedItems);
                          }}
                        />
                        <img
                          src={`images/edu_thumb/${item.idx}.png`}
                          alt={`강의 이미지 ${item.idx}`}
                          className="edu-img"
                        />
                        <Link to={`/detail/${item.idx}`} style={{ cursor: "pointer" }}>
                          <div className="box">
                            <ul className="text-box">
                              <li className="gname">{item.gName}</li>
                              <ol className="cat-box">
                                <li className="glavel">{item.gLevel}</li>
                                <li className="gcate">{item.gCate}</li>
                                <li className="gdate">{item.gDate}</li>
                              </ol>
                            </ul>
                            <h4>{formatPrice(item.gPrice)}</h4>
                          </div>
                        </Link>
                      </div>
                      <div className="edu-list-right">
                        <h4>{formatPrice(item.gPrice)}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="pay-list">
            <div className="pay-title">
              <h5>구매자정보</h5>
              <Link to="/mypage" className="border-box">
                수정
              </Link>
            </div>
            <div className="horizon"></div>
            <div className="user-desc">
              <div className="user">
                <p className="user-title">아이디</p>
                <p className="user-desc">{userInfo ? userInfo.uid : "비회원 상태입니다."}</p>
              </div>
              <div className="user">
                <p className="user-title">이름</p>
                <p className="user-desc">{userInfo ? userInfo.unm : "비회원 상태입니다."}</p>
              </div>
              <div className="user">
                <p className="user-title">이메일</p>
                <p className="user-desc">{userInfo ? userInfo.eml : "비회원 상태입니다."}</p>
              </div>
            </div>
            <div className="horizon"></div>
            <div className="total-price">
              <div className="total-desc">
                <p>총 결제금액</p>
                <span>{totalPriceText}</span>
              </div>
              <button className="submit" onClick={handleCheckout}>
                결제하기
              </button>{" "}
              {/* 결제하기 버튼 추가 */}
              {isCheckoutComplete && <div>결제가 완료되었습니다.</div>} {/* 결제 완료 메시지 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
