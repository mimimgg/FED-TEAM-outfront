/// 레이아웃영역 컴포넌트 : Layout.jsx ///

import FooterArea from "./FooterArea";
import Header from "./Header";
import MainArea from "./MainArea";

export default function Layout() {
  // 리턴 코드구역 ////
  return (
    <>
      <Header />
      <MainArea />
      <FooterArea />
    </>
  );
} //// Layout 컴포넌트 ////
