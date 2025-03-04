// 강의 상세페이지 컴포넌트 : ./src/components/pages/DetailView.jsx ////

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailView = () => {
  const { id } = useParams();
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

  if (!edu) return <p>강의 정보를 불러오는 중...</p>;

  return (
    <div className="detail-wrap">
      <button onClick={() => navigate(-1)}>← 뒤로 가기</button>
      <h1>{edu.gName}</h1>
      <p><strong>설명:</strong> {edu.gInfo}</p>
      <img src={`/images/edu_thumb/${edu.idx}.png`} alt={`교육 이미지 ${edu.idx}`} />
      <p><strong>레벨:</strong> {edu.gLevel}</p>
      <p><strong>가격:</strong> {edu.gPrice}</p>
      <p><strong>관련 기술:</strong> {edu.gSkill}</p>
      <p><strong>카테고리:</strong> {edu.gCate}</p>
    </div>
  );
};

export default DetailView;
