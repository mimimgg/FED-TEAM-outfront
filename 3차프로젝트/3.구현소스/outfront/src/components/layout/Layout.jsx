/// 레이아웃영역 컴포넌트 : Layout.jsx ///

import {FooterArea} from "./FooterArea";
import {Header} from "./Header";
import MainArea from "./MainArea";

// 컨텍스트 API 로 전역변수구역 설정하기! ////
import { dCon } from "../modules/dCon";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';

export default function Layout() {
  // [ 전역 상태관리 변수 설정하기 ] ////
  // [1] 로그인 상태관리변수
  // const [loginSts, setLoginSts] = useState(sessionStorage.getItem("minfo"));
  // [1] 로그인 상태관리변수 : 
  // 초기값 - 로컬스가 있으면 파싱할당!
  const [loginSts, setLoginSts] = useState(
    sessionStorage.getItem("minfo")
      ? JSON.parse(sessionStorage.getItem("minfo"))
      : null
  );
  // -> 초기값으로 세션스토리지 'minfo'를 할당함!
  console.log(loginSts);

  // [2] 로그인 환영 메시지 상태변수 ////
  const [loginMsg, setLoginMsg] = useState(null);


  // [3] 강제상태변경변수
  const [force, setForce] = useState(true);

  // [4] 장바구니정보변수
  const [cartInfo, setCartInfo] = useState(
    localStorage.getItem('cart-info')
    ? JSON.parse(localStorage.getItem('cart-info')).filter(v=>{
      if(v.gOwner === (loginSts?loginSts.idx : 0)) return true;
    })
    :null);

  // [ 공통함수 ] /////////////////
  // [1] 라우터 이동함수 ////
  const goNav = useNavigate();

  // 라우터 이동처리함수 : 콜백처리함수(메모이제이션 처리를 위함!) //////
  const goPage = useCallback((pm1,pm2)=>{
    // pm1 - 라우터이동주소, pm2 - state 전달객체
    goNav(pm1, pm2);
  },[]);

  // [2] 로그인 환영 메시지 생성함수 ///
  const makeMsg = (name) => {
    // 유저아이콘
    let usrIcon = ["🙍‍♂️", "🧏‍♀️", "🦸‍♂", "👨‍🎤", "🦸‍♀"];
    // 랜덤수 : 0~4사이의 수
    let rdm = Math.floor(Math.random() * 5);
    // 로그인 메시지 상태변수 업데이트
    setLoginMsg(`Welcome ${name} ${usrIcon[rdm]}`);
  }; ///////// makeMsg /////////////

  // [3] 로그아웃 함수
  const logoutFn = () => {
    // (1) 로그인 상태값 null
    setLoginSts(null);
    // (2) 세션스 지우기 : minfo
    sessionStorage.removeItem('minfo');
    // (3) 로그인 메시지 초기화
    setLoginMsg(null);
    // (4) 메인 페이지로 돌아가기
    goPage("./");
  }; /// logoutFn ///

  // 리턴 코드구역 ////
  return (
    <dCon.Provider
      value={{
        loginSts, // 로그인상태 getter
        setLoginSts, // 로그인상태 setter
        loginMsg, // 로그인메시지 getter
        makeMsg, // 로그인메시지 생성함수
        goPage, // 라우터 이동함수
        logoutFn, // 로그아웃 함수
        cartInfo, // 장바구니정보 getter
        setCartInfo, // 장바구니정보 setter
      }}>
      <Header goPage={goPage} loginSts={loginSts} setLoginSts={setLoginSts} setForce={setForce} force={force} cartInfo={cartInfo} setCartInfo={setCartInfo} />
      <MainArea />
      <FooterArea />
    </dCon.Provider>
  );
} //// Layout 컴포넌트 ////
