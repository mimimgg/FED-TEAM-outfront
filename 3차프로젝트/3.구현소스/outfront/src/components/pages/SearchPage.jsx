import React from 'react';
import { useLocation } from 'react-router-dom';

import eduData from '../../js/data/edu_data.json';

function SearchPage() {

    const {state} = useLocation();

    const keyword = state? state.keyword : "검색어 없음";

    const selData = eduData.filter(v=>{
        if(
            v.gName.indexOf(keyword)!== -1 ||
            v.gInfo.indexOf(keyword)!== -1 
        ) return true;
    })

    console.log(keyword, selData);




    return (
        <div >
            <h1>검색결과</h1>
            <p>검색어 : {keyword}</p>
            <section style={{fontSize:'1vw',marginBottom:'5vh'}}>
                {selData.map(v=>(
                    <div key={v.eduId}>
                        <h2>{v.gName}</h2>
                        <h3>{v.gInfo}</h3>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default SearchPage;