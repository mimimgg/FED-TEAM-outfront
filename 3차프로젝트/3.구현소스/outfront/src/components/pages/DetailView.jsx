// 강의 상세페이지 컴포넌트 : ./src/components/pages/DetailView.jsx ////

import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "../../scss/detail_view.scss";

const DetailView = () => {
  const {id} = useParams();
  const [edu, setEdu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/edu_data.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedEdu = data.find((item) => item.idx === parseInt(id, 10));
        setEdu(selectedEdu);
      })
      .catch(console.error);
  }, [id]);

  if (!edu) return <p>강의 정보가 없습니다... ㅠㅠ</p>;

  return (
    <div className="detail-wrap">
      <div className="detail-header">
        <div className="inner">
          <div className="info-txt">
            <button onClick={() => navigate(-1)}>
              <i className="fa-solid fa-arrow-left"></i>뒤로가기
            </button>
            <p>{edu.gCate}</p>
            <h2>{edu.gName}</h2>
            <p>{edu.gInfo}</p>
          </div>
          <div className="edu-thumb">
            <img src={`/images/edu_thumb/${edu.idx}.png`} alt={`교육 이미지 ${edu.idx}`} />
          </div>
        </div>
      </div>
      <div className="detail-content">
        <section>
          <div className="box">
            <h3> 이런 걸 배울 수 있어요 </h3>
            <div className="css-15vm62s mantine-y6qn97">
              <ul className="mantine-Stack-root css-1rr4qq7 mantine-1kzvwqj">
                <li className="mantine-Group-root css-1n0sxg9 mantine-1yyyn9b">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" className="svg-inline--fa fa-circle-check css-z14cyq" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                  </svg>
                  <p className="mantine-Text-root css-1c7euc4 mantine-5jqdej">입문자도 쉽게 할 수 있는 프로그래밍 입문</p>
                </li>
                <li className="mantine-Group-root css-1n0sxg9 mantine-1yyyn9b">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" className="svg-inline--fa fa-circle-check css-z14cyq" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                  </svg>
                  <p className="mantine-Text-root css-1c7euc4 mantine-5jqdej">파이썬 기초 문법과 활용법을 배울 수 있어요</p>
                </li>
                <li className="mantine-Group-root css-1n0sxg9 mantine-1yyyn9b">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" className="svg-inline--fa fa-circle-check css-z14cyq" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                  </svg>
                  <p className="mantine-Text-root css-1c7euc4 mantine-5jqdej">데이터 분석</p>
                </li>
                <li className="mantine-Group-root css-1n0sxg9 mantine-1yyyn9b">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" className="svg-inline--fa fa-circle-check css-z14cyq" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                  </svg>
                  <p className="mantine-Text-root css-1c7euc4 mantine-5jqdej">업무 자동화</p>
                </li>
              </ul>
            </div>

            <p className="tit1">
              파이썬 입문,
              <br />
              누구나 할 수 있어요! 💪
            </p>
            <p>
              <img src="https://cdn.inflearn.com/public/files/courses/324145/cda9b423-a410-497a-ae22-8d36b100bf99/1.png" />
            </p>
            <p>
              <img src="https://cdn.inflearn.com/public/files/courses/324145/129d8e36-3974-4ebe-a5fa-e4bd82f8ac0f/speak.gif" />
            </p>
            <h3>프로그래밍이 우리에게 자유를 줄 수단이라서가 아닐까요?&nbsp;</h3>
            <ul>
              <li>과제를 위한 자료 찾기를 클릭 한 번으로!</li>
              <li>수많은 거래처에 보낼 문서를 엔터 한 번으로!</li>
              <li>매달 해야 하는 반복 업무를 컴퓨터가 자동으로!</li>
            </ul>
            <p>
              최근 코딩과 관련된 교육 과목이 증가하면서 프로그래밍과 관련된 교육/직무에 관한 관심도 많이 증가하고 있죠. 게다가 수많은 기업이나 팀에서 코딩을 필수 덕목으로 생각하기 시작했어요. <span>대기업 입사 면접에서 비전공자들에게 파이썬 할 줄 아냐고 물어보기도 하죠.</span>
            </p>
            <p>프로그래밍을 취미로 투잡하는 사람들, 여행 다니며 일하는 만들고 싶은 것을 만드는 노마드 인생을 즐기는 사람들도 늘어나고 있어요.</p>
            <div>
              <h3>
                <strong>
                  하지만 코딩은 어쩐지
                  <br />
                  어렵게 느껴지지 않나요?
                </strong>
              </h3>
              <div className="card-wrapper card-wrapper-2">
                <div className="card-el">
                  <div>
                    <p>🥺</p>
                    <p>코딩 강의가 너무 비싼데, 강의 내용이 좋을지 모르겠어요. 한두 번 듣고 안 들을까 봐 걱정돼요.</p>
                  </div>
                </div>
                <div className="card-el">
                  <div>
                    <p>
                      <span>🥲</span>
                    </p>
                    <p>
                      <span>혼자 코딩 공부 중인데, 제가 하는 게 맞는지 모르겠어요. 모르는 건 누구한테 질문해야 하나요?</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-wrapper card-wrapper-2">
                <div className="card-el">
                  <div>
                    <p>
                      <span>🤔</span>
                    </p>
                    <p>
                      <span>무작정 시작해도 되는 건가요? 어떤 걸 어떻게 공부해야 할지 모르겠어요.</span>
                    </p>
                  </div>
                </div>
                <div className="card-el">
                  <div>
                    <p>
                      <span>🤨</span>
                    </p>
                    <p>
                      <span>시간도 없고 학원도 너무 멀어서 코딩 공부를 시작하기가 쉽지 않아요.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h3>
              <strong>고민은 그만!&nbsp;</strong>
              <br />
              <strong>누구나 재미있게 배울 수 있어요 💡</strong>
            </h3>
            <p>
              <a href="http://inf-mindmap.s3-website.ap-northeast-2.amazonaws.com/inflearn-python-courses-807b09e61479572aac84b4130be7a6a2.html" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.inflearn.com/public/files/courses/324145/9b09b0a8-ea66-4743-8aba-fd5c1395fc84/optimize.jfif" width="800" />
              </a>
            </p>
            <h3>
              <strong>파이썬(Python)이란?</strong>
            </h3>
            <p>우리가 매일 만나는 웹 사이트, 앱을 만들 수 있는 프로그래밍 언어예요. 웹, 앱 말고도 게임, 인공지능 등 파이썬으로 할 수 있는 것들이 정말 많아요. 배우기가 다른 언어보다 쉽다는 점을 포함한 다양한 장점 덕분에 인기 언어로 꼽히고 있어요.</p>
            <p>
              <img src="https://cdn.inflearn.com/public/files/courses/330551/8e3b0004-4d06-4495-a4de-3e43d4d877da/7.png" alt="" title="7.png" width="750" height="363" />
            </p>
            <h3>
              <strong>왜 파이썬을 배워야 할까요?</strong>
            </h3>
            <p>
              파이썬은 문법 구조가 쉽기 때문에 프로그래밍을 처음 접하는 초보자도 쉽게 이해할 수 있어요. 파이썬은 그 어떤 프로그래밍 언어보다 <span>확장성이 월등히 높은 언어</span>예요. 데이터 분석가도, 웹 개발자도, 머신러닝 연구자도, 대학원생도 파이썬을 사용하죠. 당신이 어떤 업무를 맡더라도 파이썬만
              알아두면 척척 대응하기 쉬워집니다.
            </p>
            <p>당연히 비전공자도 다룰 수 있습니다. 프로그래밍 언어는 만국 공통어에요. 만약 C, Java 등의 언어를 접해봤다면 더욱 쉽게 파이썬을 익힐 수 있겠죠.</p>
            <div>
              <h3>
                <strong>파이썬의 특장점 ⭐</strong>
              </h3>
              <div className="card-wrapper card-wrapper-3">
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/e5542339-5a11-42ba-93b1-1f131c8c9119/blue-check.png" alt="" title="blue-check.png" width="35" height="35" />
                    </p>
                    <p>
                      <b>코딩 입문에 딱</b>
                    </p>
                    <p>
                      <span>파이썬은 사람의 언어와 닮아서 상대적으로 배우기 쉬운 개발 언어입니다.</span>
                    </p>
                  </div>
                </div>
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/6ee5926e-0222-4bdd-95a2-107dab988b2d/blue-check.png" alt="" title="blue-check.png" width="35" height="35" />
                    </p>
                    <p>
                      <strong>
                        <span>거대한 커뮤니티</span>
                      </strong>
                    </p>
                    <p>커뮤니티에서 참고할 자료가 많고, 다른 사람들에게 도움받기도 쉬워요.&nbsp;</p>
                  </div>
                </div>
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/ed0cf322-9ef6-4537-af3f-cc07b66e58f0/blue-check.png" alt="" title="blue-check.png" width="35" height="35" />
                    </p>
                    <p>
                      <span>
                        <b>높은 활용성</b>
                      </span>
                    </p>
                    <p>
                      <span>웹 개발, 데이터 분석, 해킹 등 다양한 분야에서 쓰이는 언어예요.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-wrapper card-wrapper-3">
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/387e460e-2479-4f29-ac2c-b559c3e9dd40/blue-check.png" alt="" title="blue-check.png" width="35" height="35" />
                    </p>
                    <p>
                      <span>
                        <b>많은 라이브러리</b>
                      </span>
                    </p>
                    <p>
                      <span>다양한 파이썬 라이브러리와 함께 빠른 결과물을 만들 수 있어요.</span>
                    </p>
                  </div>
                </div>
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/9be395c8-0d98-4b2a-b48f-951213e11a67/blue-check.png" alt="" title="blue-check.png" width="35" height="35" />
                    </p>
                    <p>
                      <strong>
                        <span>업무 자동화</span>
                      </strong>
                    </p>
                    <p>
                      <span>메일 분류, 웹 크롤링 등 반복적이고 오래 걸리는 일을 빨리할 수 있어요.</span>
                    </p>
                  </div>
                </div>
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/9f8c407b-7cb7-437b-81b3-c2d5327ce1ed/blue-check.png" alt="" title="blue-check.png" width="35" height="35" />
                    </p>
                    <p>
                      <span>
                        <b>많은 기업의 관심</b>
                      </span>
                    </p>
                    <p>
                      <span>인스타그램 등 유명 사이트도 파이썬으로 만들어진 경우가 많아요.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h3>
              <strong>가장 실무에 가까운 언어, 파이썬</strong>
              <br />
              <br />
            </h3>
            <div className="flex-box">
              <div className="flex-box__img">
                <img src="https://cdn.inflearn.com/public/files/courses/324145/4cc8919e-3531-4da7-a735-f4843f0d0129/inflearn_python_09.png" alt="" width="350" height="233" />
              </div>
              <div className="flex-box__desc">
                <p>
                  <strong>
                    <br /># 개념 확립 &amp; 실무 기초
                  </strong>
                  <br />
                  시중에 나와 있는 모든 파이썬 기본서를 분석하고 습득한 후 제작했습니다. 정확한 개념 확립과 실무 기초를 한 번에 가져갈 수 있는 구성입니다.
                </p>
              </div>
            </div>
            <div className="flex-box">
              <div className="flex-box__img">
                <img src="https://cdn.inflearn.com/public/files/courses/324145/c0238430-4c58-4895-9c20-3ff3cb1ba539/inflearn_python_08.png" alt="" width="350" height="233" />
              </div>
              <div className="flex-box__desc">
                <p>
                  <strong>
                    <br /># 실제 활용
                  </strong>
                  <br />본 강의는 기존 파이썬 기초 강의에서 다루고 있는 기초 ‘맛보기’가 아닌 실제 활용을 염두에 두고 제작되었습니다.
                </p>
              </div>
            </div>
            <div className="flex-box">
              <div className="flex-box__img">
                <img src="https://cdn.inflearn.com/public/files/courses/324145/ebe5ef28-d853-4179-a58a-27ab2d0dbc0d/inflearn_python_12.png" alt="" width="350" height="233" />
              </div>
              <div className="flex-box__desc">
                <p>
                  <strong>
                    <br /># 데이터 타입
                  </strong>
                  <br />
                  실제 현업(필드)에서 처리해야 할 다양한 데이터 타입을 정리하고 분류하는 데 많은 시간을 할애하여 만들었습니다.
                </p>
              </div>
            </div>
            <hr />
            <h3>
              <strong>실전 프로젝트와 함께</strong>
            </h3>
            <div>
              <p>수업에서 배웠던 것들을 총동원하여 행맨 게임을 만들어보세요!</p>
              <div className="flex-box">
                <div className="flex-box__img">
                  <img src="https://cdn.inflearn.com/public/files/courses/324145/462bacf1-f455-48c8-8163-aa60b94d7b8f/inflearn_python_01.png" alt="" width="350" height="156" />
                </div>
                <div className="flex-box__desc">
                  <p>
                    <strong>🎮 행맨 게임이란?</strong>
                  </p>
                  <ul>
                    <li>글자 수만큼 밑줄을 그려 놓고 단어를 완성하는 게임입니다.</li>
                  </ul>
                </div>
              </div>
              <div className="flex-box">
                <div className="flex-box__img">
                  <img src="https://cdn.inflearn.com/public/files/courses/324145/6b10a6e8-1e19-4465-921f-e31234ffa4d1/스크린샷 2019-07-16 오후 4.54.38.png" alt="" width="350" height="263" />
                </div>
                <div className="flex-box__desc">
                  <p>
                    <strong>
                      <br />
                      👨🏻‍💻 행맨 미니 게임 코드 작성하기
                    </strong>
                  </p>
                  <ul>
                    <li>무작위 단어를 추가하고, 단어를 맞추기 위한 힌트도 만들어볼까요?</li>
                    <li>사운드 효과도 추가해서 더 재밌는 게임을 만들어보세요 :D</li>
                  </ul>
                </div>
              </div>
              <hr />
              <h3>
                <strong>
                  파이썬 (Python),
                  <br />
                  다양한 분야에서 쓰이고 있어요!
                </strong>
              </h3>
              <div className="card-wrapper card-wrapper-3">
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/40c2bb23-762c-497e-9854-bbf8276a363f/noun-data-3132349.png" alt="" title="noun-data-3132349.png" width="80" height="80" />
                    </p>
                    <p>
                      <b>데이터 분석</b>
                    </p>
                    <p>
                      <span>다양한 파이썬 라이브러리를 활용하면 데이터를 쉽게 분석하고 정리할 수 있습니다.</span>
                    </p>
                  </div>
                </div>
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/87d1a4bd-35cd-4a27-945e-3bc440f6d36e/noun-knowledge-2805247.png" alt="" title="noun-knowledge-2805247.png" width="80" height="80" />
                    </p>
                    <p>
                      <strong>딥러닝</strong>
                    </p>
                    <p>
                      <span>파이썬 라이브러리 TensorFlow를 활용하세요. 알파고에 활용된 딥러닝을 배울 수 있어요.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-wrapper card-wrapper-3">
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/16b90eeb-b209-4ae0-bfbb-3fc868d952db/noun-smart-1461714.png" alt="" title="noun-smart-1461714.png" width="80" height="80" />
                    </p>
                    <p>
                      <b>대학원</b>
                    </p>
                    <p>파이썬과 SciPy를 활용하면 여러 문제를 컴퓨터로 쉽게 풀 수 있습니다.</p>
                  </div>
                </div>
                <div className="card-el">
                  <div>
                    <p>
                      <img src="https://cdn.inflearn.com/public/files/courses/330551/8f0348a8-45d4-4b61-b3b3-745fc78b674b/noun-header-3151973.png" alt="" title="noun-header-3151973.png" width="80" height="80" />
                    </p>
                    <p>
                      <strong>웹 개발</strong>
                    </p>
                    <p>
                      <span>파이썬의 웹 프레임워크인 Django로 나만의 웹 서비스를 만들어 보세요.</span>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <h3>
                <strong>이런 분들께 추천해요!</strong>
              </h3>
              <div>&nbsp;</div>
              <div className="columns is-mobile is-multiline">
                <div className="column is-6-mobile">
                  <img src="https://cdn.inflearn.com/public/files/courses/324145/c8738b0e-99c5-45c1-9fc0-3b64141b36b6/inflearn_python_04.png" alt="" title="inflearn_python_04.png" width="80" height="80" />
                  <p>
                    <strong>반복업무</strong>
                  </p>
                  <p>끝없는 반복 업무에 지친 직장인과 대학생</p>
                </div>
                <div className="column is-6-mobile">
                  <img src="https://cdn.inflearn.com/public/files/courses/324145/9b8f6df3-8278-446f-b0da-394371126807/inflearn_python_07.png" alt="" title="inflearn_python_07.png" width="80" height="80" />
                  <p>
                    <strong>파이썬?</strong>
                  </p>
                  <p>파이썬 이름은 들어봤는데 궁금한 분</p>
                </div>
                <div className="column is-6-mobile">
                  <img src="https://cdn.inflearn.com/public/files/courses/324145/51fc6ebd-2a7d-4032-91bf-36b99f3789f1/inflearn_python_06.png" alt="" title="inflearn_python_06.png" width="80" height="80" />
                  <p>
                    <strong>코알못</strong>
                  </p>
                  <p>
                    프로그래밍을
                    <br />
                    배우고 싶은 모든 분
                  </p>
                </div>
                <div className="column is-6-mobile">
                  <img src="https://cdn.inflearn.com/public/files/courses/324145/5d79f617-d626-4da8-8864-7b09fdd53a7d/inflearn_python_05.png" alt="" title="inflearn_python_05.png" width="80" height="80" />
                  <p>
                    <strong>파알못</strong>
                  </p>
                  <p>
                    파이썬을 <br />
                    처음 접하는 분
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <h3>
              <strong>인프런 오리지널 - 파이썬 입문&nbsp;</strong>
              <br />
              <strong>수강생의 목소리를 직접 들어보세요!</strong>
            </h3>
            <p>
              <strong>
                <span>1. IT 기업 근무하는 비전공자, "구본세 님" 인터뷰</span>
              </strong>
            </p>
            <p>
              <div className="iframe-container">
                <iframe src="https://www.youtube.com/embed/JreG0bP0D24" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
              </div>
            </p>
            <p>
              <strong>
                <span>2. 창업을 위한 프로그래밍, "몽몽 님" 수강 후</span>
              </strong>
            </p>
            <p>
              <div className="iframe-container">
                <iframe src="https://www.youtube.com/embed/J7581Nrt99g" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
              </div>
            </p>
            <hr />
            <h3>
              <strong>인프런 오리지널 시리즈 : 파이썬 (Python)</strong>
            </h3>
            <p>
              <span>파이썬의 기본부터 심화까지</span>&nbsp;차근차근 따라 해보세요. 인프런이 제시하는 프로그래밍 학습 로드맵을 따라가면 어느덧 파이썬 프로그래밍을 마스터한 자신과 만나게 될 겁니다.&nbsp;
            </p>
            <div>
              <div className="flex-box flex-box--55">
                <div className="flex-box__img">
                  <a href="https://www.inflearn.com/roadmaps/450" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.inflearn.com/public/files/courses/328989/7c38b76f-29ad-4df3-a9d1-3217e0c28749/roadmap-145.png" alt="" width="600" height="314" />
                  </a>
                </div>
                <div className="flex-box__desc">
                  <h4>
                    <strong>
                      <a href="https://www.inflearn.com/roadmaps/450" target="_blank" rel="noopener noreferrer">
                        고민은 그만! 파이썬 완주 A to Z 🏃‍♂️
                      </a>
                      <br />
                    </strong>
                    <span>
                      <a href="https://www.inflearn.com/roadmaps/450" target="_blank" rel="noopener noreferrer">
                        묶음 할인 50%
                      </a>
                    </span>
                  </h4>
                  <div>
                    <ul>
                      <li>
                        ✅ 파이썬&nbsp;<strong>기초~기초 복습</strong>
                      </li>
                      <li>
                        ✅ 파이썬&nbsp;<strong>중급~고급 문법</strong>
                      </li>
                      <li>
                        ✅ 파이썬<strong>&nbsp;메타 클래스</strong>&nbsp;설계
                      </li>
                      <li>
                        ✅&nbsp;<strong>동시성, 병렬성, Thread, Processing</strong>&nbsp;프로그래밍
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3>
                <strong>왜 인프런 오리지널일까요? 💡</strong>
              </h3>
              <p>
                <strong>두둥, 드디어 나왔다. 인프런 오리지널</strong> <br />
                넷플릭스 오리지널이 퀄리티가 높지 않습니까? 인프런 오리지널도 그렇습니다. <br />본 강의는 더 많은 사람이 양질의 강좌를 들을 수 있도록 하기 위해 제작되었는데요.
                <br />
                부끄럽지 않도록 신경 써서 만들었어요.
              </p>
              <details>
                <summary>더 알아볼까요?</summary>
                <p>
                  <span>
                    <strong>• </strong>
                  </span>
                  <strong>
                    초심자를 배려한 콘텐츠
                    <br />
                  </strong>
                  이해하기 힘든 파트들은 의도적인 반복적으로 설명으로 쉬운 예제를 돕기 위해 노력했습니다.
                </p>
                <p>
                  <span>
                    <strong>• </strong>
                  </span>
                  <strong>
                    특별한 지식공유자
                    <br />
                  </strong>
                  프로그래밍 초심자가 어디에서 헷갈려 하는지 잘 알고 있는 분과 함께했어요. 여러분이 헤매지 않도록 도와드릴 거예요.
                </p>
                <p>
                  <span>
                    <strong>• </strong>
                  </span>
                  <strong>
                    가장 실무에 가까운
                    <br />
                  </strong>
                  이미 검증된 최고만을 모셨습니다. 명쾌한 전달력과 쏙쏙 들어오는 설명으로 제대로 가르칩니다. 개념만이 아니라, 현재 현업 필드에서 실무 프로젝트를 리드하고 계세요.&nbsp;
                  <strong>
                    <br />
                  </strong>
                </p>
                <p>
                  <span>
                    <strong>•&nbsp;</strong>
                  </span>
                  <strong>물어보면서 공부하세요!</strong> <br />
                  질문하시면 적절한 답변을 해주는 서포터즈가 있어요. 이미 내가 궁금했던 부분이 답변에 있는지 찾아보고 물어보세요. 서로 물어보고 답변해주면 기억에도 더 잘 남을 거예요.&nbsp;
                </p>
              </details>
            </div>
            <hr />
          </div>
        </section>
        <aside>
          <div className="detail-info">
            <p>{edu.gPrice}</p>
            <p>{edu.gLevel}</p>
            <p>{edu.gSkill}</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DetailView;
