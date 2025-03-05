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
      <button onClick={() => navigate(-1)}>← 뒤로 가기</button>
      <div className="detail-header">
        <div className="inner">
          <div className="info-txt">
            <h2>{edu.gCate}</h2>
            <h3>{edu.gName}</h3>
            <span>{edu.gInfo}</span>
          </div>
          <div className="edu-thumb">
            <img src={`/images/edu_thumb/${edu.idx}.png`} alt={`교육 이미지 ${edu.idx}`} />
          </div>
        </div>
      </div>
      <div className="detail-info">
        <p>{edu.gPrice}</p>
        <p>{edu.gLevel}</p>
        <p>{edu.gSkill}</p>
      </div>
    </div>
  );
};

export default DetailView;
