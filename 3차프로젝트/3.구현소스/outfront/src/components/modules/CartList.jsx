import React, { useContext, useEffect, useState } from "react";
import "../../scss/pages/cart.scss";
import { Link } from "react-router-dom";
import { dCon } from "./dCon"; // Context API import

const CartList = () => {
  // 로그인한 사용자 정보 상태
  const [userInfo, setUserInfo] = useState(
    sessionStorage.getItem("minfo") ? JSON.parse(sessionStorage.getItem("minfo")) : null
  );

  // 장바구니 항목 상태
  const [cartItem, setCartItem] = useState(
    localStorage.getItem("cart-info")
      ? JSON.parse(localStorage.getItem("cart-info")).filter((v) => {
          // 로그인한 사용자와 동일한 소유자 필터링
          return v.gOwner === (userInfo ? userInfo.idx : 0);
        })
      : []
  );

  // 가격 포맷팅 함수
  const formatPrice = (price) => (Number(price) === 0 ? "무료" : `₩${Number(price).toLocaleString()}`);

  // 선택된 항목 상태
  const [selectedItems, setSelectedItems] = useState(new Array(cartItem.length).fill(false));

  // 전역 Context API 사용
  const myCon = useContext(dCon);

  // 컴포넌트가 마운트될 때 사용자 정보 및 카트 정보 가져오기
  useEffect(() => {
    const storedUser = sessionStorage.getItem("minfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
    // 카트 정보 업데이트
    myCon.setCartInfo(cartItem.length === 0 ? null : cartItem);
  }, [cartItem, myCon]);

  // 전체 선택 체크박스 핸들러
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked; // 전체 선택 체크박스 상태
    setSelectedItems(new Array(cartItem.length).fill(isChecked));
  };

  // 개별 체크박스 핸들러
  const handleCheckboxChange = (index) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index] = !updatedSelectedItems[index]; // 체크박스 상태 토글
    setSelectedItems(updatedSelectedItems);
  };

  // 선택된 항목 수 계산
  const selectedCount = selectedItems.filter(Boolean).length;

  // 선택된 항목 삭제 핸들러
  const handleDeleteSelected = () => {
    const updatedCartItems = cartItem.filter((_, index) => !selectedItems[index]); // 선택되지 않은 항목만 남김
    localStorage.setItem("cart-info", JSON.stringify(updatedCartItems)); // 로컬 스토리지 업데이트
    myCon.setCartInfo(updatedCartItems.length === 0 ? null : updatedCartItems); // 카트 정보 업데이트
    setCartItem(updatedCartItems); // 상태 변경
    setSelectedItems(new Array(cartItem.length).fill(false)); // 선택 상태 초기화
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
  if (totalPrice === 0 && selectedCount > 0) {
    totalPriceText = "무료";
  } else if (totalPrice > 0) {
    totalPriceText = formatPrice(totalPrice);
  }

  return (
    <>
      <div className="basket-container">
        <h2 className="basket-title">✨ {userInfo ? `${userInfo.unm}님의 수강바구니 ✨` : "수강바구니"}</h2>

        <div className="basket-wrap">
          {cartItem.length === 0 ? ( // 장바구니가 비어 있는 경우
            <div className="empty-cart">
              <p>담긴 강의가 없습니다.</p>
              <Link to="/" className="border-box">담으러 가기 🧺</Link>
            </div>
          ) : (
            <>
              <div className="basket-list">
                <div className="basket-select">
                  <div className="select-box">
                    <input
                      type="checkbox"
                      className="checkbtn"
                      onChange={handleSelectAllChange} // 전체 선택 체크박스 변경 핸들러
                      checked={selectedCount === cartItem.length} // 전체 선택 체크 상태
                    />
                    <div className="select-title">
                      <p className="select-txt">전체선택</p>
                      <p className="select-num"><span>{selectedCount}</span>/{cartItem.length}</p>
                    </div>
                  </div>
                  <button type="button" className="border-box" onClick={handleDeleteSelected}>
                    선택삭제
                  </button>
                </div>
                <div className="edu-list-container">
                  {cartItem.map((item, i) => (
                    <div className="edu-list-wrap" key={item.idx}>
                      <div className="edu-list-left">
                        <input
                          type="checkbox"
                          className="checkbtn"
                          checked={selectedItems[i]} // 개별 체크 상태
                          onChange={() => handleCheckboxChange(i)} // 개별 체크박스 변경 핸들러
                        />
                        <img
                          src={`images/edu_thumb/${item.idx}.png`} // 강의 이미지 경로
                          alt={`강의 이미지 ${item.idx}`}
                          className="edu-img"
                        />
                        <div className="box">
                          <ul className="text-box">
                            <li className="gname">{item.gName}</li>
                            <ol className="cat-box">
                              <li className="glavel">{item.gLevel}</li>
                              <li className="gcate">{item.gCate}</li>
                            </ol>
                          </ul>
                          <h4>{formatPrice(item.gPrice)}</h4>
                        </div>
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
              <Link to="/mypage" className="border-box">수정</Link>
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
              <button className="submit">결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
