/// 하단영역 컴포넌트 : FooterArea.jsx ///

// import { Link } from "react-router-dom";

// import React from 'react';
import "../../scss/footer_area.scss";

export default function FooterArea() {
  // 리턴 코드구역 ////
  return (
    <>
      <footer className="footer-area">
        <div className="footer-info">
          <div className="corp-area">
            <span className="brand_logo">
              <a href="#">
                <img src="../../images/header/brand_logo.png" alt="아웃프런 브랜드 로고" />
              </a>
            </span>
            <ul>
              <li>
                <a href="#">개인정보처리방침</a>
              </li>
              <li>
                <a href="#">이용약관</a>
              </li>
              <li>
                <a href="#">We Are Hiring</a>
              </li>
            </ul>
          </div>
          <div className="company-info">
            <span>(주)아웃프런 | </span>
            <span>대표자: 이민경, 이민지 | </span>
            <span>사업자번호: 2025-02-220407 
            <a class="mantine-Text-root mantine-Anchor-root mantine-1ecarpi" href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=4998100612" target="_blank" rel="noreferrer"> 사업자 정보 확인</a>
            </span> <br/>
            <span>통신판매업: 2024-서울강남-1010 | </span>
            <span>개인정보보호책임자: 아웃프런 | </span>
            <span>이메일: <a href="email">outfront@outfront.com</a></span> <br/>
            <span>전화번호: 02-5676-5676 | </span>
            <span>주소: 서울 강남구 테헤란로5길 24 장연빌딩 3~6층</span>
          </div>
          <div className="copyright">
            ©OUTFRONT. ALL RIGHTS RESERVED
          </div>
        </div>
        <div className="footer-sns">
          <a href="#">
            <img src="../../images/footer/icon-facebook.png" alt="페이스북" />
          </a>
          <a href="#">
            <img src="../../images/footer/icon-insta.png" alt="인스타그램" />
          </a>
          <a href="#">
            <img src="../../images/footer/icon-youtube.png" alt="유튜브" />
          </a>
          <a href="#">
            <img src="../../images/footer/icon-x.png" alt="엑스" />
          </a>
        </div>
      </footer>
    </>
  );
} //// FooterArea 컴포넌트 ////
