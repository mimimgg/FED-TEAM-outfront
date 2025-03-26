// MyEdu.jsx
import React, { useEffect, useState } from "react";
import "../../scss/myedu.scss";
import { Navigate, useNavigate } from "react-router-dom";

// 리뷰 데이터 import 직접 불러오기
import reviewData from "../../js/data/review_data.json";
// 로그인한 사용자의 학습 정보 import 직접 불러오기
import userData from "../../js/data/user_data.json";

function MyEdu(props) {
  const [userInfo, setUserInfo] = useState(null); // 로그인한 사용자 정보
  const [userEduList, setUserEduList] = useState([]); // 로그인한 사용자의 학습 목록
  const [reviewList, setReviewList] = useState(reviewData); // 리뷰 데이터
  const [selectedReview, setSelectedReview] = useState(null); // 선택된 리뷰 정보 (팝업)
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부

  useEffect(() => {
    // 세션 스토리지에서 로그인한 사용자 정보 가져오기
    const storedUser = sessionStorage.getItem("minfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);

      // 로그인한 사용자의 학습 정보 가져오기
      const currentUser = userData.find((user) => user.uid === parsedUser.uid);
      if (currentUser) {
        setUserEduList(currentUser.eduIng);
      }

      // 로컬스토리지에 결제한 강의 정보 불러오기
      const userEducation = localStorage.getItem("user-education");
      if (userEducation) {
        const purchasedCourses = JSON.parse(userEducation);
        // 기존 학습 목록에 결제한 강의 추가
        setUserEduList((prevEduList) => [...prevEduList, ...purchasedCourses]);
      }

    
    }
  }, []);


  // 리뷰 팝업 열기 함수
  const openReviewPopup = (eduId) => {
    const userReview = reviewList.find((review) => review.uid === userInfo.uid && review.eduId === eduId);

    if (userReview) {
      setSelectedReview(userReview);
      setShowPopup(true);
    } else {
      alert("작성된 수강평이 없습니다.");
    }
  };

  // 팝업 닫기 함수
  const closePopup = () => {
    setShowPopup(false);
    setSelectedReview(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="my-edu-wrap">
        <h2>내학습</h2>
        {/* 내 학습 */}
        <div className="box my-edu">
          <ul className="myedu-list">
            {userEduList.length > 0 ? (
              userEduList.map((edu) => {
                const userReview = reviewList.find(
                  (review) => review.uid === userInfo.uid && review.eduId === edu.eduId
                );

                return (
                  <li key={edu.eduId}>
                    <picture onClick={() => navigate(`/detail/${edu.eduId}`)}>
                      <img src={`./images/edu_thumb/${edu.eduId}.png`} alt={`강의 이미지 ${edu.eduId}`} />
                    </picture>
                    <h4>{edu.eduName}</h4>
                    <p>
                      {edu.eduState} ({edu.eduRate}%)
                    </p>
                    {parseInt(edu.eduRate) >= 60 && (
                      <button className="my-review-btn" onClick={() => openReviewPopup(edu.eduId)}>
                        {userReview ? (
                          <span className="star-grade2">
                            평점 (<img src="./images/main/star.png" alt="별" width="8px" />
                            <img src="./images/main/star.png" alt="별" width="8" /> {userReview.grade})
                          </span>
                        ) : (
                          "수강평 작성"
                        )}
                      </button>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="empty-msg">학습중인 강의가 없습니다.</li>
            )}
          </ul>
        </div>
        {/* 리뷰 팝업 */}
      {showPopup && selectedReview && (
        <div className="review-popup">
          <div className="popup-content">
            <h3>수강평</h3>
            <p className="star-grade">
              <b>평점:</b>
              {Array.from({ length: Math.round(selectedReview.grade / 0.5) }, (_, i) => (
                <span className="half-star">
                  <img key={i} src="./images/main/star.png" alt="별" width="8" />
                </span>
              ))}
            </p>
            <p>{selectedReview.text}</p>
            <button className="close-btn" onClick={closePopup}>
              닫기
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default MyEdu;
