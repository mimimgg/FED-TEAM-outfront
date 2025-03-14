import React, { useEffect, useState } from "react";
import "../../scss/mypage.scss";
import { useNavigate } from "react-router-dom";
import { initBoardData } from "../../js/func/board_fn";

function Mypage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null); // 로그인한 사용자 정보
  const [userEduList, setUserEduList] = useState([]); // 로그인한 사용자의 학습 목록
  const [reviewList, setReviewList] = useState([]); // 리뷰 데이터
  const [selectedReview, setSelectedReview] = useState(null); // 선택된 리뷰 정보 (팝업)
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부
  const [userBoardPosts, setUserBoardPosts] = useState([]); // 사용자의 게시글 목록

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
          const currentUser = data.find(user => user.uid === userInfo.uid);
          if (currentUser) {
            setUserEduList(currentUser.eduIng);
          }
        })
        .catch(console.error);
    }
  }, [userInfo]);

  useEffect(() => {
    // 리뷰 데이터 불러오기
    fetch("/data/review_data.json")
      .then((res) => res.json())
      .then(setReviewList)
      .catch(console.error);
  }, []);

  useEffect(() => {
    // 게시판 데이터 불러오기
    // initBoardData(); // 로컬 스토리지 초기화
    const boardData = JSON.parse(localStorage.getItem("board-data")) || [];

    if (userInfo) {
      const myPosts = boardData.filter((post) => post.uid === userInfo.uid);
      setUserBoardPosts(myPosts);
    }
  }, [userInfo]);

  // 리뷰 팝업 열기 함수
  const openReviewPopup = (eduId) => {
    const userReview = reviewList.find(
      (review) => review.uid === userInfo.uid && review.eduId === eduId
    );

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
            {userEduList.length > 0 ? (
              userEduList.map((edu) => {
                const userReview = reviewList.find(
                  (review) => review.uid === userInfo.uid && review.eduId === edu.eduId
                );

                return (
                  <li key={edu.eduId}>
                    <picture onClick={() => navigate(`/detail/${edu.eduId}`)}>
                      <img src={`/images/edu_thumb/${edu.eduId}.png`} alt={`강의 이미지 ${edu.eduId}`} />
                    </picture>
                    <h4>{edu.eduName}</h4>
                    <p>{edu.eduState} ({edu.eduRate}%)</p>
                    {parseInt(edu.eduRate) >= 60 && (
                      <button className="my-review-btn" onClick={() => openReviewPopup(edu.eduId)}>
                        {userReview ? `평점 (⭐${userReview.grade})` : "수강평 작성"}
                      </button>
                    )}
                  </li>
                );
              })
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
          <ul className="myboard-list">
            {userBoardPosts.length > 0 ? (
              userBoardPosts.map((post) => (
                <li key={post.idx}>
                  <a href="#none">
                    <h4>{post.tit}</h4>
                    <p>{post.date} | 조회수: {post.cnt}</p>
                  </a>
                </li>
              ))
            ) : (
              <li className="empty-msg"><p>작성한 게시글이 없습니다.</p></li>
            )}
          </ul>
        </div>
      </div>
      
      {/* 리뷰 팝업 */}
      {showPopup && selectedReview && (
        <div className="review-popup">
          <div className="popup-content">
            <h3>수강평</h3>
            <p><b>평점:</b> ⭐ {selectedReview.grade}/5</p>
            <p>{selectedReview.text}</p>
            <button className="close-btn" onClick={closePopup}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;
