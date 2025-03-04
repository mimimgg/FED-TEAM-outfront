import React, { useEffect } from 'react';
import $ from 'jquery';

// ** 햄버거 버튼 클릭 시 GNB 메뉴 노출 ** //
$(() => (
  $(".top-menu-btn").on("click",function () {
    $(".gnb").toggleClass('on');
  })
));