// 아웃프런 GNB메뉴 데이터
export const menu = [
  {
      txt:"강의",
      link:"/education",
      sub:[
        {
          txt: "개발,프로그래밍",
          link: "/it-programming",
        },
        {
          txt: "인공지능",
          link: "/artificial-intelligence",
        },
        {
          txt: "게임 개발",
          link: "/game-dev-all",
        },
        {
          txt: "데이터 사이언스",
          link: "/data-science",
        },
        {
          txt: "보안, 네트워크",
          link: "/it",
        },
      ]
  },
  {
    txt: "커뮤니티",
    link: "/community",
    sub: [
      {
        txt: "질문&답변",
        link: "/questions"
      },
      {
        txt: "고민있어요",
        link: "/chats"
      },
      {
        txt: "스터디",
        link: "/studies"
      },
      {
        txt: "팀프로젝트",
        link: "/projects"
      },
    ]
  }
];